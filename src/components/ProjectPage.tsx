import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRightIcon, InfoIcon } from "@phosphor-icons/react";

import type { SanityProject } from "../types/sanity";
import { getProjectBySlug } from "../lib/sanity";
import Header from "./Header";
import Contact from "./Contact";
import ImageGallery from "./ImageGallery";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<SanityProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  console.log(project);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
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
      <div className="pt-28 pb-16 px-8 md:px-12 flex flex-col gap-12 lg:px-16 max-w-5xl mx-auto">
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

        <div className="bg-gray-100 px-4 py-2 mt-4 flex gap-2 items-center rounded-md text-red-800">
          <InfoIcon size={20} />
          <span>
            Case study still in progress. Thank you for your patience.
          </span>
        </div>

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
            {project.teamSize && (
              <section>
                <h2 className="text-2xl font-semibold">Team Size</h2>
                <div className="prose max-w-none mt-2">{project.teamSize}</div>
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
            <section>
              {" "}
              <iframe
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                }}
                width="800"
                height="450"
                src={project.iframeContent}
                allowFullScreen
              ></iframe>
            </section>
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
            <section>
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

        <div className="flex flex-col gap-20">
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

        {/* Read more */}
        <div className="flex gap-4">
          {project.readMore && (
            <a
              className="mt-10 px-4 py-2 font-medium rounded-md bg-gray-800 text-white hover:text-[#ffbdbd]"
              href={project.readMore}
              target="_blank"
              rel="noreferrer"
            >
              Case Study
            </a>
          )}
        </div>
      </div>
      <Contact />
    </div>
  );
}
