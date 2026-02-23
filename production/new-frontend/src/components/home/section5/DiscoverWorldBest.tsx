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
  descriptionClassName?: string;
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
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          className={cn(
            "w-full h-full object-center object-cover z-10",
            imgClassName,
          )}
          loading="lazy"
        />
      </div>
      <motion.div
        className="group absolute lg:w-full md:w-2/5 w-1/2 lg:inset-0 top-0 bottom-0 lg:left-0 lg:right-0 bg-forth-30 z-20"
        initial={{
          opacity: screenWidth < 1024 ? 0 : 1,
          x: screenWidth < 1024 ? (reverse ? 100 : -100) : 0,
        }}
        whileInView={{ opacity: screenWidth < 1024 ? 1 : 0, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileHover={screenWidth > 1024 ? { opacity: 1, x: 0 } : undefined}
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

function DiscoverWorldBest() {
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
          landscapes, vibrant cultures, and unforgettable adventures, all
          tailored to your style.
        </p>
        <div className="w-full mt-8 flex lg:flex-row flex-col overflow-hidden">
          <div className="lg:w-[70%] w-full">
            <div className="w-full flex lg:flex-row flex-col">
              <ImgCard
                src="/gallery1.png"
                className="lg:w-[60%] w-full"
                title="Your World, Your Stay"
                description="Epic adventures, tailored for you, with star-quality hotels and boutique charm."
              />
              <ImgCard
                src="/gallery3.png"
                className="lg:w-[40%] w-full"
                title="Chase the Adrenaline"
                description="Fuel your pulse with custom adventures—skydiving over reefs, trekking volcanic peaks, or surfing untamed waves—all designed to match your daring spirit."
                reverse
              />
            </div>
            <div className="w-full flex lg:flex-row flex-col">
              <ImgCard
                src="/gallery5.png"
                className="lg:w-1/3 w-full"
                title="Taste the Globe"
                description="Savor the world one bite at a time—think truffle hunts in Italy, spice trails in India, or seafood feasts by the Aussie coast—tailored to your culinary cravings."
              />
              <ImgCard
                src="/gallery2.png"
                className="lg:w-1/3 w-full"
                title="Your Serenity Escape"
                description="Find your calm with a bespoke getaway—peaceful vistas and quiet retreats, crafted for you."
                reverse
              />
              <ImgCard
                src="/gallery4.png"
                className="lg:w-1/3 w-full"
                title="Live the World’s Stories"
                description="Immerse yourself in vibrant traditions and hidden gems—from bustling Asian markets to European cobblestone charm—crafted into a journey that’s uniquely yours."
              />
            </div>
          </div>
          <ImgCard
            src="/gallery6.png"
            className="lg:w-[30%] w-full lg:h-[80vh]"
            imgClassName="lg:object-center object-[center_30%]"
            title="Chase the wild"
            description="Dive into bespoke wildlife tours—think Outback roos, jungle elephants, or Arctic foxes—designed to fuel your curiosity and fit your travel style."
            reverse
          />
        </div>
      </Container>
    </section>
  );
}

export default DiscoverWorldBest;
