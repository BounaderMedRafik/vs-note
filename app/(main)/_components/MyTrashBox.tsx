"use client";
import { Spinner } from "@/components/MySpinner";
import MyConfirmModal from "@/components/modals/MyConfirmModal";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
const MyTrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: " Failed to restore note.",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm ">
      <div className="flex items-center gap-x-1 p-2">
        <Search />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent border-black/10 bg-secondary/10"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 p-1 ">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No Docs Found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm mt-1 rounded-sm w-full hover:bg-secondary/5 flex items-center text-primary justify-between"
          >
            <span className=" font-semibold truncate pl-2">
              • {document.title}
            </span>
            <div className="flex items-center gap-1">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 bg-[#76885B] text-white hover:bg-[#76885B]/80 dark:hover:bg-neutral-600"
              >
                <Undo className=" text-muted-foreground h-4 w-4" />
              </div>
              <MyConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 bg-red-500 text-white hover:bg-red-400 "
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </MyConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTrashBox;
