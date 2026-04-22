import type { GlobalConfig } from "payload";
import { revalidateGlobalAfterChange } from "@/payload/hooks/revalidate";
import { linkField } from "@/payload/fields/link";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  label: "Site Settings",
  hooks: {
    afterChange: [revalidateGlobalAfterChange]
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      localized: true,
      required: true,
      defaultValue: "Your Name"
    },
    {
      name: "contactItems",
      type: "array",
      labels: {
        singular: "Contact item",
        plural: "Contact items"
      },
      fields: [
        {
          name: "value",
          type: "text",
          localized: true,
          required: true
        }
      ]
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        linkField({ name: "link", label: "Link", localized: true }),
        {
          name: "icon",
          label: "Icon (SVG)",
          type: "upload",
          relationTo: "media"
        }
      ]
    },
    {
      name: "defaultSEO",
      type: "group",
      fields: [
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
          name: "ogImage",
          type: "upload",
          relationTo: "media"
        }
      ]
    }
  ]
};
