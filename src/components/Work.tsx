import { useState, useEffect } from "react";
import { getProjects, urlFor } from "../lib/sanity";
import type { SanityProject } from "../types/sanity";
import { ArrowUpRight } from "@phosphor-icons/react";

/** Project names in the order you want them on the homepage. Must match projectName in Sanity exactly. */
const PROJECT_DISPLAY_ORDER: string[] = [
  "Mito Health",
  "UTickets",
  "Huli Jaggery Rum",
  "MyMomentClub",
  "Jiopay",
];

function sortProjectsByOrder(
  projects: SanityProject[],
  order: string[]
): SanityProject[] {
  if (order.length === 0) return projects;
  const orderLower = order.map((n) => n.trim().toLowerCase());
  return [...projects].sort((a, b) => {
    const aName = (a.projectName?.trim() ?? "").toLowerCase();
    const bName = (b.projectName?.trim() ?? "").toLowerCase();
    const aIdx = orderLower.findIndex((name) => aName === name || aName.includes(name));
    const bIdx = orderLower.findIndex((name) => bName === name || bName.includes(name));
    if (aIdx === -1 && bIdx === -1) return 0;
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });
}

const Work: React.FC = () => {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  console.log(projects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(sortProjectsByOrder(data, PROJECT_DISPLAY_ORDER));
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-start">
          {projects.map((project) => (
            <a
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="block group w-full"
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
                <div className="absolute top-6 right-6 bg-[#ffbdbd] hover:bg-gray-800 hover:text-[#fff] px-2 py-2 rounded-full">
                  <span className="text-lg font-medium">
                    <ArrowUpRight
                      size={20}
                      weight="bold"
                      className="hover:text-[#fff]"
                    />
                  </span>
                </div>
              </div>
              {project.projectName && (
                <div className="mt-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {project.projectName}
                  </h3>
                </div>
              )}
              {project.projectSubtitle && (
                <div className="mt-4 text-md text-gray-600">
                  {project.projectSubtitle}
                </div>
              )}
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
    </section>
  );
};

export default Work;
