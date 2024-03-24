import React from "react";
import Image from "next/image";
import Logo from "@/public/AfterMath/LogoMeowNote.png";
import Link from "next/link";
const MyLogo = () => {
  return (
    <Link href="/">
      <div className="hidden md:flex w-24">
        <Image src={Logo} alt="MeowNote" />
      </div>
    </Link>
  );
};

export default MyLogo;
