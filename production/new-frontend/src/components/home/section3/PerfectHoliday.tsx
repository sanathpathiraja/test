import Section from "../Section";
import { endpoints, buildImageUrl } from "@/lib/consts";
import { ResponseType } from "@/lib/types";
import { CarouselCardType } from "@/components/Carousel";

export const revalidate = 300; // cache 5 minutes

async function getUpcomingTrips(): Promise<CarouselCardType[]> {
  try {
    const response = await fetch(endpoints.trips.upcoming, {
      next: { revalidate: 300 },
	  cache: "no-store", // prevents build-time failures
    });

    if (!response.ok) {
      console.error("Failed to fetch upcoming trips");
      return [];
    }

    const result = (await response.json()) as ResponseType<CarouselCardType[]>;

    return result.data
      .filter(
        (
          item
        ): item is CarouselCardType & {
          displayImage: NonNullable<CarouselCardType["displayImage"]>;
        } => item.displayImage !== null
      )
      .map((item) => ({
        ...item,
        displayImage: {
          ...item.displayImage,
          imageUrl: buildImageUrl(item.displayImage.imageUrl),
          thumbUrl: buildImageUrl(item.displayImage.thumbUrl),
        },
      }));
  } catch (error) {
    console.error("Upcoming trips fetch error:", error);
    return [];
  }
}

export default async function PerfectHoliday() {
  const data = await getUpcomingTrips();

  if (!data || data.length === 0) return null;

  return (
    <Section
      list={data}
      title="Perfect Holiday"
      subtitle="Choose Your"
      description={
        <span>
          Roam the world with ripper trips made just for you, from jaw-dropping bushland to full-on cultural vibes.
        </span>
      }
      className="mt-8"
    />
  );
}
