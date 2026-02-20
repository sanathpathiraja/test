"use client";
import React, { useEffect } from "react";

import { endpoints, buildImageUrl } from "@/lib/consts";
import { ResponseType, TripListType, TripRecordType } from "@/lib/types";
import { createSlug, generateFilterUrl, tripFilters } from "@/lib/funcs";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Loading from "../Loading";
import Link from "next/link";
import Icon from "../Icon";
import { cn } from "@/lib/utils";

const decimalFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type PaginationProps = {
  collectionSize: number;
  pageSize: number;
  page: number;
  setPageNo: (pageNo: number) => void;
};

function Pagination({
  collectionSize,
  page,
  pageSize,
  setPageNo,
}: PaginationProps) {
  const queryParams = useSearchParams();
  const pageCount = Math.ceil(collectionSize / pageSize);

  if (pageCount <= 1) return null;

  function renderPages() {
    const pages = [];

    const minPage = Math.max(2, page - 2);
    const maxPage = Math.min(pageCount - 1, page + 2);

    pages.push(
      <PageButton
        key={1}
        pageNo={1}
        current={page}
        queryParams={queryParams}
        setPageNo={setPageNo}
      />,
    );

    if (minPage > 2) {
      pages.push(<Dots key="start-dots" />);
    }

    for (let i = minPage; i <= maxPage; i++) {
      pages.push(
        <PageButton
          key={i}
          pageNo={i}
          current={page}
          queryParams={queryParams}
          setPageNo={setPageNo}
        />,
      );
    }

    if (maxPage < pageCount - 1) {
      pages.push(<Dots key="end-dots" />);
    }

    pages.push(
      <PageButton
        key={pageCount}
        pageNo={pageCount}
        current={page}
        queryParams={queryParams}
        setPageNo={setPageNo}
      />,
    );

    return pages;
  }

  return (
    <div className="w-full flex gap-2 justify-center mt-8">{renderPages()}</div>
  );
}

function PageButton({
  pageNo,
  current,
  queryParams,
  setPageNo,
}: {
  pageNo: number;
  current: number;
  queryParams: ReadonlyURLSearchParams;
  setPageNo: (page: number) => void;
}) {
  return (
    <Link
      href={`trips?${generateFilterUrl({
        ...tripFilters(queryParams),
        page: pageNo,
      })}`}
      onClick={(e) => {
        if (pageNo !== current) {
          setPageNo(pageNo);
        }
      }}
      className={`w-8 h-8 flex items-center justify-center rounded my-1 text-sm ${
        pageNo === Number(queryParams.get("page"))
          ? "bg-primary text-white"
          : "text-primary hover:border border-primary !hover:text-white"
      }`}
    >
      {pageNo}
    </Link>
  );
}

function Dots() {
  return (
    <span className="w-8 h-8 flex items-center justify-center text-muted-foreground">
      ...
    </span>
  );
}

type TripsCardProps = {
  trip: TripRecordType;
  activeMode: "grid" | "list";
  className?: string;
};

