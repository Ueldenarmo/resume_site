import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "@/payload/hooks/revalidate";
import { linkField } from "@/payload/fields/link";

export const Projects: CollectionConfig = {
  slug: "projects",
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
      name: "description",
      type: "textarea",
      localized: true,
      required: true
    },
    {
      name: "result",
      type: "text",
      localized: true,
      required: true
    },
    {
      name: "accentColor",
      type: "text",
      defaultValue: "#6C4BCF"
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media"
    },
    linkField({ name: "cta", label: "Project CTA", localized: true })
  ]
};
