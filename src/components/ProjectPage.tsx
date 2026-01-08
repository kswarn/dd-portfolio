import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRightIcon, ArrowUpRight } from "@phosphor-icons/react";

import type { SanityProject } from "../types/sanity";
import { getProjectBySlug, getProjects, urlFor } from "../lib/sanity";
import Header from "./Header";
import Contact from "./Contact";
import ImageGallery from "./ImageGallery";

interface ResponsiveIframeProps {
  src: string;
}

function ResponsiveIframe({ src }: ResponsiveIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const attemptResize = () => {
      try {
        // Try to access iframe content (may fail due to CORS)
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
          const body = iframeDocument.body;
          const html = iframeDocument.documentElement;
          const height = Math.max(
            body?.scrollHeight || 0,
            body?.offsetHeight || 0,
            html?.clientHeight || 0,
            html?.scrollHeight || 0,
            html?.offsetHeight || 0
          );
          if (height > 0) {
            setIframeHeight(height);
          }
        }
      } catch {
        // CORS error - can't access iframe content
        // Fall back to default height or postMessage
        // This is expected for cross-origin iframes
      }
    };

    // Listen for postMessage from iframe (if it supports it)
    const handleMessage = (event: MessageEvent) => {
      // Verify origin if needed
      if (
        event.data &&
        typeof event.data === "object" &&
        event.data.type === "iframe-resize"
      ) {
        setIframeHeight(event.data.height);
      }
    };

    window.addEventListener("message", handleMessage);

    // Try to resize when iframe loads
    iframe.addEventListener("load", () => {
      // Wait a bit for content to render
      setTimeout(attemptResize, 500);
      // Try again after a longer delay
      setTimeout(attemptResize, 2000);
    });

    // Initial attempt
    attemptResize();

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [src]);

  // Default to a reasonable height if we can't determine content height
  const height = iframeHeight || 600;

  return (
    <section className="w-full overflow-hidden">
      <div ref={containerRef} className="relative w-full">
        <iframe
          ref={iframeRef}
          src={src}
          className="w-full border border-gray-200 rounded-xl"
          allowFullScreen
          scrolling="no"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            height: `${height}px`,
            minHeight: "400px",
          }}
        ></iframe>
      </div>
    </section>
  );
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<SanityProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [nextProjects, setNextProjects] = useState<SanityProject[]>([]);

  console.log(project);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);

        // Fetch all projects and get 2 random ones (excluding current)
        const allProjects = await getProjects();
        const otherProjects = allProjects.filter(
          (p) => p.slug?.current !== slug
        );

        // Shuffle and pick 2 random projects
        const shuffled = [...otherProjects].sort(() => Math.random() - 0.5);
        setNextProjects(shuffled.slice(0, 2));
      } catch {
        setError("Failed to load project");
      } finally {
        setLoaded(true);
      }
    })();
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-red-600">{error ?? "Project not found"}</div>
        <Link to="/" className="underline">
          Go back
        </Link>
      </div>
    );
  }

  if (!loaded) return null;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-red-600">Project not found</div>
        <Link to="/" className="underline">
          Go back
        </Link>
      </div>
    );
  }

  function formatContentToArray(content: string) {
    const topLevelItems = content.split(";");

    return (
      <ul className="list-disc ml-6">
        {topLevelItems.map((item, index) => {
          const parts = item.includes("?");
          const parents = !parts && item;
          const children = parts ? [...item.split("?")] : [];
          return parents ? (
            <li className="my-1" key={index}>
              {parents}
            </li>
          ) : (
            <ul className="ml-4">
              {children.map((child, childIndex) => (
                <li key={childIndex} className="flex gap-2 my-2 items-start">
                  <ArrowRightIcon size={14} className="mt-1 flex-shrink-0" />
                  <span>{child}</span>
                </li>
              ))}
            </ul>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-28 px-8 md:px-12 flex flex-col gap-12 lg:px-16 max-w-5xl mx-auto">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
            {project.projectName}
          </h1>
          {project.projectSubtitle && (
            <p className="text-base md:text-lg text-gray-700">
              {project.projectSubtitle}
            </p>
          )}

          {(project.tags?.length ?? 0) && (
            <div className="flex flex-wrap gap-2">
              {project.status && (
                <span className="text-md px-4 py-2 rounded-full bg-gray-900 text-white">
                  {project.status}
                </span>
              )}
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-md px-4 py-2 rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4">
          {project.outcomeImage && project.outcomeImage.length > 0 && (
            <ImageGallery
              images={project.outcomeImage}
              altText={project.projectName}
            />
          )}
        </div>

        {/* <div className="bg-gray-100 px-4 py-2 mt-4 flex gap-2 items-start md:items-center rounded-md text-red-800">
          <InfoIcon size={20} />
          <span>
            Case study still in progress. Thank you for your patience.
          </span>
        </div> */}

        <div className="grid grid-cols-2 gap-4 mt-12">
          <div className="flex flex-col gap-8">
            {project.role && (
              <section>
                <h2 className="text-2xl font-semibold">Role</h2>
                <div className="mt-4">
                  {project.role.map((item) => (
                    <div className="prose max-w-none">{item}</div>
                  ))}
                </div>
              </section>
            )}

            {project.duration && (
              <section>
                <h2 className="text-2xl font-semibold">Duration</h2>
                <div className="prose max-w-none mt-4">{project.duration}</div>
              </section>
            )}
            {project.team && (
              <section>
                <h2 className="text-2xl font-semibold">Team</h2>
                <div className="prose max-w-none mt-2">{project.team}</div>
              </section>
            )}
          </div>
          <div className="flex flex-col gap-8">
            {project.overview && (
              <section>
                <h2 className="text-2xl font-semibold">Overview</h2>
                <div className="prose max-w-none mt-4">{project.overview}</div>
              </section>
            )}
          </div>

          {/* </div> */}
        </div>
        <div className="flex flex-col gap-8">
          {project.outcome && (
            <section>
              <h2 className="text-2xl font-semibold">Outcome</h2>
              <div className="prose max-w-none mt-2 flex flex-col gap-4">
                {formatContentToArray(project.outcome)}
                {project.outcomeURL && (
                  <a
                    className="inline-flex w-30 mt-4 font-semibold px-4 py-2 rounded-md bg-[#40764c] hover:text-[#ffbdbd] text-white"
                    href={project.outcomeURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit project
                  </a>
                )}
              </div>
            </section>
          )}

          {project.iframeContent && (
            <ResponsiveIframe src={project.iframeContent} />
          )}
        </div>

        {/* Problem Statement */}
        <div className="flex flex-col gap-8">
          {project.problemStatement && (
            <section>
              <h2 className="text-2xl font-semibold">Problem Statement</h2>
              <div className="prose max-w-none mt-2 flex flex-col gap-4">
                {project.problemStatement}
              </div>
            </section>
          )}
        </div>

        {/* Ideation  */}
        {project.ideation && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Process</h2>
            {project.ideation && project.ideation.length > 0 && (
              <ImageGallery images={project.ideation} altText="Challenges" />
            )}
          </div>
        )}

        {/* Challenges */}
        <div className="flex flex-col gap-8">
          {project.challengesContent && (
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Challenges</h2>
              <div className="prose max-w-none mt-2 flex flex-col gap-4">
                {formatContentToArray(project.challengesContent)}
              </div>
              {project.challengesImage &&
                project.challengesImage.length > 0 && (
                  <ImageGallery
                    images={project.challengesImage}
                    altText="Challenges"
                  />
                )}
            </section>
          )}
        </div>

        {/* Usage Research */}
        <div className="flex flex-col gap-8">
          {project.usageResearch && (
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Usage Research</h2>
              <div className="prose max-w-none mt-2 flex flex-col gap-4">
                {formatContentToArray(project.usageResearch)}
              </div>
              <div>
                {project.usageResearchImage &&
                  project.usageResearchImage.length > 0 && (
                    <ImageGallery
                      images={project.usageResearchImage}
                      altText="Usage Research"
                    />
                  )}
              </div>
            </section>
          )}
        </div>

        <div className="flex flex-col gap-10">
          {/* Solution */}
          {project.solutionContent && (
            <>
              <section className="">
                <h2 className="text-2xl font-semibold">Solution</h2>
                <div className="prose max-w-none mt-2">
                  {/* <PortableText
                value={project.solutionContent as PortableTextBlock[]}
              /> */}

                  {formatContentToArray(project.solutionContent)}
                </div>
              </section>
              <div className="">
                {project.solutionImage && project.solutionImage.length > 0 && (
                  <ImageGallery
                    images={project.solutionImage}
                    altText="Solution"
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Usability Testing */}
        <div className="flex flex-col gap-8">
          {project.usabilityTesting && (
            <section>
              <h2 className="text-2xl font-semibold">Testing</h2>
              <div className="prose max-w-none mt-2 flex flex-col gap-4">
                {formatContentToArray(project.usabilityTesting)}
              </div>
              {/* {project.challengesImage &&
                project.challengesImage.length > 0 && (
                  <ImageGallery
                    images={project.challengesImage}
                    altText="Challenges"
                  />
                )} */}
            </section>
          )}
        </div>

        {/* Read more */}
        <div className="flex gap-4">
          {project.readMore && (
            <a
              className="px-4 py-2 font-medium rounded-md bg-gray-800 text-white hover:text-[#ffbdbd]"
              href={project.readMore}
              target="_blank"
              rel="noreferrer"
            >
              Case Study
            </a>
          )}
        </div>

        {/* Next Projects */}
        {nextProjects.length > 0 && (
          <section className="mt-20">
            <p className="text-2xl font-semibold text-gray-900 mb-12">
              Read More
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {nextProjects.map((nextProject) => (
                <Link
                  key={nextProject._id}
                  to={`/projects/${nextProject.slug?.current}`}
                  className="block group"
                >
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                    {nextProject.outcomeImage?.[0] && (
                      <img
                        src={urlFor(nextProject.outcomeImage[0])
                          .quality(80)
                          .fit("max")
                          .url()}
                        alt={nextProject.projectName}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-[#ffbdbd] hover:bg-gray-800 p-2 rounded-full transition-colors">
                      <ArrowUpRight
                        size={20}
                        weight="bold"
                        className="text-gray-900 hover:text-white transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                      {nextProject.projectName}
                    </h3>
                    {nextProject.tags && nextProject.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {nextProject.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Contact />
    </div>
  );
}
