"use client";
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { motion, AnimatePresence } from "framer-motion";
import { TripImages } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Icon from "../Icon";
import { buildImageUrl } from "@/lib/consts";

const MAX_IMAGES_TO_SHOW = 4;

type PreviewImageProps = {
  image: TripImages[number];
  closeGallery: () => void;
};

function PreviewImage({ image, closeGallery }: PreviewImageProps) {
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeGallery();
    }
  }

  return (
    <div className="embla__slide flex-[0_0_100vw] flex items-center justify-center">
      <div
        className="w-full h-full flex items-center justify-center"
        onClick={handleClick}
      >
        <img
          src={buildImageUrl(image.imageUrl)}
          alt={image.caption || ""}
          className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-cover z-[105]"
        />
      </div>
    </div>
  );
}

type PreviewImageListProps = {
  image: TripImages;
  closeGallery: () => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

function PreviewImageList({
  image,
  closeGallery,
  selectedIndex,
  setSelectedIndex,
}: PreviewImageListProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

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
    if (emblaApi) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [emblaApi, selectedIndex]);

  useEffect(() => {
    // when user press left or right arrow key, scroll to previous or next image
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      } else if (event.key === "Escape") {
        closeGallery();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollPrev, scrollNext, closeGallery]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 right-0 w-screen h-screen bg-[#00000088]"
        onClick={closeGallery}
      />
      <div className="embla w-full">
        <div className="w-full flex items-center justify-center">
          <Button
            variant={"secondary"}
            size={"xl"}
            className="embla__prev w-12 h-12 rounded-full mr-4 md:flex hidden items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-[1000]"
            onClick={scrollPrev}
          >
            <Icon.ChevronLeft />
          </Button>
          <div
            className="embla__viewport w-full h-full flex items-center justify-center"
            ref={emblaRef}
          >
            <div className="embla__container w-full h-full flex">
              {image.map((img) => (
                <PreviewImage
                  key={img.id}
                  image={img}
                  closeGallery={closeGallery}
                />
              ))}
            </div>
          </div>
          <Button
            variant={"secondary"}
            size={"xl"}
            className="embla__next w-12 h-12 rounded-full ml-4 md:flex hidden items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-[1000]"
            onClick={scrollNext}
          >
            <Icon.ChevronRight />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

type TripGalleryProps = {
  images: TripImages;
};

function TripGallery({ images }: TripGalleryProps) {
  const [clickedImageIndex, setClickedImageIndex] = React.useState<number>(0);
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const displayImage = images.find((image) => image.displayImage)!;
  const otherImages = images.filter((image) => !image.displayImage);

  function closeGallery() {
    setGalleryOpen(false);
  }

  function openGallery(image: TripImages[number]) {
    setClickedImageIndex(images.indexOf(image));
    setGalleryOpen(true);
  }

  useEffect(() => {
    // when user press escape key, close the gallery
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && galleryOpen) {
        closeGallery();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryOpen]);

  useEffect(() => {}, [images]);

  return (
    <>
      <div className="w-full sm:mt-12 mt-8 flex md:h-[450px] h-[700px] md:flex-row flex-col">
        <div
          className="md:w-3/5 w-full h-full overflow-hidden flex items-center justify-center md:min-h-[450px] bg-cover bg-center bg-no-repeat cursor-pointer"
          style={{
            backgroundImage: displayImage?.imageUrl
              ? `url(${buildImageUrl(displayImage.imageUrl)})`
              : undefined,
          }}
          onClick={() => openGallery(displayImage)}
        />

        <div className="md:w-2/5 w-full h-full">
          <div className="w-full h-full flex flex-row flex-wrap">
            {otherImages.slice(0, MAX_IMAGES_TO_SHOW).map((image, index) => (
              <div
                key={image.id}
                className="w-1/2 md:h-[225px] h-[175px] relative bg-cover bg-center bg-no-repeat cursor-pointer"
                style={{
                  backgroundImage: image?.thumbUrl
                    ? `url(${buildImageUrl(image.thumbUrl)})`
                    : undefined,
                }}
                onClick={() => openGallery(image)}
              >
                {otherImages.length > MAX_IMAGES_TO_SHOW &&
                  index === MAX_IMAGES_TO_SHOW - 1 && (
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-[#00000055] bg-opacity-50 text-white"
                      onClick={() => openGallery(image)}
                    >
                      <span className="text-2xl">
                        +{otherImages.length - MAX_IMAGES_TO_SHOW}
                      </span>
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {galleryOpen && (
          <PreviewImageList
            image={images}
            closeGallery={closeGallery}
            selectedIndex={clickedImageIndex}
            setSelectedIndex={setClickedImageIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default TripGallery;
