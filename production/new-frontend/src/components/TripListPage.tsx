"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TripListType, TripRecordType } from "@/lib/types";
import { TripsCard } from "./trips/TripsList";

export type TrupListPageProps = {
  list: TripListType<TripRecordType>;
  goUp: boolean;
};

function TripListPage({ list, goUp }: TrupListPageProps) {
  const PAGE_SIZE = 10;
  const [pointer, setPointer] = React.useState(PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    setPointer((prev) => {
      const next = prev + PAGE_SIZE;
      return next > list.records.length ? list.records.length : next;
    });
  }, [list.records.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMore]);

  return (
    <div className={`py-8 px-2 sm:px-0 ${goUp ? "-translate-y-40" : ""}`}>
      <div className="w-full min-h-[40vh]">
        <ul className="w-full flex flex-wrap items-start min-h-[60vh] z-20">
          {list.records.slice(0, pointer).map((trip) => (
            <TripsCard
              key={trip.id}
              activeMode="grid"
              trip={trip}
              className="w-full lg:w-1/3 md:w-1/2"
            />
          ))}
        </ul>
        {pointer < list.records.length && (
          <div ref={loaderRef} className="h-10 w-full" />
        )}
      </div>
    </div>
  );
}

export default TripListPage;
