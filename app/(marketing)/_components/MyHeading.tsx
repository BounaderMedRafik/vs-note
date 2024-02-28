"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MyHeading = () => {
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
      <Button>
        Sign In
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default MyHeading;
