"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!!",
      error: "Failed to create the note :(",
    });
  };

  return (
    <div className=" h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/placeholders/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/placeholders/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className=" font-semibold text-xl">
        Welcom to {user?.firstName}&apos;s VS-NOTE
      </h2>
      <Button variant="outline" onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Got a note?
      </Button>
    </div>
  );
};

export default page;
