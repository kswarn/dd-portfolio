// import type { PortableTextBlock } from "@portabletext/types";

export interface SanityProject {
  _id: string;
  slug: {
    current: string;
  };
  projectName: string;
  projectSubtitle: string;
  duration: string;
  teamSize: string;
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
  challengesContent: string;
  challengesImage?: Array<{
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
