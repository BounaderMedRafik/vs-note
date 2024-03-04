import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import MyIconPicker from "./MyIconPicker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const MyToolBar = ({ initialData, preview }: ToolbarProps) => {
  return (
    <>
      <div className="pl-[54px] group relative">
        {!!initialData.icon && !preview && (
          <div className="flex items-center gap-x-2 group/icon pt-6">
            <MyIconPicker asChild onChange={() => {}}>
              <p className="text-6xl hover:opacity-75 transition-all">
                {initialData.icon}
              </p>
            </MyIconPicker>
            <Button
              onClick={() => {}}
              variant="ghost"
              size="icon"
              className=" rounded-full opacity-50 group-hover/icon:opacity-100 transition-all text-muted-foreground"
            >
              <X className=" h-4 w-4" />
            </Button>
          </div>
        )}
        {!!initialData.icon && preview && (
          <p className="text-6xl pt-6">{initialData.icon}</p>
        )}
        <div className="opacity-100 group-hover:opacity-100 flex items-center gap-x-1 py-4">
          {!!initialData.icon && !preview && (
            <MyIconPicker asChild onChange={() => {}}>
              <Button
                className=" text-muted-foreground text-xs"
                variant="outline"
                size="sm"
              >
                <Smile className=" h-4 w-4 mr-2" />
                Add Icon
              </Button>
            </MyIconPicker>
          )}
          {!initialData.coverImage && !preview && (
            <Button>
              <ImageIcon />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MyToolBar;
