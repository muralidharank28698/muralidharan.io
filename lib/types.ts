import React from "react";
import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export interface ILibrariesAndFramework {
  name?: string;
  icon?: React.ReactNode | string;
}

export interface IEditorTools {
  name?: string;
  icon?: React.ReactNode | string;
}
