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

  // safety check
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
      <main className="w-full min-h-[80vh] pt-[8vh]">
        <Container containerClassName="sm:px-4 px-2">
          <div className="w-full md:py-12 py-8">
            {/* Header */}
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
              </div>

              <div className="w-full flex mt-4">
                <span className="sm:text-2xl text-lg font-light text-primary">
                  <Icon.Calendar className="inline mr-2" />
                  {tripDetails.duration} Days. {tripDetails.noOfNights} Nights
                </span>
              </div>
            </div>

            <TripGallery images={tripDetails.tripImages} />

            <div className="w-full flex lg:flex-row flex-col sm:mt-16 mt-8">
              <TripDetailsTabs details={tripDetails} />

              <div className="w-2/5 h-60 px-4 lg:block hidden">
                <div className="w-full p-8 bg-white rounded-lg shadow-lg">
                  <h4 className="text-2xl font-semibold pb-4">
                    Plan Your Journey
                  </h4>

                  <Link href={`/book-now/${tripDetails.id}`}>
                    <Button
                      variant="secondary"
                      className="w-full font-bold text-lg h-12"
                    >
                      Book Now
                    </Button>
                  </Link>

                  <div className="mt-8">
                    <h4 className="text-2xl flex items-center gap-4">
                      <Image
                        src={strengthImg}
                        alt="Physical Strength Icon"
                        className="h-7 w-7 mb-2"
                      />
                      Physical Rating
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
          </div>
        </Container>
      </main>
    );
  } catch {
    notFound();
  }
}
