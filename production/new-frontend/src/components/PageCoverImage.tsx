"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { buildImageUrl } from "@/lib/consts";

type PageCoverImageProps = {
  imgData?: {
    imageUrl?: string;
  };
};

function PageCoverImage({ imgData }: PageCoverImageProps) {
  const { scrollY } = useScroll();
  // Only create transform once viewportHeight is known
  const bgY = useTransform(scrollY, [0, 1000], [0, -500]);

  return (
    <div className="absolute w-full h-screen overflow-hidden">
      <motion.div
        className="fixed left-0 right-0 top-0 w-full h-screen -z-30 bg-cover bg-center bg-no-repeat select-none overflow-hidden"
        style={{
          backgroundImage: imgData?.imageUrl
            ? `url(${buildImageUrl(imgData?.imageUrl)})`
            : undefined,
          y: bgY,
        }}
      />
    </div>
  );
}

export default PageCoverImage;
