import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const MyToolBar = ({ initialData, preview }: ToolbarProps) => {
  return <div>MyToolBar</div>;
};

export default MyToolBar;
