"use client";

import { Spinner } from "@/components/MySpinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight, Cat, GanttChart, NotepadText } from "lucide-react";
import Link from "next/link";

const MyHeading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl   font-MyHeading sm:text-3xl md:text-6xl font-black">
        Let's Open A Whole Meow Note World For You
      </h1>
      <h3 className=" flex text-base sm:text-xl md:text-2xl font-light">
        <span className="relative font-bold text-[#627254]">MeowNote</span> will
        be the best place to organize your notes and clearify your brainstorms
        in very cute templates
      </h3>
      {isLoading && (
        <div className=" w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Check Docs
            <Cat className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Let's Begin Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default MyHeading;
