import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { PortableText } from "@portabletext/react";
// import type { PortableTextBlock } from "@portabletext/types";
import type { SanityProject } from "../types/sanity";
import { getProjectBySlug, urlFor } from "../lib/sanity";
import Header from "./Header";
import Contact from "./Contact";

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
          {project.outcomeImage?.[0] && (
            <div className="rounded-2xl overflow-hidden">
              <img
                src={urlFor(project.outcomeImage[0])
                  .quality(90)
                  .fit("max")
                  .url()}
                alt={project.projectName}
                className="w-full h-auto"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-12">
          <div className="flex flex-col gap-8">
            {project.role && (
              <section>
                <h2 className="text-2xl font-semibold">Role</h2>
                {project.role.map((item) => (
                  <div className="prose max-w-none">{item}</div>
                ))}
              </section>
            )}

            {project.duration && (
              <section>
                <h2 className="text-2xl font-semibold">Duration</h2>
                <div className="prose max-w-none">{project.duration}</div>
              </section>
            )}
          </div>
          {/* <div className="flex flex-col gap-2"> */}
          {project.overview && (
            <section>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <div className="prose max-w-none mt-4">{project.overview}</div>
            </section>
          )}
          {/* </div> */}
        </div>
        <div className="flex flex-col gap-8">
          {project.outcome && (
            <section>
              <h2 className="text-2xl font-semibold">Outcome</h2>
              <div className="prose max-w-none mt-4">{project.outcome}</div>
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

        {/* Challenges */}
        {project.challengesContent && (
          <section className="flex flex-col gap-8">
            <h2 className="text-2xl font-semibold">Challenges</h2>
            <div className="prose max-w-none">{project.challengesContent}</div>
            {project.challengesImage?.[0] && (
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={urlFor(project.challengesImage[0])
                    .quality(90)
                    .fit("max")
                    .url()}
                  alt="Challenges"
                  className="w-full h-auto"
                />
              </div>
            )}
          </section>
        )}

        {/* Solution */}
        {project.solutionContent && (
          <section className="flex flex-col gap-8">
            <h2 className="text-2xl font-semibold">Solution</h2>
            <div className="prose max-w-none">
              {/* <PortableText
                value={project.solutionContent as PortableTextBlock[]}
              /> */}
              {project.solutionContent}
            </div>
            {project.solutionImage?.[0] && (
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={urlFor(project.solutionImage[0])
                    .quality(90)
                    .fit("max")
                    .url()}
                  alt="Solution"
                  className="w-full h-auto"
                />
              </div>
            )}
          </section>
        )}

        {/* Read more */}
        <div className="flex gap-4">
          {project.readMore && (
            <a
              className="inline-flex mt-10 px-4 py-2 rounded-md bg-white border border-gray-800 text-gray-800 hover:bg-gray-800"
              href={project.readMore}
              target="_blank"
              rel="noreferrer"
            >
              Case Study
            </a>
          )}

          {project.outcomeURL && (
            <a
              className="inline-flex mt-10 px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800"
              href={project.outcomeURL}
              target="_blank"
              rel="noreferrer"
            >
              Visit project
            </a>
          )}
        </div>
      </div>
      <Contact />
    </div>
  );
}
