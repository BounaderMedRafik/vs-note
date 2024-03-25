"use client";

import React from "react";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { MyToolbar } from "@/components/MyToolBar";
import MyCover from "@/components/MyCover";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import MyEditor from "@/components/MyEditor";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const Docpage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/MyEditor"), { ssr: false }),
    []
  );

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <MyCover.Skeleton />
        {documents.}
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not Founds</div>;
  }

  return (
    <div className="pb-40">
      <MyCover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl  mx-auto">
        <MyToolbar initialData={document} />
        <MyEditor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default Docpage;
