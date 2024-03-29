import React from "react";
import Image from "next/image";
import MarketingCat from "@/public/AfterMath/CatMarketing.png";
import MarketingCat2 from "@/public/AfterMath/CatMarketing2.jpg";
import MarketingCat3 from "@/public/AfterMath/CatMarketing3.jpg";

const MyHeroes = () => {
  return (
    <div className=" relative space-y-[-50px]">
      <Image
        src={MarketingCat}
        className=" dark:border-slate-100 h-48 rounded-full border-black border-2 mt-10 object-cover"
        alt="MarketingCat"
        objectFit="true"
      />
      <Image
        src={MarketingCat2}
        className=" dark:border-slate-100 h-48 rounded-full mt-1  border-black border-2 object-cover"
        alt="MarketingCat2"
        objectFit="true"
      />
      <Image
        src={MarketingCat3}
        className=" dark:border-slate-100 h-48 rounded-full  mt-1 border-black border-2 object-cover"
        alt="MarketingCat2"
        objectFit="true"
      />
    </div>
  );
};

export default MyHeroes;
