import type { FC } from "react";

export type TabItem = {
  id: string;
  label: string;
  Content: FC;
  onClick?: (tabId: string) => void;
};

export * from "./about";
