import { Button } from "@/components/ui/button";
import React from "react";
import MyLogo from "./MyLogo";

const MyFooter = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
      <MyLogo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="outline" size="sm">
          Privacy Policy
        </Button>
        <Button variant="outline" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default MyFooter;
