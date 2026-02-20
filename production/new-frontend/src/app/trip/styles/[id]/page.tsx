import Container from "@/components/Container";
import Icon from "@/components/Icon";
import PageCoverImage from "@/components/PageCoverImage";
import WaysToTravelList from "@/components/WaysToTravelList";
import { buildImageUrl, endpoints, environment } from "@/lib/consts";
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

export const revalidate = 300; // 5 minutes

const PAGE_SIZE = 100;

/* ---------------- METADATA ---------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const [res, imgRes] = await Promise.all([
      fetch(endpoints.styles(id), { next: { revalidate: 300 } }),
      fetch(`${endpoints.styles(id)}/images`, {
        next: { revalidate: 300 },
		cache: "no-store", // prevents build-time failures
      }),
    ]);

    if (!res.ok) return {};

    const { data } = (await res.json()) as ResponseType<DetailsPageType>;

    let imageUrl = `${environment.BASE_URL}/opengraph.png`;

    if (imgRes.ok) {
      const imgData =
        ((await imgRes.json()) as ResponseType<ImageType[]>).data?.[0];
      if (imgData?.imageUrl) {
        imageUrl = buildImageUrl(imgData.imageUrl);
      }
    }

    return {
      title: `${data.name} Style Trips`,
      description:
        getTextFromTags(data.description) ||
        `Explore amazing trips to ${data.name}.`,
      openGraph: {
        title: `${data.name} Style Trips | Escape Roots`,
        description:
          getTextFromTags(data.description) ||
          `Explore amazing trips to ${data.name}.`,
        images: [{ url: imageUrl, width: 1200, height: 630 }],
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const realId = extractIdFromSlug(id);


  try {
    const [res, imgRes, listRes] = await Promise.all([
      fetch(endpoints.styles(id), { next: { revalidate: 300 } }),
      fetch(`${endpoints.styles(id)}/images`, {
        next: { revalidate: 300 },
		cache: "no-store", // prevents build-time failures
      }),
      fetch(
        `${endpoints.trips.stylesById(id)}?page=1&pageSize=${PAGE_SIZE}`,
        { next: { revalidate: 300 } },
      ),
    ]);

    if (!res.ok || !listRes.ok) throw new Error();

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
      <main className="w-full">
        {imgData && <PageCoverImage imgData={imgData} />}

        <WaysToTravelList
          details={data}
          list={listData.data}
          img={imgData?.imageUrl ?? ""}
          goUp={Boolean(imgData)}
        />
      </main>
    );
  } catch {
    return (
      <main className="w-full pt-[8vh]">
        <Container>
          <div className="w-full flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="text-4xl font-bold">Trip not found</h1>
            <span className="sm:text-9xl text-8xl text-primary font-bold">
              404
            </span>
            <Link
              href="/trips"
              className="mt-8 text-lg text-primary hover:underline"
            >
              Let's See All Trips <Icon.ArrowRight className="inline ml-2" />
            </Link>
          </div>
        </Container>
      </main>
    );
  }
}
