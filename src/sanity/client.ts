import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "a8eevheq",
  dataset: "production",
  apiVersion: "v2025-10-18",
  useCdn: false,
});