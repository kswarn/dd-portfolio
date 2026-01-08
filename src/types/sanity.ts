// import type { PortableTextBlock } from "@portabletext/types";

export interface SanityProject {
  _id: string;
  slug: {
    current: string;
  };
  projectName: string;
  projectSubtitle: string;
  duration: string;
  team: string;
  status: string;
  tags: string[];
  iframeContent: string;
  role: string[];
  overview: string;
  outcome: string;
  outcomeImage: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  outcomeURL?: string;
  problemStatement?:string;
  ideation?:Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  usageResearch?:string;
  challengesContent: string;
  usabilityTesting?:string;
  challengesImage?: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  usageResearchImage?: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  solutionContent: string;
  solutionImage?: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  readMore: string;
}
