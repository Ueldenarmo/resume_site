import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "@/payload/hooks/revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "enabled", "order", "updatedAt"]
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete]
  },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      required: true
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 1
    },
    {
      name: "quote",
      type: "textarea",
      localized: true,
      required: true
    },
    {
      name: "author",
      type: "text",
      localized: true,
      required: true
    }
  ]
};