export function TripsCard({ activeMode, trip, className }: TripsCardProps) {
  if (activeMode === "grid") {
    const imageUrl = buildImageUrl(trip.displayImage?.imageUrl);
    return (
      <div className={cn("md:px-2 px-0 py-2 w-full md:w-1/2", className)}>
        <div
          className={`text-white relative rounded-md overflow-hidden w-full bg-cover bg-center bg-no-repeat h-80`}
          style={{
            //backgroundImage: trip.displayImage?.imageUrl ? `url(${trip.displayImage.imageUrl})` : undefined,
            backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          }}
        >
          <Link
            href={`/trips/${createSlug(trip.name, trip.id)}`}
            className={`h-full flex flex-col justify-between p-4 transition-all duration-300 ${
              imageUrl
                ? "bg-[#00000050] hover:bg-[#00000010]"
                : "bg-[#0000008e] hover:bg-[#0000003b]"
            }`}
          >
            <div>
              <p className="text-base flex items-center ">
                <Icon.Location className="mr-2" /> {trip.country}
              </p>
              <h4 className="text-2xl font-medium">{trip.name}</h4>
              <p className="text-sm flex items-center">
                <Icon.Style className="mr-2 text-xl" />
                <span>{trip.style}</span>
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2 text-base">
                <Icon.Calendar className="text-2xl" />
                <span>
                  {trip.duration} Days {trip.noOfNights} Nights
                </span>
              </div>
              <div className="bg-[var(--primary-color)] absolute right-0 bottom-0 px-4 py-2 text-white rounded-tl-2xl">
                <small className="text-xs">From</small>
                <p className="sm:text-2xl text-xl font-bold">
                  A$ {decimalFormatter.format(trip.price)}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="md:px-2 px-0 py-2 w-full">
      <div className="shadow-md bg-gray-50 relative rounded-md overflow-hidden w-full min-h-48 bg-cover bg-center bg-no-repeat grid grid-cols-[320px_1fr]">
        {/* Image side */}
        <div className="w-80 h-full flex items-center justify-center overflow-hidden">
          {trip.displayImage?.imageUrl ? (
            <img
              src={buildImageUrl(trip.displayImage?.imageUrl) ?? undefined}
              alt={trip.name}
              className="w-full h-full object-center object-cover"
              loading="lazy"
            />
          ) : null}
        </div>

        {/* Content side */}
        <Link href={`/trips/${createSlug(trip.name, trip.id)}`}>
          <div className="flex h-full justify-between items-center w-full p-4 pr-0">
            <div className="w-[calc(100%-9rem)] h-full flex flex-col justify-between pr-2">
              <div>
                <p className="text-base flex items-center text-primary">
                  <Icon.Location className="mr-2" /> {trip.country}
                </p>
                <h4 className="text-2xl font-medium">{trip.name}</h4>
              </div>

              <div className="w-full flex gap-2 mt-4">
                <p className="text-xs flex items-center bg-forth-30 w-fit p-2 rounded-md text-primary">
                  <Icon.Style className="mr-2 text-lg" />
                  <span>{trip.style}</span>
                </p>
                <p className="text-xs flex items-center bg-forth-30 w-fit p-2 rounded-md text-primary">
                  <Icon.Calendar className="mr-2 text-lg" />
                  <span>
                    {trip.duration} Days {trip.noOfNights} Nights
                  </span>
                </p>
              </div>
            </div>
            <div className="h-full w-36 flex flex-col justify-center items-center border-l border-gray-300">
              <div>
                <small className="text-xs z-10">From</small>
                <p className="sm:text-2xl text-xl font-bold text-primary w-fit z-10">
                  A$ {decimalFormatter.format(trip.price)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

type TripsListProps = {
  toggleFilters: () => void;
  showFilters: boolean;
  // filter states
  pageFilter: string;
  setPageFilter: (value: string) => void;
  sortByFilter: string;
  setSortByFilter: (value: string) => void;
  searchTextFilter: string;
  setSearchTextFilter: (value: string) => void;
};

function TripsList({
  toggleFilters,
  showFilters,
  pageFilter,
  searchTextFilter,
  setPageFilter,
  setSearchTextFilter,
  setSortByFilter,
  sortByFilter,
}: TripsListProps) {
  const [activeMode, setActiveMode] = React.useState<"grid" | "list">("grid");
  const [tripList, setTripList] =
    React.useState<TripListType<TripRecordType> | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const pathname = usePathname();
  const queryParams = useSearchParams();
  const navigation = useRouter();

  const sortList = [
    { label: "Most Recent", value: "newest" },
    { label: "Price: Low to High", value: "priceLowest" },
    { label: "Price: High to Low", value: "priceHighest" },
    { label: "Duration: Low to High", value: "shortest" },
    { label: "Duration: High to Low", value: "longest" },
    { label: "Popularity", value: "popularity" },
  ];

  const defaultSortBy = sortList.find(
    (srt) => srt.value === queryParams.get("sortBy"),
  ) || {
    label: "Newest",
    value: "newest",
  };
  const defaultPageNo = Number(queryParams.get("page") || 1);

  const [sortBy, setSortBy] = React.useState<{ label: string; value: string }>(
    defaultSortBy,
  );
  const [page, setPage] = React.useState<number>(defaultPageNo);
  const [searchQuery, setSearchText] = React.useState<string>("");

  async function getTripList(queryParams: ReadonlyURLSearchParams) {
    setLoading(true);
    const filters = tripFilters(queryParams);
    try {
      const response = await fetch(endpoints.trips.trips, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = (await response.json()) as ResponseType<
        TripListType<TripRecordType>
      >;

      if (data.isSuccess) {
        setTripList(data.data);
      } else {
        setError(
          data.problemDetails ||
            "Some thing went wrong. Please try again later.",
        );
      }
    } catch (error) {
      console.error("Error fetching trip list:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getTripList(queryParams);
  }, [queryParams]);

  useEffect(() => {
    // only screen size > 768px should show list view
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setActiveMode("grid");
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 768) {
          setActiveMode("grid");
        }
      });
    };
  }, []);

  return (
    <div
      className={`w-full lg:w-[calc(100%-20rem)] lg:px-8 sm:px-4 px-2 lg:block ${
        showFilters ? "hidden" : "block"
      }`}
    >
      <div className="w-full">
        <div className="w-full pb-8 border-b flex gap-2">
          <div className="relative lg:max-w-md w-[calc(100%-3.5rem)]">
            <Icon.Search className="absolute top-1/2 left-4 -translate-y-1/2 text-xl" />
            <input
              type="text"
              className="py-2 text-lg border-2 rounded-lg border-primary pl-12 w-full"
              placeholder="Search Location..."
              value={searchQuery}
              onChange={(e) => {
                setSearchText(e.target.value.trim());
                setSearchTextFilter(e.target.value.trim());
                setPage(1);
                setPageFilter("1");
              }}
            />
          </div>
          <button
            onClick={toggleFilters}
            className="lg:hidden flex w-12 !h-12 rounded-lg bg-secondary text-white text-2xl hover:opacity-80 opacity-100 justify-center items-center"
          >
            <Icon.Filter />
          </button>
        </div>
      </div>
      <div className="w-full pt-8">
        <div className="w-full justify-between items-center md:hidden flex">
          <div className="flex items-center gap-4 flex-wrap w-full">
            <div className="w-full flex justify-between items-center flex-wrap">
              <h3 className="sm:text-lg text-base font-medium text-gray-400">
                {tripList ? tripList.pagingSettings.collectionSize : 0} Result
                Found
              </h3>
              <label
                htmlFor="sort-by"
                className="flex items-center gap-2 sm:w-fit justify-between"
              >
                <span className="text-primary">Sort BY</span>
                <select
                  className="sm:w-[200px] w-[140px] border border-primary rounded-md p-2 sm:text-base text-sm"
                  id="sort-by"
                  onChange={(e) => {
                    setSortBy(
                      sortList.find((srt) => srt.value === e.target.value) || {
                        label: "Newest",
                        value: "newest",
                      },
                    );
                    setSortByFilter(e.target.value);
                    setPage(1);
                    setPageFilter("1");
                  }}
                  value={sortBy.value}
                >
                  {sortList.map((sortOption) => (
                    <option key={sortOption.value} value={sortOption.value}>
                      {sortOption.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="w-full justify-between items-center md:flex hidden">
          <h3 className="text-lg text-gray-400 font-medium">
            {tripList ? tripList.pagingSettings.collectionSize : 0} Result Found
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <label htmlFor="sort-by" className="flex items-center gap-2 w-fit">
              <span className="text-primary">Sort BY</span>
              <select
                className="w-[200px] border border-primary rounded-md p-2"
                id="sort-by"
                onChange={(e) => {
                  setSortBy(
                    sortList.find((srt) => srt.value === e.target.value) || {
                      label: "Newest",
                      value: "newest",
                    },
                  );
                  setSortByFilter(e.target.value);
                  setPage(1);
                  setPageFilter("1");
                }}
                value={sortBy.value}
              >
                {sortList.map((sortOption) => (
                  <option key={sortOption.value} value={sortOption.value}>
                    {sortOption.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              className={`text-2xl p-1 border-2 border-[var(--color-primary)] 
                            text-[var(--color-primary)] hover:text-white hover:bg-primary rounded-md
                            ${activeMode === "grid" ? "bg-primary text-white" : ""}
                        `}
              onClick={() => setActiveMode("grid")}
            >
              <Icon.Grid />
            </button>
            <button
              className={`text-2xl p-1 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:text-white hover:bg-primary rounded-md
                        ${activeMode === "list" ? "bg-primary text-white" : ""}
                        `}
              onClick={() => setActiveMode("list")}
            >
              <Icon.List />
            </button>
          </div>
        </div>
        {error && (
          <div className="text-red-500 mt-4 w-full text-center bg-[#ff040444]">
            {error}
          </div>
        )}
        <div className="w-full min-h-screen flex justify-center py-4">
          {loading ? (
            <div className="w-full h-[50vh] flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              {tripList && (
                <div className="w-full">
                  <div className={`w-full flex flex-wrap items-start`}>
                    {tripList && tripList.records.length > 0 ? (
                      tripList.records.map((trip) => (
                        <TripsCard
                          key={trip.id}
                          trip={trip}
                          activeMode={activeMode}
                        />
                      ))
                    ) : (
                      <div className="w-full text-center">No trips found.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <Pagination
          collectionSize={tripList ? tripList.pagingSettings.collectionSize : 0}
          page={page}
          pageSize={20}
          setPageNo={(val) => {
            setPage(val);
            setPageFilter(val.toString());
          }}
        />
      </div>
    </div>
  );
}

export default TripsList;
