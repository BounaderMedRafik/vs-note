"use client";

import { Spinner } from "@/components/MySpinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight, NotepadText } from "lucide-react";
import Link from "next/link";

const MyHeading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl font-MyHeading sm:text-3xl md:text-4xl font-black">
        Unlock the Power of Productivity: Where VS Code Themes Meet Notion's
        Brilliance! <span className="underline">VS-NOTE</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-light">
        Migrate the visibility of Visual Studio Code <br /> with the
        functionality of Notion
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
            <NotepadText className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Start With Us Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default MyHeading;
