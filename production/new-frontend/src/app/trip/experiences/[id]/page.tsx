import Container from "@/components/Container";
import Icon from "@/components/Icon";
import PageCoverImage from "@/components/PageCoverImage";
import PageHeader from "@/components/PageHeader";
import TripListPage from "@/components/TripListPage";
import { buildImageUrl, endpoints, environment } from "@/lib/consts";
import {
  extractIdFromSlug,
  getTextFromTags,
  normalizeRichTextHtml,
} from "@/lib/funcs";
import {
  DetailsPageType,
  ImageType,
  ResponseType,
  TripListType,
  TripRecordType,
} from "@/lib/types";
import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export const revalidate = 300;

const PAGE_SIZE = 100;

/* ---------------- METADATA ---------------- */

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
      fetch(endpoints.experiences(realId), {
        next: { revalidate: 300 },
      }),
      fetch(`${endpoints.experiences(realId)}/images`, {
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
      title: `${data.name} Experience Trips`,
      description:
        getTextFromTags(data.description) ||
        `Explore amazing trips to ${data.name}.`,
      openGraph: {
        title: `${data.name} Experience Trips | Escape Roots`,
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

  if (!realId) {
    notFound();
  }

  try {
    const [res, imgRes, listRes] = await Promise.all([
      fetch(endpoints.experiences(realId), {
        next: { revalidate: 300 },
      }),
      fetch(`${endpoints.experiences(realId)}/images`, {
        next: { revalidate: 300 },
      }),
      fetch(
        `${endpoints.trips.experienceById(realId)}?page=1&pageSize=${PAGE_SIZE}`,
        { next: { revalidate: 300 } },
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
      <main
        className={cn(
          "w-full min-h-screen",
          imgData?.imageUrl ? "" : "pt-[8vh]",
        )}
      >
        {imgData && <PageCoverImage imgData={imgData} />}

        {imgData?.imageUrl && (
          <PageHeader details={data} description={data.description} />
        )}

        <Container containerClassName="sm:px-4 px-2 bg-white">
          {!imgData && (
            <div className="w-full pt-16 border-b pb-6 border-gray-200">
              <h1 className="text-5xl font-bold font-dm-serif-display mb-4 text-center">
                {data.name}
              </h1>
              <div
                className="mt-4 text-base text-gray-500 leading-8 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{
                  __html: normalizeRichTextHtml(data.description),
                }}
              />
            </div>
          )}

          {listData.data.records.length === 0 ? (
            <div className="w-full text-center mt-8 h-[50vh] flex items-center justify-center">
              <p className="text-lg text-gray-500">
                No trips found for this experience.
              </p>
            </div>
          ) : (
            <TripListPage list={listData.data} goUp={Boolean(imgData)} />
          )}
        </Container>
      </main>
    );
  } catch {
    notFound();
  }
}
