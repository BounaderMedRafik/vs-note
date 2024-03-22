import React from "react";
import MyNavBar from "./_components/MyNavBar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <MyNavBar />
      <main className=" h-full pt-40 bg-[#EEEEEE] dark:bg-[#001524]">
        {children}
      </main>
    </div>
  );
};

export default MarketingLayout;
