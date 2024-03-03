"use client";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
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
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <>
      <div
        className={cn(
          "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-secondary/50 transition-all border-b-[1px]  flex items-center text-muted-foreground font-medium",
          active && "bg-primary/5 text-primary"
        )}
        onClick={onClick}
        role="button"
        style={{
          paddingLeft: level ? ` ${level * 12 + 12}px` : "12px",
        }}
      >
        {!!id && (
          <div
            onClick={handleExpand}
            role="button"
            className="h-full rounded-sm hover:bg-primary dark:bg-primary-foreground"
          >
            <ChevronsIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          </div>
        )}

        {documentIcon ? (
          <div className=" shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        )}

        <span className=" truncate">{label}</span>
        {isSearch && (
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 border bg-muted px-1.5 font-mono text-[10px] font-bold text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
        {!!id && (
          <div className="ml-auto flex items-center gap-x-2">
            <div
              role="button"
              onClick={onCreate}
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rouded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
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
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
