import { CarouselCardType } from "@/components/Carousel";
import { endpoints, buildImageUrl } from "@/lib/consts";
import { ResponseType } from "@/lib/types";
import Section from "../Section";

export const revalidate = 300; // cache for 5 minutes

async function getDeals(): Promise<CarouselCardType[]> {
  try {
    const response = await fetch(endpoints.trips.hotdeals, {
      next: { revalidate: 300 },
	  cache: "no-store", // prevents build-time failures
    });

    if (!response.ok) {
      console.error("Failed to fetch hot deals");
      return [];
    }

    const data = (await response.json()) as ResponseType<CarouselCardType[]>;

    return data.data
      .filter(
        (
          item
        ): item is CarouselCardType & {
          displayImage: NonNullable<CarouselCardType["displayImage"]>;
        } => item.displayImage !== null
      )
      .map((deal) => ({
        ...deal,
        displayImage: {
          ...deal.displayImage,
          imageUrl: buildImageUrl(deal.displayImage.imageUrl),
          thumbUrl: buildImageUrl(deal.displayImage.thumbUrl),
        },
      }));
  } catch (error) {
    console.error("Hot deals fetch error:", error);
    return [];
  }
}

export default async function TravelDeals() {
  const deals = await getDeals();

  if (!deals || deals.length === 0) return null;

  return (
    <Section
      list={deals}
      title="Travel Deals"
      subtitle="Escape For Less"
      carouselPriceColor="bg-[#ff5a60]"
      description={
        <span>
          Find your next escape at a price you’ll love and uncover amazing deals{" "}
          <b>on your next journey.</b>
        </span>
      }
    />
  );
}
