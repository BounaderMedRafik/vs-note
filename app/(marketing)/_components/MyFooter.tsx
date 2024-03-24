import { Button } from "@/components/ui/button";
import React from "react";
import MyLogo from "./MyLogo";
import { Instagram } from "lucide-react";

const MyFooter = () => {
  return (
    <div className="py-6 bg-[#EEEEEE] dark:bg-[#001524]">
      <div className="flex pt-6  items-center w-full px-6  z-50 ">
        <MyLogo />
        <div className="md:ml-auto w-full justify-end md:justify-end flex items-center gap-x-2 text-muted-foreground">
          <Button variant="outline" size="sm">
            Privacy Policy
          </Button>
          <Button variant="outline" size="sm">
            Terms & Conditions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyFooter;
