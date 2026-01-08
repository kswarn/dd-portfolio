import { client } from '../sanity/client';
import type { SanityProject } from '../types/sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}

export async function getProjects(): Promise<SanityProject[]> {
  const query = `*[_type == "project"]{
    _id,
    slug,
    projectName,
    projectSubtitle,
    duration,
    status,
    tags,
    outcomeImage[]{asset, alt},
    outcomeURL,
    challengesContent,
    challengesImage[]{asset, alt},
    solutionContent,
    solutionImage[]{asset, alt},
    readMore,
  }`;

  try {
    const projects = await client.fetch(query);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
    slug,
    projectName,
    projectSubtitle,
    duration,
    status,
    tags,
    overview,
    iframeContent,
    role,
    outcome,
    outcomeImage[]{asset, alt},
    outcomeURL,
    challengesContent,
    challengesImage[]{asset, alt},
    solutionContent,
    solutionImage[]{asset, alt},
    readMore,
    team,
    problemStatement,
    ideation,
    usageResearch,
    usabilityTesting,
    usageResearchImage,
  }`;
  try {
    const project = await client.fetch(query, { slug });
    return project ?? null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    throw error;
  }
}
