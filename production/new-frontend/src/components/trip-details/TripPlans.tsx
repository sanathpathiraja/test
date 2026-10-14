"use client";
import React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { endpoints } from "@/lib/consts";
import { ResponseType, TripPlanType } from "@/lib/types";

type TripPlanProps = {
  plan: TripPlanType;
  index: number;
  total: number;
  openedIndex: number | null;
  setOpenedIndex: (index: number | null) => void;
};

function TripPlan({
  plan,
  index,
  total,
  openedIndex,
  setOpenedIndex,
}: TripPlanProps) {
  function togglePlan(index: number) {
    if (openedIndex === index) {
      setOpenedIndex(null);
    } else {
      setOpenedIndex(index);
    }
  }

  return (
    <motion.li
      layoutCrossfade
      className={`w-full border-gray-200 py-2 ${index !== total - 1 ? "border-b" : ""}`}
    >
      <button
        className="w-full text-left py-2 sm:px-4 px-2 flex items-center justify-between hover:bg-primary-30 rounded-sm transition-colors duration-300"
        onClick={() => togglePlan(index)}
      >
        <span className="text-lg font-semibold text-gray-800 flex gap-4 items-center">
          <span className="!w-8 !h-8 bg-secondary rounded-full text-white flex items-center justify-center text-sm">
            {plan.day}
          </span>
          <span className="w-[calc(100%-3rem)]">
            Day {plan.day} - {plan.title}
          </span>
        </span>
        <div
          className={`flex items-center justify-center relative transition-transform duration-500 ease-in-out ${
            openedIndex === index ? "rotate-[360deg]" : "rotate-0"
          }`}
        >
          <span
            className={`w-4 h-[2px] bg-gray-500 transition-transform duration-500 ease-in-out ${
              openedIndex === index ? "rotate-[180deg]" : "rotate-0"
            }`}
          />
          <span
            className={`w-[2px] h-4 bg-gray-500 translate-x-[-9px] transition-transform duration-500 ease-in-out ${
              openedIndex === index ? "rotate-[270deg]" : "rotate-0"
            }`}
          />
        </div>
      </button>
      <AnimatePresence initial={false} mode="wait">
        {openedIndex === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 bg-gray-50/60 rounded-lg overflow-hidden"
          >
            <div className="py-4">
              <div dangerouslySetInnerHTML={{ __html: plan.description }} />
              <div className="w-full flex flex-wrap justify-between">
                {plan.accomadationDetails.length > 0 && (
                  <div className="w-[calc(50%-4px)] mt-8">
                    <h4 className="w-full font-semibold p-2 bg-secondary-20">
                      Accomadation
                    </h4>
                    <ul>
                      {plan.accomadationDetails.map((accom, index) => (
                        <li
                          key={index}
                          className={`p-2 ${
                            index !== plan.accomadationDetails.length - 1
                              ? "border-b"
                              : ""
                          } border-gray-200`}
                        >
                          <span className="font-light">{accom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {plan.mealPlans.length > 0 && (
                  <div className="w-[calc(50%-4px)] mt-8">
                    <h4 className="w-full font-semibold p-2 bg-secondary-20">
                      Meals
                    </h4>
                    <ul>
                      {plan.mealPlans.map((meal, index) => (
                        <li
                          key={index}
                          className={`p-2 ${
                            index !== plan.mealPlans.length - 1
                              ? "border-b"
                              : ""
                          } border-gray-200`}
                        >
                          <span className="font-light">
                            {meal.mealType} - {meal.displayText}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {plan.dailyActivities.length > 0 && (
                  <div className="w-[calc(50%-4px)] mt-8">
                    <h4 className="w-full font-semibold p-2 bg-secondary-20">
                      Included Activities
                    </h4>
                    <ul>
                      {plan.dailyActivities.map((dailyact, index) => (
                        <li
                          key={index}
                          className={`p-2 ${
                            index !== plan.dailyActivities.length - 1
                              ? "border-b"
                              : ""
                          } border-gray-200`}
                        >
                          <span className="font-light">{dailyact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {plan.transportDetails.length > 0 && (
                  <div className="w-[calc(50%-4px)] mt-8">
                    <h4 className="w-full font-semibold p-2 bg-secondary-20">
                      Transport Details
                    </h4>
                    <ul>
                      {plan.transportDetails.map((transports, index) => (
                        <li
                          key={index}
                          className={`p-2 ${
                            index !== plan.transportDetails.length - 1
                              ? "border-b"
                              : ""
                          } border-gray-200`}
                        >
                          <span className="font-light">{transports}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

type TripPlansProps = {
  plans: TripPlanType[];
};

function TripPlans({ plans }: TripPlansProps) {
  const [openedIndex, setOpenedIndex] = React.useState<number | null>(null);
  return (
    <LayoutGroup>
      <ul className="w-full px-2">
        {plans.map((plan, index) => (
          <TripPlan
            key={plan.id}
            plan={plan}
            index={index}
            total={plans.length}
            openedIndex={openedIndex}
            setOpenedIndex={setOpenedIndex}
          />
        ))}
      </ul>
    </LayoutGroup>
  );
}

export default TripPlans;
