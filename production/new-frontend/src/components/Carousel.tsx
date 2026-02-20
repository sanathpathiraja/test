"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { createSlug } from "@/lib/funcs";
import Icon from "./Icon";
import { cn } from "@/lib/utils";
import { buildImageUrl } from "@/lib/consts";

type CarouselCardImageType = {
  id: string;
  caption: string | null;
  displayImage: boolean;
  fileName: string;
  imageUrl: string;
  thumbName: string;
  thumbUrl: string;
};

export type CarouselCardType = {
  country: string;
  displayImage: CarouselCardImageType;
  id: string;
  name: string;
  duration: number;
  noOfNights: number;
  price: number;
  style: string;
  tripCode: string;
};

const decimalFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function Carousel({
  list,
  carouselPriceColor,
}: {
  list: CarouselCardType[];
  carouselPriceColor?: string;
}) {
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="embla w-full mt-8">
      <div className="w-full flex items-center justify-center">
        <Button
          variant={"secondary"}
          size={"xl"}
          className="embla__prev w-12 h-12 rounded-full mr-4 md:flex hidden items-center justify-center"
          onClick={scrollPrev}
        >
          <Icon.ChevronLeft />
        </Button>
        <div
          className="embla__viewport h-full w-full max-w-4xl overflow-hidden"
          ref={emblaRef}
        >
          <div className="embla__container w-full h-full flex">
            {list.map((card, idx) => (
              <div
                key={`carousel-list-key-${card.id}`}
                className={`embla__slide ${
                  list.length > 3
                    ? "md:flex-[0_0_384px]"
                    : "md:flex-[0_0_calc(50%-0.5rem))]"
                } flex-[0_0_80vw] md:h-60 h-[60vh] overflow-hidden md:rounded-xl rounded-4xl cursor-pointer transition-[scale,border-radius] duration-700 delay-100 text-white mr-4 ${
                  idx === selectedIndex
                    ? "rounded-l-none"
                    : "scale-y-90 md:scale-y-100"
                }
                                `}
                style={{
                  backgroundImage: card.displayImage?.imageUrl
                    ? `url(${buildImageUrl(card.displayImage.imageUrl)})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Link
                  href={`/trips/${createSlug(card.name, card.id)}`}
                  className="w-full h-full select-none"
                >
                  <div
                    className={`w-full h-full transition-all duration-300 ease-in-out ${
                      idx === selectedIndex ? "" : ""
                    }`}
                  >
                    <div className="w-full h-full flex flex-col justify-between transition-colors duration-300 ease-in-out bg-[#00000050] hover:bg-[#00000000] relative">
                      {carouselPriceColor ? (
                        <div className="absolute right-2.5 top-2.5">
                          <div className="relative flex gap-1 items-center justify-center bg-white px-3 py-1 rounded-full">
                            <span className="z-10 text-secondary text-sm">
                              Deal
                            </span>
                            <Icon.Tag className="text-secondary text-xl z-20" />
                          </div>
                        </div>
                      ) : null}
                      <div className="w-full flex flex-col md:p-4 p-8 pb-0">
                        <span className="flex items-center gap-2">
                          <Icon.Location className="text-lg" />
                          <span className="md:text-base text-xl md:font-medium font-semibold">
                            {card.country}
                          </span>
                        </span>
                        <span className="text-2xl font-medium">
                          {card.name}
                        </span>
                        <span className="text-base font-light">
                          {card.style}
                        </span>
                      </div>
                      <div className="w-full flex items-end justify-between absolute bottom-0 left-0 right-0">
                        <div className="w-2/3">
                          <span className="font-semibold md:p-4 p-8 pr-0 text-base flex items-center">
                            <Icon.Calendar className="inline-block mr-2" />
                            <span>{`${card.duration} Days ${card.noOfNights} Nights`}</span>
                          </span>
                        </div>
                        <div
                          className={cn(
                            "flex flex-col items-start md:p-4 p-8 bg-forth rounded-tl-4xl",
                            carouselPriceColor ? "bg-secondary" : "",
                          )}
                        >
                          {carouselPriceColor ? (
                            <small className="w-full">
                              <del>{`A$${decimalFormatter.format(
                                Math.round((card.price * 1.3) / 10) * 10,
                              )}`}</del>
                            </small>
                          ) : (
                            <small className="font-normal text-sm">From</small>
                          )}
                          <span className="font-bold text-2xl">{`A$${decimalFormatter.format(
                            card.price,
                          )}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant={"secondary"}
          size={"xl"}
          className="embla__next w-12 h-12 rounded-full ml-4 md:flex hidden items-center justify-center"
          onClick={scrollNext}
        >
          <Icon.ChevronRight />
        </Button>
      </div>

      <div className="w-full hidden md:flex h-[500px] mt-12 bg-primary">
        {/* Main Image */}
        <div className="grow h-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`main-img-${list[selectedIndex === 0 ? list.length - 1 : selectedIndex - 1].id}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                backgroundImage: `url(${buildImageUrl(
                  list[
                    selectedIndex === 0 ? list.length - 1 : selectedIndex - 1
                  ].displayImage?.imageUrl || "",
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </AnimatePresence>
        </div>
        {/* Main Text Content */}
        <div className="lg:w-[500px] md:w-[400px] w-[300px] h-full text-white p-8 flex flex-col items-start overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`details-${list[selectedIndex === 0 ? list.length - 1 : selectedIndex - 1].id}`}
              className="w-full h-full flex flex-col justify-between items-start"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="w-full flex flex-col">
                <span className="flex items-center gap-2">
                  <Icon.Location className="text-2xl" />
                  <span className="text-2xl font-medium">
                    {
                      list[
                        selectedIndex === 0
                          ? list.length - 1
                          : selectedIndex - 1
                      ].country
                    }
                  </span>
                </span>
                <span className="text-4xl font-medium">
                  {
                    list[
                      selectedIndex === 0 ? list.length - 1 : selectedIndex - 1
                    ].name
                  }
                </span>
                <span className="text-base font-light">
                  {
                    list[
                      selectedIndex === 0 ? list.length - 1 : selectedIndex - 1
                    ].style
                  }
                </span>
              </div>
              <div className="w-full">
                <div className="w-full flex items-end justify-between py-8">
                  <div className="w-1/2 border-r border-white py-2">
                    <span className="font-semibold text-xl">
                      <Icon.Calendar className="inline-block mr-2" />
                      {`${
                        list[
                          selectedIndex === 0
                            ? list.length - 1
                            : selectedIndex - 1
                        ].duration
                      } Days ${
                        list[
                          selectedIndex === 0
                            ? list.length - 1
                            : selectedIndex - 1
                        ].noOfNights
                      } Nights`}
                    </span>
                  </div>
                  <div className="flex flex-col items-start px-4">
                    {carouselPriceColor ? (
                      <small className="w-full ">
                        <del>{`A$${decimalFormatter.format(
                          Math.round(
                            (list[
                              selectedIndex === 0
                                ? list.length - 1
                                : selectedIndex - 1
                            ].price *
                              1.3) /
                              10,
                          ) * 10,
                        )}`}</del>
                      </small>
                    ) : (
                      <small className="font-normal text-base">From</small>
                    )}
                    <span className="font-bold text-3xl">{` A$${decimalFormatter.format(
                      list[
                        selectedIndex === 0
                          ? list.length - 1
                          : selectedIndex - 1
                      ].price,
                    )}`}</span>
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-2 border-t border-white pt-8">
                  <Link
                    href={`/book-now/${
                      list[
                        selectedIndex === 0
                          ? list.length - 1
                          : selectedIndex - 1
                      ].id
                    }`}
                    aria-label={`Book Now for ${
                      list[
                        selectedIndex === 0
                          ? list.length - 1
                          : selectedIndex - 1
                      ].name
                    } Trip`}
                    className="w-full"
                  >
                    <Button
                      variant={"secondary"}
                      className="w-full rounded-xl font-semibold"
                      size={"xl"}
                    >
                      Book Now
                    </Button>
                  </Link>
                  <Link
                    href={`/trips/${createSlug(
                      list[
                        selectedIndex === 0
                          ? list.length - 1
                          : selectedIndex - 1
                      ].name,
                      list[
                        selectedIndex === 0
                          ? list.length - 1
                          : selectedIndex - 1
                      ].id,
                    )}`}
                    className="w-full"
                    aria-label={`See More about ${
                      list[
                        selectedIndex === 0
                          ? list.length - 1
                          : selectedIndex - 1
                      ].name
                    } Trip`}
                  >
                    <Button
                      variant={"ghost"}
                      className="w-full rounded-xl font-bold hover:text-white"
                      size={"xl"}
                    >
                      <span>See More</span>
                      <Icon.ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
