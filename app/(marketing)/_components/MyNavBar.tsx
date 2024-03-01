"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import MyLogo from "./MyLogo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

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
            Loading
            <Loader size={15} className="animate-spin" />
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
        <ModeToggle />
      </div>
    </div>
  );
};

export default MyNavBar;
