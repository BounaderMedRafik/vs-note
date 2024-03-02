"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const page = () => {
  const { user } = useUser();

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
      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Got a note?
      </Button>
    </div>
  );
};

export default page;
