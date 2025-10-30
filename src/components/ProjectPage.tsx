import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityProject } from "../types/sanity";
import { getProjectBySlug, urlFor } from "../lib/sanity";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<SanityProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

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
      <div className="pt-28 pb-16 px-6 md:px-12 lg:px-16 max-w-5xl mx-auto">
        <Link to="/" className="text-sm text-gray-600 hover:underline">
          ← Back
        </Link>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold text-gray-900">
          {project.projectName}
        </h1>
        {project.projectSubtitle && (
          <p className="mt-3 text-base md:text-lg text-gray-700">
            {project.projectSubtitle}
          </p>
        )}

        {(project.status || (project.tags?.length ?? 0) > 0) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.status && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-900 text-white">
                {project.status}
              </span>
            )}
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.outcomeImage?.[0] && (
          <div className="mt-8 rounded-2xl overflow-hidden">
            <img
              src={urlFor(project.outcomeImage[0]).quality(90).fit("max").url()}
              alt={project.projectName}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Challenges */}
        {project.challengesContent && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">Challenges</h2>
            <div className="prose max-w-none mt-4">
              <PortableText
                value={project.challengesContent as PortableTextBlock[]}
              />
            </div>
            {project.challengesImage?.[0] && (
              <div className="mt-6 rounded-2xl overflow-hidden">
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
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">Solution</h2>
            <div className="prose max-w-none mt-4">
              <PortableText
                value={project.solutionContent as PortableTextBlock[]}
              />
            </div>
            {project.solutionImage?.[0] && (
              <div className="mt-6 rounded-2xl overflow-hidden">
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
        {project.readMore && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">Read more</h2>
            <div className="prose max-w-none mt-4">
              <PortableText value={project.readMore as PortableTextBlock[]} />
            </div>
          </section>
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
  );
}
