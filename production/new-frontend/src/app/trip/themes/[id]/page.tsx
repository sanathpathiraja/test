import Container from "@/components/Container";
import Icon from "@/components/Icon";
import PageCoverImage from "@/components/PageCoverImage";
import WaysToTravelList from "@/components/WaysToTravelList";
import { endpoints, environment, buildImageUrl } from "@/lib/consts";
import { extractIdFromSlug, getTextFromTags } from "@/lib/funcs";
import {
  DetailsPageType,
  ImageType,
  ResponseType,
  TripListType,
  TripRecordType,
} from "@/lib/types";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;
const PAGE_SIZE = 100;

/* -------------------- METADATA -------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const realId = extractIdFromSlug(id);

  if (!realId) return {};

  try {
    const [res, imgRes] = await Promise.all([
      fetch(endpoints.themes(realId), {
        next: { revalidate: 300 },
      }),
      fetch(`${endpoints.themes(realId)}/images`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!res.ok) return {};

    const { data } = (await res.json()) as ResponseType<DetailsPageType>;

    let imageUrl = `${environment.BASE_URL}/opengraph.png`;

    if (imgRes.ok) {
      const imgData = ((await imgRes.json()) as ResponseType<ImageType[]>)
        .data?.[0];

      if (imgData?.imageUrl) {
        imageUrl = buildImageUrl(imgData.imageUrl);
      }
    }

    return {
      title: `${data.name} Theme Trips`,
      description:
        getTextFromTags(data.description) ||
        `Explore amazing trips to ${data.name}.`,
      openGraph: {
        title: `${data.name} Theme Trips | Escape Roots`,
        description:
          getTextFromTags(data.description) ||
          `Explore amazing trips to ${data.name}.`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch {
    return {};
  }
}

/* -------------------- PAGE -------------------- */

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const realId = extractIdFromSlug(id);

  // 🔴 critical safety check
  if (!realId) {
    notFound();
  }

  try {
    const [res, imgRes, listRes] = await Promise.all([
      fetch(endpoints.themes(realId), {
        next: { revalidate: 300 },
      }),
      fetch(`${endpoints.themes(realId)}/images`, {
        next: { revalidate: 300 },
      }),
      fetch(
        `${endpoints.trips.themesById(realId)}?page=1&pageSize=${PAGE_SIZE}`,
        {
          next: { revalidate: 300 },
        },
      ),
    ]);

    if (!res.ok || !listRes.ok) {
      notFound();
    }

    const { data } = (await res.json()) as ResponseType<DetailsPageType>;
    const listData = (await listRes.json()) as ResponseType<
      TripListType<TripRecordType>
    >;

    let imgData: ImageType | null = null;

    if (imgRes.ok) {
      imgData =
        ((await imgRes.json()) as ResponseType<ImageType[]>).data?.[0] ?? null;
    }

    return (
      <main className={`w-full ${imgData?.imageUrl ? "pt-0" : "pt-[8vh]"}`}>
        {imgData?.imageUrl && (
          <PageCoverImage
            imgData={{
              ...imgData,
              imageUrl: buildImageUrl(imgData.imageUrl),
            }}
          />
        )}

        <WaysToTravelList
          details={data}
          list={listData.data}
          img={imgData?.imageUrl ? buildImageUrl(imgData.imageUrl) : ""}
          goUp={Boolean(imgData?.imageUrl)}
        />
      </main>
    );
  } catch {
    notFound();
  }
}
