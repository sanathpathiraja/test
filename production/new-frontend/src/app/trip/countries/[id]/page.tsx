import Container from "@/components/Container";
import Icon from "@/components/Icon";
import PageCoverImage from "@/components/PageCoverImage";
import PageHeader from "@/components/PageHeader";
import TripListPage from "@/components/TripListPage";
import { endpoints, environment, buildImageUrl } from "@/lib/consts";
import { extractIdFromSlug, getTextFromTags } from "@/lib/funcs";
import {
  DetailsPageType,
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
    const res = await fetch(endpoints.countries(realId));
    const details = await fetch(endpoints.countryDetails(realId));

    if (!res.ok) return {};

    const { data } = (await res.json()) as ResponseType<DetailsPageType>;

    let imageUrl = `${environment.BASE_URL}/opengraph.png`;

    if (details.ok) {
      const img = await details.json();
      if (img?.data?.imageUrl) {
        imageUrl = buildImageUrl(img.data.imageUrl);
      }
    }

    return {
      title: `${data.name} Country Trips`,
      description:
        getTextFromTags(data.description) ||
        `Explore amazing trips to ${data.name}.`,
      openGraph: {
        title: `${data.name} Country Trips | Escape Roots`,
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

/* -------------------- PAGE -------------------- */

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
    const [countryRes, listRes, detailsRes] = await Promise.all([
      fetch(endpoints.countries(realId), { next: { revalidate: 300 } }),
      fetch(
        `${endpoints.trips.countriesById(realId)}?page=1&pageSize=${PAGE_SIZE}`,
        { next: { revalidate: 300 } },
      ),
      fetch(endpoints.countryDetails(realId), {
        next: { revalidate: 300 },
      }),
    ]);

    if (!countryRes.ok || !listRes.ok || !detailsRes.ok) {
      notFound();
    }

    const { data } = (await countryRes.json()) as ResponseType<DetailsPageType>;
    const listData = (await listRes.json()) as ResponseType<
      TripListType<TripRecordType>
    >;
    const detailsData = await detailsRes.json();

    return (
      <main
        className={`w-full ${detailsData.data.imageUrl ? "pt-0" : "pt-[8vh]"}`}
      >
        {detailsData.data.imageUrl && (
          <PageCoverImage
            imgData={{
              imageUrl: buildImageUrl(detailsData.data.imageUrl),
            }}
          />
        )}

        {detailsData.data.imageUrl && (
          <PageHeader
            details={data}
            description={
              detailsData.data.tagLine
                ? `<div class='w-full flex justify-center'><p class='sm:max-w-[80%]'>${detailsData.data.tagLine}</p></div>`
                : undefined
            }
            tags={data.tags}
          />
        )}

        <Container containerClassName="sm:px-4 px-2 bg-white">
          {!detailsData.data.imageUrl && (
            <div className="w-full flex flex-col items-center justify-center py-8 pt-16 border-b border-gray-200">
              <h1 className="text-5xl font-bold font-dm-serif-display">
                {data.name}
              </h1>
              <ul className="flex gap-2 mt-4">
                {data.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="text-lg text-primary bg-primary-30 border border-primary px-4 py-0.5 rounded-xl"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <h2 className="sm:text-2xl text-xl font-thin mt-8 w-full">
                Explore Our {data.name} Trips
              </h2>
            </div>
          )}

          <TripListPage
            list={listData.data}
            goUp={Boolean(detailsData.data.imageUrl)}
          />
        </Container>
      </main>
    );
  } catch {
    notFound();
  }
}
