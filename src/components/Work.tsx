import { useState, useEffect } from "react";
import { getProjects, urlFor } from "../lib/sanity";
import type { SanityProject } from "../types/sanity";
import { ArrowUpRight } from "@phosphor-icons/react";

const Work: React.FC = () => {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  console.log(projects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoaded(true);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return (
      <section className="py-16 px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  if (loaded && projects.length === 0) {
    return (
      <section className="py-16 px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">No projects found</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-16">
      <div className="mx-auto">
        <div className="space-y-16">
          {/* Featured Project */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2">
              <a
                href={`/projects/${projects[0]?.slug.current}`}
                className="block group"
              >
                <div className="relative w-full aspect-[4/3] lg:aspect-[3/2] rounded-3xl overflow-hidden">
                  {projects[0]?.outcomeImage?.[0]?.asset?._ref && (
                    <img
                      src={urlFor(projects[0].outcomeImage[0])
                        .quality(80)
                        .fit("max")
                        .url()}
                      alt={projects[0]?.projectName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-6 right-6 bg-white px-2 py-2 rounded-full">
                    <span className="text-lg font-medium text-gray-900">
                      <ArrowUpRight size={20} weight="bold" />
                    </span>
                  </div>
                </div>
                {/* Project name */}
                {projects[0]?.projectName && (
                  <div className="mt-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                      {projects[0].projectName}
                    </h3>
                  </div>
                )}
                {projects[0]?.projectSubtitle && (
                  <div className="mt-4 text-md text-gray-600">
                    {projects[0].projectSubtitle}
                  </div>
                )}
                {(projects[0]?.status ||
                  (Array.isArray(projects[0]?.tags) &&
                    projects[0]?.tags.length > 0)) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projects[0]?.status && (
                      <span className="text-sm px-4 py-2 rounded-full bg-gray-900 text-white">
                        {projects[0]?.status}
                      </span>
                    )}
                    {Array.isArray(projects[0]?.tags) &&
                      projects[0]?.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                )}
              </a>
            </div>
          </div>

          {/* Other Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.slice(1).map((project) => (
              <a
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="block group"
              >
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
                  {project.outcomeImage?.[0]?.asset?._ref && (
                    <img
                      src={urlFor(project.outcomeImage[0])
                        .quality(80)
                        .fit("max")
                        .url()}
                      alt={project.projectName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-6 right-6 bg-white px-2 py-2 rounded-full">
                    <span className="text-lg font-medium text-gray-900">
                      <ArrowUpRight size={20} weight="bold" />
                    </span>
                  </div>
                </div>
                {/* Project name */}
                {project.projectName && (
                  <div className="mt-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {project.projectName}
                    </h3>
                  </div>
                )}
                {/* Subtitle */}
                {project.projectSubtitle && (
                  <div className="mt-4 text-md text-gray-600">
                    {project.projectSubtitle}
                  </div>
                )}
                {/* Chips: status (first) + tags */}
                {(project.status ||
                  (Array.isArray(project.tags) && project.tags.length > 0)) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.status && (
                      <span className="text-sm px-4 py-2 rounded-full bg-[#ffbdbd] text-gray-900">
                        {project.status}
                      </span>
                    )}
                    {Array.isArray(project.tags) &&
                      project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
