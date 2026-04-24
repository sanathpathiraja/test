import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { buildImageUrl, endpoints, environment } from "@/lib/consts";
import { ResponseType, TripType } from "@/lib/types";
import { extractIdFromSlug } from "@/lib/funcs";
import TripGallery from "@/components/trip-details/TripGallery";
import TripDetailsTabs from "@/components/trip-details/TripDetailsTabs";
import { Button } from "@/components/ui/button";
import strengthImg from "@/assets/img/strength.png";
import PhysicalRating from "@/components/trip-details/PhysicalRating";
import Icon from "@/components/Icon";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

/* ---------------- METADATA ---------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tripid: string }>;
}): Promise<Metadata> {
  const { tripid } = await params;
  const realId = extractIdFromSlug(tripid);

  if (!realId) return {};

  try {
    const res = await fetch(endpoints.trips.byId(realId), {
      next: { revalidate: 60 },
    });

    if (!res.ok) return {};

    const { data } = (await res.json()) as ResponseType<TripType>;

    const img =
      data.tripImages.find((img) => img.displayImage)?.imageUrl ??
      `${environment.BASE_URL}/opengraph.png`;

    return {
      title: data.name,
      description: data.tagline,
      openGraph: {
        title: `${data.name} | Escape Roots`,
        description: data.tagline,
        images: [{ url: buildImageUrl(img), width: 1200, height: 630 }],
        type: "website",
        url: `${environment.BASE_URL}/trips/${tripid}`,
      },
    };
  } catch {
    return {};
  }
}

/* ---------------- PAGE ---------------- */

export default async function Page({
  params,
}: {
  params: Promise<{ tripid: string }>;
}) {
  const { tripid } = await params;
  const realId = extractIdFromSlug(tripid);

  if (!realId) {
    notFound();
  }

  try {
    const res = await fetch(endpoints.trips.byId(realId), {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      notFound();
    }

    const { data: tripDetails } = (await res.json()) as ResponseType<TripType>;

    return (
      <main className={`w-full min-h-[80vh] pt-[8vh]`}>
        <Container containerClassName="sm:px-4 px-2">
          <div className="w-full md:py-12 py-8">
            {/* heading */}
            <div className="w-full">
              <div className="flex justify-between lg:items-end items-start lg:flex-row flex-col gap-4 sm:pb-8 pb-4 border-b border-gray-200">
                <div className="grow">
                  <h1 className="text-4xl font-semibold font-dm-serif-display">
                    {tripDetails.name}
                  </h1>
                  <h3 className="sm:text-2xl text-xl font-light mt-2">
                    {tripDetails.tagline}
                  </h3>
                </div>
                <div className="flex flex-col min-w-[280px] lg:items-end">
                  <div className="flex flex-col">
                    <span className="font-light sm:text-xl text-sm w-full">
                      Starting From
                    </span>
                    <span>
                      <span className="sm:text-4xl text-3xl font-bold text-primary">
                        A${tripDetails.accomadationPriceAdult?.toLocaleString()}
                      </span>
                      <span className="sm:text-lg text-sm font-light">
                        {" "}
                        / per adult
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:hidden flex items-center fixed bottom-0 left-0 right-0 bg-gray-50 z-10 p-4 shadow-[2px_0_24px_6px_rgba(0,0,0,0.2)]">
                <div className="w-1/3 flex justify-center">
                  <a
                    href={`https://escaperoots.com.au/book-now/${tripDetails.id}`}
                    className="w-full min-w-[140px]"
                  >
                    <Button
                      variant={"secondary"}
                      className="w-full font-bold sm:text-lg text-base h-12"
                      size={"lg"}
                    >
                      Book Now
                    </Button>
                  </a>
                </div>
                <div className="w-2/3 flex justify-end items-center px-4">
                  <div className="flex flex-col">
                    <span className="font-light sm:text-xl text-sm w-full">
                      Starting From
                    </span>
                    <span>
                      <span className="sm:text-4xl text-2xl font-bold text-primary">
                        A${tripDetails.accomadationPriceAdult.toLocaleString()}
                      </span>
                      <span className="sm:text-lg text-sm font-light">
                        {" "}
                        / per adult
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full flex mt-4">
                <span className="sm:text-2xl text-lg font-light text-primary">
                  <Icon.Calendar className="inline mr-2" />
                  {tripDetails.duration} Days. {tripDetails.noOfNights} Nights
                </span>
                <span className="sm:text-2xl text-lg font-light text-primary ml-4">
                  <Icon.Style className="inline ml-4 mr-2" />
                  {tripDetails.style}
                </span>
              </div>
            </div>
            {/* trip gallery */}
            <TripGallery images={tripDetails.tripImages} />
            {/* trip details */}
            <div className="w-full flex lg:flex-row flex-col sm:mt-16 mt-8">
              <TripDetailsTabs details={tripDetails} />
              <div className="w-2/5 h-60 px-4 lg:block hidden">
                <div className="w-full p-8 bg-white rounded-lg shadow-lg">
                  <h4 className="text-2xl font-semibold pb-4">
                    Plan Your Journey
                  </h4>
                  <div className="w-full my-4">
                    <Link
                      href={`/book-now/${tripDetails.id}`}
                      className="w-full"
                    >
                      <Button
                        variant={"secondary"}
                        className="w-full font-bold text-lg h-12"
                        size={"lg"}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-8">
                    <h4 className="text-2xl flex items-center gap-4 font-normal">
                      <Image
                        src={strengthImg}
                        alt="Physycal Strength Icon"
                        className="h-7 w-7 mb-2"
                      />
                      <span>Physical Rating</span>
                      <Icon.CheckCircle className="text-primary" />
                    </h4>
                    <PhysicalRating
                      rating={tripDetails.physicalRating || 0}
                      className="mt-4"
                    />
                  </div>
                </div>
              </div>
            </div>
            {tripDetails.tripExclusions.length > 0 ||
            tripDetails.tripInclusions.length > 0 ? (
              <div className="w-full sm:mt-16 mt-8 border-t border-gray-200 sm:pt-16 pt-8 pb-8 px-2 grid md:grid-cols-2 grid-cols-1 sm:gap-8 gap-4">
                {tripDetails.tripInclusions.length > 0 ? (
                  <div className="w-full md:p-10 p-6 bg-gray-50/50 rounded-xl text-black shadow-lg">
                    <h4 className="sm:text-4xl text-3xl">
                      Inclusion
                    </h4>
                    <ul className="list-disc mt-4">
                      {tripDetails.tripInclusions.map((inclusion) => (
                        <li
                          key={inclusion.id}
                          className="flex items-start mb-4"
                        >
                          <span className="w-1/20 !mr-2 min-w-2 h-6 flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-black" />
                          </span>
                          <p className="sm:text-base text-sm w-9/10">
                            {inclusion.displayText}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {tripDetails.tripExclusions.length > 0 ? (
                  <div className="w-full md:p-10 p-6 bg-gray-50/50 rounded-xl text-black shadow-lg">
                    <h4 className="sm:text-4xl text-3xl">
                      Exclusion
                    </h4>
                    <ul className="list-disc mt-4">
                      {tripDetails.tripExclusions.map((exclution) => (
                        <li
                          key={exclution.id}
                          className="flex items-start mb-4"
                        >
                          <span className="w-1/20 !mr-2 min-w-2 h-6 flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-black" />
                          </span>
                          <p className="sm:text-base text-sm w-9/10">
                            {exclution.displayText}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </main>
    );
  } catch {
    notFound();
  }
}
