import type { Field } from "payload";

type LinkFieldOptions = {
  name: string;
  label: string;
  localized?: boolean;
};

export function linkField(options: LinkFieldOptions): Field {
  return {
    name: options.name,
    label: options.label,
    type: "group",
    fields: [
      {
        name: "label",
        label: "Label",
        type: "text",
        localized: options.localized ?? true,
        required: true
      },
      {
        name: "href",
        label: "URL",
        type: "text",
        required: true
      },
      {
        name: "openInNewTab",
        label: "Open in new tab",
        type: "checkbox",
        defaultValue: false
      }
    ]
  };
}
