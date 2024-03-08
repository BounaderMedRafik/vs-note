"use client";

import React from "react";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { MyToolbar } from "@/components/MyToolBar";
import MyCover from "@/components/MyCover";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const Docpage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not Founds</div>;
  }

  return (
    <div className="pb-40">
      <MyCover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl  mx-auto">
        <MyToolbar initialData={document} />
      </div>
    </div>
  );
};

export default Docpage;
