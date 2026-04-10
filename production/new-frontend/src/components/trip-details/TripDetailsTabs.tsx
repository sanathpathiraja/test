"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ResponseType, TripPlanType, TripType } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import TripPlans from "./TripPlans";
import { endpoints } from "@/lib/consts";
import { normalizeRichTextHtml } from "@/lib/funcs";
import Icon from "../Icon";
import PhysicalRating from "./PhysicalRating";

type OverviewRowProps = {
  title: string;
  value: string | number | React.ReactNode;
};

function OverviewRow({ title, value }: OverviewRowProps) {
  return (
    <div className="flex items-start mb-4 w-full">
      <span className="text-gray-800 font-black text-lg min-w-30 w-3/10">
        {title}
      </span>
      <span className="font-light text-lg grow w-7/10 pl-2">{value}</span>
    </div>
  );
}

type TripDetailsTabsProps = {
  details: TripType;
};

function TripDetailsTabs({ details }: TripDetailsTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "tour-plan">(
    "tour-plan",
  );
  const [plans, setPlans] = React.useState<TripPlanType[]>([]);

  async function getTripPlans() {
    try {
      const response = await fetch(endpoints.trips.itineraries(details.id));
      if (!response.ok) {
        throw new Error("Failed to fetch trip plans");
      }
      const data = (await response.json()) as ResponseType<TripPlanType[]>;
      setPlans(data.data);
    } catch (error) {
      console.error("Error fetching trip plans:", error);
    }
  }

  function showOverview() {
    setActiveTab("overview");
  }

  function showTourPlan() {
    setActiveTab("tour-plan");
  }

  const tabAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  };

  const overviews: OverviewRowProps[] = [
    {
      title: "Country",
      value: details.country,
    },
    {
      title: "Destination1",
      value: details.startDestination.name,
    },
    {
      title: "Theme",
      value: details.tripThemes?.map((theme) => theme.name).join(", ") || "N/A",
    },
    {
      title: "Style",
      value: details.style || "N/A",
    },
    {
      title: "Experience",
      value:
        details.tripExperiences?.map((exp) => exp.name).join(", ") || "N/A",
    },
    {
      title: "Trip Code",
      value: details.tripCode || "N/A",
    },
    {
      title: "Duration",
      value: `${details.duration} Days (${details.noOfNights} Nights)`,
    },
    {
      title: "Group Size",
      value: `${details.groupMin} - ${details.groupMax} PAX`,
    },
    {
      title: "Ages",
      value: !details.ageMin
        ? "Suitable for any age"
        : `${details.ageMin} - ${details.ageMax} Years`,
    },
    {
      title: "Price",
      value: (
        <span className="flex flex-col">
          <span>A${details.accomadationPriceAdult} / Per Adult</span>
          <span className="">
            A${details.accomadationPriceChild} / Per Child
          </span>
        </span>
      ),
    },
  ];

  useEffect(() => {
    getTripPlans();
  }, []);

  return (
    <div className="lg:w-3/5 w-full sm:px-4 px-0">
      <div className="w-full grid sm:grid-cols-3 grid-cols-2 gap-2">
        <Button
          className="w-full text-lg"
          variant={activeTab === "overview" ? `default` : "outline"}
          size={`lg`}
          onClick={showOverview}
        >
          Overview
        </Button>
        <Button
          className="w-full text-lg"
          variant={activeTab === "tour-plan" ? "default" : `outline`}
          size={`lg`}
          onClick={showTourPlan}
        >
          Tour Plan
        </Button>
      </div>
      <div className="w-full mt-4">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              className="sm:px-0 px-2"
              {...tabAnimation}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: normalizeRichTextHtml(details.description),
                }}
                className="text-lg leading-8 text-gray-800 break-words [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold"
              />
              <div className="mt-8 w-full">
                {overviews.map((overview, index) => (
                  <OverviewRow
                    key={index}
                    title={overview.title}
                    value={overview.value}
                  />
                ))}
              </div>
              <div className="mt-8 lg:hidden block">
                <h4 className="text-2xl flex items-center gap-4 font-normal">
                  <img
                    src={"/strength.png"}
                    alt="Physycal Strength Icon"
                    className="h-7 w-7 mb-2"
                  />
                  <span>Physical Rating</span>
                  <Icon.CheckCircle className="text-primary" />
                </h4>
                <PhysicalRating
                  rating={details.physicalRating || 0}
                  className="mt-4"
                />
              </div>
            </motion.div>
          )}
          {activeTab === "tour-plan" && (
            <motion.div key="tour-plan" {...tabAnimation}>
              <TripPlans plans={plans} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TripDetailsTabs;
