"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Icon from "@/components/Icon";

const reviews = [
  {
    id: "1",
    title: "Peaceful Getaway Done Right",
    description:
      " Escape Roots sorted me a serenity escape in the mountains. Perfectly quiet, gorgeous scenery, and a hotel that felt like a hidden gem. Felt like they read my mind with the planning. Cheers for that!",
    who: "Tom R.",
    where: "Adelaide",
    rating: 5,
    bg: "bg-primary",
  },
  {
    id: "2",
    title: "Serenity Escape That Actually Relaxed Me",
    description:
      "Needed a break and Escape Roots delivered. They set me up with a serene coastal hideaway-quiet beaches, no stress, just what I asked for. The whole trip felt like it was made for me. Bloody brilliant!",
    who: "Sarah T.",
    where: "Melbourne",
    rating: 5,
    bg: "bg-forth",
  },
  {
    id: "3",
    title: "Culture Fix That Hit the Spot",
    description:
      "Booked a cultural trip with Escape Roots and it was unreal-temples in Asia, food markets, the works. They sorted a star-quality hotel that was pure luxury. All custom, no fuss. Loved it!",
    who: "Jess H.",
    where: "Hobart",
    rating: 4,
    bg: "bg-primary",
  },
  {
    id: "4",
    title: "Thrill-Seeker’s Dream Come True",
    description:
      "Escape Roots hooked me up with a wild ride-bungy in New Zealand and surfing massive waves. The boutique digs were spot on, and it all felt built for me. Absolute ripper of a trip!",
    who: "Kaylen R.",
    where: "Melbourne",
    rating: 5,
    bg: "bg-forth",
  },
  {
    id: "5",
    title: "Foodie Adventure Sorted",
    description:
      "Escape Roots crafted me a foodie trip—fresh pasta in Italy, spicy curries in Thailand, all my picks. The star-quality stay was a bonus. Felt like they knew me better than I know myself!",
    who: "Ryan B.",
    where: "SA",
    rating: 4,
    bg: "bg-primary",
  },
  {
    id: "6",
    title: "Family Fun, No Stress",
    description:
      "Took the kids with Escape Roots, and they smashed it. Wildlife spotting for them, chill time for us, and a boutique hotel that kept everyone happy. Custom-made and hassle-free-top stuff!",
    who: "Kate F.",
    where: "Adelaide",
    rating: 5,
    bg: "bg-forth",
  },
];

function Reviews() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [autoplay],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="w-full pb-16">
      <Container containerClassName="px-0">
        <div className="w-full flex h-full items-center md:flex-row flex-col">
          <div className="md:w-1/3 w-full relative px-4 md:-translate-y-12">
            <span className="font-dm-serif-display text-[300px] text-secondary absolute -top-20">
              “
            </span>
            <div className="pt-36">
              <span className="text-6xl text-forth font-light font-allison">
                Read Our Top
              </span>
              <h2 className="font-dm-serif-display font-semibold text-6xl md:text-7xl">
                Client Reviews
              </h2>
              <p className="text-lg mt-4">
                Discover what Aussies say about their tailor-made
                escapes—wildlife thrills, serene retreats, and more await you
              </p>
            </div>
          </div>
          <div className="embla md:w-2/3 w-full h-full flex items-center justify-between overflow-hidden relative md:mt-0 mt-8 lg:px-0 md:px-2 sm:px-0">
            <Button
              variant={"secondary"}
              size={"xl"}
              className="embla__prev w-12 h-12 rounded-full mr-4 md:flex hidden items-center justify-center"
              onClick={scrollPrev}
            >
              <Icon.ChevronLeft />
            </Button>
            <div
              className="embla__viewport w-full h-full overflow-x-hidden"
              ref={emblaRef}
            >
              <div className="embla__container w-full h-full flex">
                {reviews.map((review, index) => (
                  <div
                    className={`embla__slide p-6 mr-2 text-white sm:rounded-2xl rounded-4xl shadow-md mb-6 h-[450px] w-[320px] select-none cursor-grab ${
                      review.bg
                    } flex flex-col justify-between sm:flex-[0_0_320px] flex-[0_0_80vw] mr-4 min-w-0 transition-[scale] delay-100 duration-700 ease-in-out ${
                      selectedIndex === index
                        ? "rounded-l-none"
                        : "sm:scale-y-100 scale-y-90"
                    }`}
                    key={`slide-${review.id}`}
                  >
                    <div>
                      <div className="flex items-center justify-center mt-2 text-2xl text-secondary">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                      <h3 className="text-3xl font-semibold mt-4">
                        {review.title}
                      </h3>
                      <p className="text-white mt-2 text-base">
                        {review.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20 flex flex-col">
                      <span className="font-bold">{review.who}</span>
                      <span className="italic">from {review.where}</span>
                    </div>
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
        </div>
      </Container>
    </section>
  );
}

export default Reviews;
