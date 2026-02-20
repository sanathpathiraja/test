"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";

type ImgCardProps = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  title: string;
  description: string;
  reverse?: boolean;
};

function ImgCard({
  src,
  alt,
  className,
  title,
  description,
  imgClassName,
  reverse,
}: ImgCardProps) {
  return (
    <div
      className={cn(
        `overflow-hidden group relative lg:block flex sm:h-[40vh] h-[50vh] ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`,
        className,
      )}
    >
      <div className="w-full h-full z-10">
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover", imgClassName)}
          loading="lazy"
        />
      </div>

      <motion.div
        className="absolute lg:w-full md:w-2/5 w-1/2 inset-0 bg-forth-30 z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="w-full h-full md:p-6 p-4 bg-[#00000021]">
          <h3 className="md:text-4xl sm:text-3xl text-2xl font-dm-serif-display text-white mb-4">
            {title}
          </h3>
          <p className="text-white sm:text-base text-sm">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function DiscoverWorldBest() {
  return (
    <section className="mt-12 pb-16">
      <Container
        className="flex flex-col items-center"
        containerClassName="px-0"
      >
        <h2 className="font-dm-serif-display font-semibold text-6xl md:text-7xl px-4 text-center">
          Discover the World's Best
        </h2>

        <p className="text-lg max-w-4xl text-center mt-4 px-4 md:px-0">
          Unleash your wanderlust with journeys made just for you—stunning
          landscapes, vibrant cultures, and unforgettable adventures.
        </p>

        <div className="w-full mt-8 flex lg:flex-row flex-col overflow-hidden">
          <div className="lg:w-[70%] w-full">
            <div className="flex lg:flex-row flex-col">
              <ImgCard
                src="/gallery1.png"
                className="lg:w-[60%]"
                title="Your World, Your Stay"
                description="Epic adventures tailored for you."
              />

              <ImgCard
                src="/gallery3.png"
                className="lg:w-[40%]"
                title="Chase the Adrenaline"
                description="Fuel your pulse with custom adventures."
                reverse
              />
            </div>

            <div className="flex lg:flex-row flex-col">
              <ImgCard
                src="/gallery5.png"
                className="lg:w-1/3"
                title="Taste the Globe"
                description="Savor the world one bite at a time."
              />

              <ImgCard
                src="/gallery2.png"
                className="lg:w-1/3"
                title="Your Serenity Escape"
                description="Find your calm with a bespoke getaway."
                reverse
              />

              <ImgCard
                src="/gallery4.png"
                className="lg:w-1/3"
                title="Live the World’s Stories"
                description="Immerse yourself in vibrant traditions."
              />
            </div>
          </div>

          <ImgCard
            src="/gallery6.png"
            className="lg:w-[30%] lg:h-[80vh]"
            imgClassName="lg:object-center object-[center_30%]"
            title="Chase the Wild"
            description="Dive into bespoke wildlife tours."
            reverse
          />
        </div>
      </Container>
    </section>
  );
}
