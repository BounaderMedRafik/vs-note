"use client";

import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import MyConfirmModal from "@/components/modals/MyConfirmModal";
interface BannerProps {
  documentId: Id<"documents">;
}

const MyBanner = ({ documentId }: BannerProps) => {
  return <div> 4:34 MyBanner</div>;
};

export default MyBanner;
