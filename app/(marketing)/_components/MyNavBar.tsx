"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import MyLogo from "./MyLogo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/MySpinner";

const MyNavBar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center gap-4 w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <MyLogo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && (
          <div className="text-xs flex gap-2 items-center ">
            <Spinner />
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="outline">Log In</Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button>GET VS-NOTE NOW</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button className=" rounded-full" variant="outline" asChild>
              <Link href="/documents">Access VS-NOTE</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default MyNavBar;
