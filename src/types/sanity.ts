import type { PortableTextBlock } from "@portabletext/types";

export interface SanityProject {
  _id: string;
  slug: {
    current: string;
  };
  projectName: string;
  projectSubtitle: string;
  duration: string;
  status: string;
  tags: string[];
  outcomeImage: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  outcomeURL?: string;
  challengesContent: PortableTextBlock[];
  challengesImage?: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  solutionContent: PortableTextBlock[];
  solutionImage?: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  readMore: PortableTextBlock[];
}
