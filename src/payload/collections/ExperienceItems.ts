import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "@/payload/hooks/revalidate";

export const ExperienceItems: CollectionConfig = {
  slug: "experienceItems",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "period", "enabled", "order", "updatedAt"]
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
      name: "period",
      type: "text",
      localized: true,
      required: true
    },
    {
      name: "title",
      type: "text",
      localized: true,
      required: true
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      required: true
    },
    {
      name: "highlight",
      type: "text",
      localized: true,
      required: true
    }
  ]
};
