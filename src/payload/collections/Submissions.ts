import type { CollectionConfig } from "payload";

export const Submissions: CollectionConfig = {
  slug: "submissions",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "preferredChannel", "status", "createdAt"]
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user)
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "email",
      type: "email",
      required: true
    },
    {
      name: "preferredChannel",
      type: "text"
    },
    {
      name: "message",
      type: "textarea",
      required: true
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Processed", value: "processed" },
        { label: "Archived", value: "archived" }
      ]
    }
  ]
};
