import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "@/payload/hooks/revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt"
  },
  upload: {
    adminThumbnail: "thumbnail"
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete]
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true
    },
    {
      name: "caption",
      type: "text",
      localized: true
    }
  ]
};
