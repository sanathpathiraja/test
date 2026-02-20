import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/input";
import SelectInput, { SelectOptionType } from "./ui/SelectInput";
import { endpoints } from "@/lib/consts";
import { Button } from "./ui/button";
import Icon from "./Icon";
import { TripFiltersResponseType } from "@/lib/types";

type AdvanceSearchProps = {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const sortByList: SelectOptionType[] = [
  { label: "Most Recent", value: "newest" },
  { label: "Price : Low to High", value: "priceLowest" },
  { label: "Price : High to Low", value: "priceHighest" },
  { label: "Duration : Low to High", value: "shortest" },
  { label: "Duration : High to Low", value: "longest" },
  { label: "Popularity", value: "popularity" },
];

function AdvanceSearch({ searchOpen, setSearchOpen }: AdvanceSearchProps) {
  const [selectedSort, setSelectedSort] =
    React.useState<SelectOptionType | null>(null);

  const [countryList, setCountryList] = React.useState<SelectOptionType[]>([]);
  const [destinationList, setDestinationList] = React.useState<
    SelectOptionType[]
  >([]);
  const [experienceList, setExperienceList] = React.useState<
    SelectOptionType[]
  >([]);
  const [themeList, setThemeList] = React.useState<SelectOptionType[]>([]);
  const [styleList, setStyleList] = React.useState<SelectOptionType[]>([]);

  const [selectedCountry, setSelectedCountry] =
    React.useState<SelectOptionType | null>(null);
  const [selectedDestination, setSelectedDestination] =
    React.useState<SelectOptionType | null>(null);
  const [selectedExperience, setSelectedExperience] =
    React.useState<SelectOptionType | null>(null);
  const [selectedTheme, setSelectedTheme] =
    React.useState<SelectOptionType | null>(null);
  const [selectedStyle, setSelectedStyle] =
    React.useState<SelectOptionType | null>(null);

  const [searchText, setSearchText] = React.useState<string>("");
  const [minPrice, setMinPrice] = React.useState<number | null>(null);
  const [maxPrice, setMaxPrice] = React.useState<number | null>(null);
  const [minDuration, setMinDuration] = React.useState<number | null>(null);
  const [maxDuration, setMaxDuration] = React.useState<number | null>(null);

  async function getTripList() {
    try {
      const response = await fetch(endpoints.trips.tripfilters);
      if (!response.ok) {
        throw new Error("Failed to fetch trip filters");
      }
      const data = (await response.json()) as TripFiltersResponseType;

      setCountryList(
        data.data.countryList.map((country) => ({
          label: country.name,
          value: country.id,
        })),
      );
      setDestinationList(
        data.data.destinationList.map((destination) => ({
          label: destination.name,
          value: destination.id,
        })),
      );
      setExperienceList(
        data.data.experienceList.map((experience) => ({
          label: experience.name,
          value: experience.id,
        })),
      );
      setThemeList(
        data.data.themeList.map((theme) => ({
          label: theme.name,
          value: theme.id,
        })),
      );
      setStyleList(
        data.data.styleList.map((style) => ({
          label: style.name,
          value: style.id,
        })),
      );
    } catch (error) {
      console.error("Error fetching trip filters:", error);
    }
  }

  function handleSearchSubmit() {
    const queryParams: Record<string, string> = {
      country: selectedCountry ? selectedCountry.value : "",
      destination: selectedDestination ? selectedDestination.value : "",
      theme: selectedTheme ? selectedTheme.value : "",
      style: selectedStyle ? selectedStyle.value : "",
      experience: selectedExperience ? selectedExperience.value : "",
      searchText: searchText,
      sortBy: selectedSort ? selectedSort.value : "newest",
      maxPrice: String(maxPrice),
      minPrice: String(minPrice),
      maxDuration: String(maxDuration),
      minDuration: String(minDuration),
    };
    const queryString = new URLSearchParams(queryParams).toString();
    window.location.href = `/trips?${queryString}`;
    setSearchOpen(false);
    setSelectedCountry(null);
    setSelectedDestination(null);
    setSelectedExperience(null);
    setSelectedTheme(null);
    setSelectedStyle(null);
    setSearchText("");
    setMinPrice(null);
    setMaxPrice(null);
    setMinDuration(null);
    setMaxDuration(null);
    setSelectedSort(null);
  }

  // useEffect(() => {
  // 	disableScroll();
  // 	return () => {
  // 		document.body.classList.remove("overflow-hidden");
  // 	};
  // }, [searchOpen]);

  useEffect(() => {
    getTripList();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {searchOpen && (
          <motion.div
            id="advance-serach-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 bottom-0 left-0 right-0 z-[9999] flex items-center justify-center sm:px-2"
          >
            <motion.div
              id="advance-serach-background-blur"
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setSearchOpen(false)}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 bottom-0 z-[10000]"
            />
            <motion.div
              id="advance-serach-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.31 }}
              className="absolute top-0 left-0 right-0 bottom-0 bg-[#18181878] z-[10001]"
            />
            <motion.div
              id="advance-serach-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.31, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl sm:relative px-4 py-4 max-h-screen sm:h-auto h-screen w-screen sm:overflow-visible overflow-y-scroll z-[10002] absolute top-0 left-0 right-0 bottom-0"
            >
              <button
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-neutral-300 transition-colors"
                onClick={() => setSearchOpen(false)}
              >
                <Icon.Close className="text-3xl text-slate-200" />
              </button>
              <h2 className="text-4xl font-dm-serif-display text-center text-white pt-8">
                Find Your Relaxation
              </h2>
              <div className="mt-6 flex flex-col gap-4 w-full">
                <div className="w-full grid lg:grid-cols-2 gap-4 grid-cols-1">
                  <Input
                    placeholder="Search Trips"
                    className="bg-white w-full rounded"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />

                  <SelectInput
                    className="w-full bg-white rounded"
                    list={sortByList}
                    value={selectedSort}
                    placeholder="Sort By"
                    onChange={setSelectedSort}
                    searchable={false}
                  />
                </div>
                <div className="w-full grid lg:grid-cols-2 gap-4 grid-cols-1">
                  <SelectInput
                    className="w-full bg-white rounded"
                    list={countryList}
                    value={selectedCountry}
                    placeholder="Country"
                    onChange={setSelectedCountry}
                  />
                  <SelectInput
                    className="w-full bg-white rounded"
                    list={destinationList}
                    value={selectedDestination}
                    placeholder="Destination"
                    onChange={setSelectedDestination}
                  />
                </div>
                <div className="w-full grid lg:grid-cols-2 gap-4 grid-cols-1">
                  <SelectInput
                    className="w-full bg-white rounded"
                    list={themeList}
                    value={selectedTheme}
                    placeholder="Theme"
                    onChange={setSelectedTheme}
                    searchable={false}
                  />
                  <SelectInput
                    className="w-full bg-white rounded"
                    list={styleList}
                    value={selectedStyle}
                    placeholder="Style"
                    onChange={setSelectedStyle}
                    searchable={false}
                  />
                </div>
                <div className="w-full grid lg:grid-cols-2 gap-4 grid-cols-1">
                  <div className="w-full grid grid-cols-2 gap-4">
                    <Input
                      className="w-full bg-white rounded"
                      type="number"
                      placeholder="Min Duration"
                      value={minDuration || ""}
                      onChange={(e) =>
                        setMinDuration(
                          e.target.value ? parseInt(e.target.value) : null,
                        )
                      }
                    />
                    <Input
                      className="w-full bg-white rounded"
                      type="number"
                      placeholder="Max Duration"
                      value={maxDuration || ""}
                      onChange={(e) =>
                        setMaxDuration(
                          e.target.value ? parseInt(e.target.value) : null,
                        )
                      }
                    />
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4">
                    <Input
                      className="w-full bg-white rounded"
                      type="number"
                      placeholder="Min Price"
                      value={minPrice || ""}
                      onChange={(e) =>
                        setMinPrice(
                          e.target.value ? parseInt(e.target.value) : null,
                        )
                      }
                    />
                    <Input
                      className="w-full bg-white rounded"
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice || ""}
                      onChange={(e) =>
                        setMaxPrice(
                          e.target.value ? parseInt(e.target.value) : null,
                        )
                      }
                    />
                  </div>
                </div>
                <div className="w-full grid lg:grid-cols-2 gap-4 grid-cols-1">
                  <SelectInput
                    className="w-full bg-white rounded"
                    list={experienceList}
                    value={selectedExperience}
                    placeholder="Experience"
                    onChange={setSelectedExperience}
                  />
                  <Button
                    className="bg-primary text-white w-full h-13 font-bold text-lg rounded"
                    onClick={handleSearchSubmit}
                  >
                    Find Now
                  </Button>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center mt-8">
                <p className="text-white font-semibold">
                  Looking for more options or specific filters?
                </p>
                <a href="/search" className="text-primary text-lg font-bold">
                  Go to Advanced Search
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdvanceSearch;
