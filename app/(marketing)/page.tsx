import React from "react";
import MyHeading from "./_components/MyHeading";
import MyHeroes from "./_components/MyHeroes";
import MyFooter from "./_components/MyFooter";

const page = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <MyHeading />
        <MyHeroes />
      </div>
      <MyFooter />
    </div>
  );
};

export default page;
