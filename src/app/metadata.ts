import { Metadata } from "next";
import { SITE_TITLE, HOME_OG_IMAGE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE}`,
  description: `${SITE_TITLE}.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
}; 