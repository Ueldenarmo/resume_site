import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "@/payload/hooks/revalidate";

export const SkillGroups: CollectionConfig = {
  slug: "skillGroups",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "enabled", "order", "updatedAt"]
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
      name: "title",
      type: "text",
      localized: true,
      required: true
    },
    {
      name: "level",
      type: "text",
      localized: true,
      required: true
    },
    {
      name: "description",
      type: "textarea",
      localized: true
    },
    {
      name: "attachmentImage",
      type: "upload",
      relationTo: "media"
    }
  ]
};
