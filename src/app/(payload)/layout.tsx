import config from "@payload-config";
import "@payloadcms/next/css";
import {
  RootLayout as PayloadRootLayout,
  handleServerFunctions
} from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap.js";
import type { ServerFunctionClient } from "payload";

export default function Layout({ children }: { children: React.ReactNode }) {
  const serverFunction: ServerFunctionClient = async (args) => {
    "use server";

    return handleServerFunctions({
      ...args,
      config,
      importMap
    });
  };

  return PayloadRootLayout({
    children,
    config,
    importMap,
    serverFunction
  });
}
