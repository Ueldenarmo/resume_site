import type { GlobalConfig } from "payload";
import { linkField } from "@/payload/fields/link";
import { revalidateGlobalAfterChange } from "@/payload/hooks/revalidate";

const sectionMetaFields = [
  {
    name: "enabled",
    type: "checkbox",
    defaultValue: true,
    required: true
  },
  {
    name: "order",
    type: "number",
    defaultValue: 1,
    required: true
  }
] as const;

export const HomePage: GlobalConfig = {
  slug: "homePage",
  label: "Home Page",
  hooks: {
    afterChange: [revalidateGlobalAfterChange]
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "eyebrow",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "name",
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
        linkField({ name: "primaryCta", label: "Primary CTA", localized: true }),
        linkField({ name: "secondaryCta", label: "Secondary CTA", localized: true }),
        {
          name: "facts",
          type: "array",
          fields: [
            {
              name: "text",
              type: "text",
              localized: true,
              required: true
            }
          ]
        },
        {
          name: "portrait",
          type: "upload",
          relationTo: "media"
        },
        {
          name: "portraitLabel",
          type: "text",
          localized: true
        }
      ]
    },
    {
      name: "about",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "title",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "body",
          type: "textarea",
          localized: true,
          required: true
        },
        {
          name: "principles",
          type: "array",
          fields: [
            {
              name: "text",
              type: "text",
              localized: true,
              required: true
            }
          ]
        },
        {
          name: "stats",
          type: "array",
          fields: [
            {
              name: "value",
              type: "text",
              localized: true,
              required: true
            },
            {
              name: "label",
              type: "text",
              localized: true,
              required: true
            }
          ]
        }
      ]
    },
    {
      name: "skills",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "title",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "subtitle",
          type: "textarea",
          localized: true,
          required: true
        },
        {
          name: "items",
          type: "relationship",
          relationTo: "skillGroups",
          hasMany: true
        }
      ]
    },
    {
      name: "experience",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "title",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "subtitle",
          type: "textarea",
          localized: true,
          required: true
        },
        {
          name: "items",
          type: "relationship",
          relationTo: "experienceItems",
          hasMany: true
        }
      ]
    },
    {
      name: "projects",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "title",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "items",
          type: "relationship",
          relationTo: "projects",
          hasMany: true
        }
      ]
    },
    {
      name: "testimonials",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "title",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "subtitle",
          type: "textarea",
          localized: true,
          required: true
        },
        {
          name: "items",
          type: "relationship",
          relationTo: "testimonials",
          hasMany: true
        },
        {
          name: "signalTitle",
          type: "text",
          localized: true
        },
        {
          name: "signalBody",
          type: "textarea",
          localized: true
        }
      ]
    },
    {
      name: "preferences",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "title",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "items",
          type: "array",
          fields: [
            {
              name: "text",
              type: "text",
              localized: true,
              required: true
            }
          ]
        }
      ]
    },
    {
      name: "faq",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "title",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "items",
          type: "array",
          fields: [
            {
              name: "question",
              type: "text",
              localized: true,
              required: true
            },
            {
              name: "answer",
              type: "textarea",
              localized: true,
              required: true
            }
          ]
        }
      ]
    },
    {
      name: "contact",
      type: "group",
      fields: [
        ...sectionMetaFields,
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
          name: "methods",
          type: "array",
          fields: [linkField({ name: "method", label: "Method", localized: true })]
        },
        {
          name: "formTitle",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "formDescription",
          type: "textarea",
          localized: true,
          required: true
        },
        {
          name: "privacyText",
          type: "text",
          localized: true,
          required: true
        }
      ]
    },
    {
      name: "footer",
      type: "group",
      fields: [
        ...sectionMetaFields,
        {
          name: "copyright",
          type: "text",
          localized: true,
          required: true
        },
        {
          name: "links",
          type: "array",
          fields: [linkField({ name: "link", label: "Footer Link", localized: true })]
        }
      ]
    }
  ]
};
