"use client";

import { Spinner } from "@/components/MySpinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import MyNavigation from "./_components/MyNavigation";
import { MySearchCommand } from "@/components/search-command";

const Mylayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-full flex">
      <MyNavigation />
      <main className="flex-1 h-full overflow-y-auto">
        <MySearchCommand />
        {children}
      </main>
    </div>
  );
};

export default Mylayout;
