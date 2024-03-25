"use client";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

const MyItem = ({
  label,
  onClick,
  icon: Icon,
  id,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const ChevronsIcon = expanded ? ChevronDown : ChevronRight;
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new Meow note...",
      success: "Meow New note created!",
      error: "Failed to create a new Meow note.",
    });
  };
  return (
    <>
      <div
        className={cn(
          "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-[#EEEEEE] dark:hover:bg-[#EEEEEE]/20 transition-all    flex items-center  font-medium ",
          active &&
            "bg-[#EEEEEE] dark:bg-[#EEEEEE]/20 dark:text-lime-500 text-md text-[#76885B] font-bold"
        )}
        onClick={onClick}
        role="button"
        style={{
          paddingLeft: level ? ` ${level * 5 + 5}px` : "5px",
        }}
      >
        {!!id && (
          <div
            onClick={handleExpand}
            role="button"
            className="h-full rounded-sm "
          >
            <ChevronsIcon className="h-4 w-4  shrink-0 " />
          </div>
        )}

        {documentIcon ? (
          <div className=" shrink-0 mr-2 text-[18px] ">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px]  mr-2 " />
        )}

        <span className=" truncate">{label}</span>
        {isSearch && (
          <Button variant="popped" className="ml-auto text-xs ">
            <span className="text-xs font-black">CTRL + K</span>
          </Button>
        )}
        {!!id && (
          <div className="ml-auto flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                <div
                  role="button"
                  className="opacity-0 transition-all group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  <MoreHorizontal className="h-4 w-4 " />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60"
                align="start"
                side="right"
                forceMount
              >
                <DropdownMenuItem onClick={onArchive}>
                  <Trash className=" h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground ">
                  Last edited by:
                  <span className="font-bold">{user?.fullName}</span>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              role="button"
              onClick={onCreate}
              className="opacity-0 group-hover:opacity-100 transition-all h-full ml-auto rounded-sm hover:bg-neutral-300  dark:hover:bg-neutral-600/10 "
            >
              <Plus className="h-4 w-4 " />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyItem;

MyItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 6 + 12}px` : "6px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
