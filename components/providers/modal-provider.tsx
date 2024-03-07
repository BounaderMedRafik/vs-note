"use client";

import { useEffect, useState } from "react";

import MySettingsModal from "@/components/modals/MySettingsModal";
import MyCoverImageModal from "../modals/MyCoverImageModal";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <MySettingsModal />
      <MyCoverImageModal />
    </>
  );
};
