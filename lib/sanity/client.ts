import { ClientConfig, createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "aj5nqcwz",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false
} satisfies ClientConfig;

export const client = createClient(config);

const adminConfig = {
  ...config,
  token: process.env.EXPO_PUBLIC_SANITY_TOKEN
} satisfies ClientConfig;

export const adminClient = createClient(adminConfig);

// Image URL builder
const builder = imageUrlBuilder(config);
export const urlFor = (source: string) => builder.image(source);
