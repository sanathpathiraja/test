"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SelectOptionType } from "@/components/ui/SelectInput";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { endpoints } from "@/lib/consts";
import { TripFiltersResponseType } from "@/lib/types";
import { Button } from "../ui/button";
import Icon from "../Icon";
import { CheckedSelectOptionType } from "@/app/trips/page";

type SelectListProps = {
  label: string;
  placeholder: string;
  list: SelectOptionType[];
  selectedList: SelectOptionType[];
  setSelectedList: (val: SelectOptionType[]) => void;
  clear: () => void;
};

function SelectList({
  clear,
  list,
  selectedList,
  setSelectedList,
  label,
  placeholder,
}: SelectListProps) {
  const [showList, setShowList] = useState<SelectOptionType[]>(list);

  useEffect(() => {
    setShowList(list);
  }, [list]);

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="w-full flex justify-between items-center">
        <label htmlFor="select-country" className="text-lg font-semibold">
          {label}
        </label>
        <button
          className="text-[var(--primary-color)] hover:text-[var(--secondary-color)]"
          onClick={() => {
            clear();
            setShowList(list);
          }}
        >
          clear
        </button>
      </div>
      <select
        id="select-country"
        className="w-full mt-1 py-2 px-4 rounded-sm border-none outline-none bg-gray-100"
        onChange={(e) => {
          const newContry = list.find((itm) => itm.value === e.target.value);
          if (newContry) {
            setSelectedList([...selectedList, newContry]);
            setShowList((prev) =>
              prev.filter((item) => item.value !== newContry.value),
            );
            e.target.value = "";
          }
        }}
      >
        <option value="">{placeholder}</option>
        {showList.map((country, index) => (
          <option value={country.value} key={index}>
            {country.label}
          </option>
        ))}
      </select>
      {selectedList.length > 0 ? (
        <motion.ul className="w-full flex flex-row flex-wrap gap-1 mt-2 px-2">
          <AnimatePresence mode="sync">
            {selectedList.map((selectedItem) => (
              <motion.li
                layout
                key={`${selectedItem.value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="w-fit py-1 px-2 bg-[var(--primary-color-30)] border border-[var(--primary-color)] rounded-sm text-[var(--primary-color)] hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 cursor-pointer"
                onClick={() => {
                  setShowList((prev) =>
                    [...prev, selectedItem].sort((a, b) =>
                      a.label.localeCompare(b.label),
                    ),
                  );
                  setSelectedList(
                    selectedList.filter(
                      (item) => item.value !== selectedItem.value,
                    ),
                  );
                }}
              >
                {selectedItem.label}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : null}
    </div>
  );
}

type SearchFiltersProps = {
  toggleFilters: () => void;
  showFilters: boolean;
  countryList: SelectOptionType[];
  setCountryList: React.Dispatch<React.SetStateAction<SelectOptionType[]>>;
  destinationList: SelectOptionType[];
  setDestinationList: React.Dispatch<React.SetStateAction<SelectOptionType[]>>;
  experienceList: SelectOptionType[];
  setExperienceList: React.Dispatch<React.SetStateAction<SelectOptionType[]>>;
  themeList: CheckedSelectOptionType[];
  setThemeList: React.Dispatch<React.SetStateAction<CheckedSelectOptionType[]>>;
  styleList: CheckedSelectOptionType[];
  setStyleList: React.Dispatch<React.SetStateAction<CheckedSelectOptionType[]>>;
  // filter states
  setPageFilter: (value: string) => void;
  minPriceFilter: string;
  setMinPriceFilter: (value: string) => void;
  maxPriceFilter: string;
  setMaxPriceFilter: (value: string) => void;
  minDurationFilter: string;
  setMinDurationFilter: (value: string) => void;
  maxDurationFilter: string;
  setMaxDurationFilter: (value: string) => void;
  countryFilter: string[] | null;
  setCountryFilter: (value: string[]) => void;
  destinationFilter: string[] | null;
  setDestinationFilter: (value: string[]) => void;
  experienceFilter: string[] | null;
  setExperienceFilter: (value: string[]) => void;
  themeFilter: string[] | null;
  setThemeFilter: (value: string[]) => void;
  styleFilter: string[] | null;
  setStyleFilter: (value: string[]) => void;
};

function SearchFilters({
  toggleFilters,
  showFilters,
  countryList,
  destinationList,
  experienceList,
  setCountryList,
  setDestinationList,
  setExperienceList,
  setStyleList,
  setThemeList,
  styleList,
  themeList,
  // filter states
  setPageFilter,
  minPriceFilter,
  setMinPriceFilter,
  maxPriceFilter,
  setMaxPriceFilter,
  minDurationFilter,
  setMinDurationFilter,
  maxDurationFilter,
  setMaxDurationFilter,
  countryFilter,
  setCountryFilter,
  destinationFilter,
  setDestinationFilter,
  experienceFilter,
  setExperienceFilter,
  themeFilter,
  setThemeFilter,
  styleFilter,
  setStyleFilter,
}: SearchFiltersProps) {
  const MAX_PRICE = 10000;
  const MAX_DAYS = 60;

  const queryParams = useSearchParams();
  const navigation = useRouter();

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
          checked: themeFilter ? themeFilter.includes(theme.id) : false,
        })),
      );
      setStyleList(
        data.data.styleList.map((style) => ({
          label: style.name,
          value: style.id,
          checked: styleFilter ? styleFilter.includes(style.id) : false,
        })),
      );

      // Set initial values for filters if they exist in query params
      if (countryFilter && countryFilter.length > 0) {
        let initCountries = [];
        for (const c of countryFilter) {
          const country = data.data.countryList.find(
            (country) => country.id === c,
          );
          if (country) {
            initCountries.push({ label: country.name, value: country.id });
          }
        }
        if (initCountries) setSelectedCountries(initCountries);
      }
      if (destinationFilter && destinationFilter.length > 0) {
        let initDestinations = [];
        for (const d of destinationFilter) {
          const destination = data.data.destinationList.find(
            (dest) => dest.id === d,
          );
          if (destination) {
            initDestinations.push({
              label: destination.name,
              value: destination.id,
            });
          }
        }
        if (initDestinations) setSelectedDestinations(initDestinations);
      }
      if (experienceFilter && experienceFilter.length > 0) {
        let initExperiences = [];
        for (const e of experienceFilter) {
          const experience = data.data.experienceList.find(
            (exp) => exp.id === e,
          );
          if (experience) {
            initExperiences.push({
              label: experience.name,
              value: experience.id,
            });
          }
        }
        if (initExperiences) setSelectedExperiences(initExperiences);
      }
    } catch (error) {
      console.error("Error fetching trip filters:", error);
    }
  }

  const initMinPrice = minPriceFilter ? parseInt(minPriceFilter || "0", 10) : 0;
  const initMaxPrice = maxPriceFilter
    ? parseInt(maxPriceFilter || `${MAX_PRICE}`, 10)
    : MAX_PRICE;
  const initMinDay = minDurationFilter
    ? parseInt(minDurationFilter || "0", 10)
    : 0;
  const initMaxDay = maxDurationFilter
    ? parseInt(maxDurationFilter || `${MAX_DAYS}`, 10)
    : MAX_DAYS;

  const [selectedCountries, setSelectedCountries] = useState<
    SelectOptionType[]
  >([]);
  const [selectedDestinations, setSelectedDestinations] = useState<
    SelectOptionType[]
  >([]);
  const [selectedExperiences, setSelectedExperiences] = useState<
    SelectOptionType[]
  >([]);
  const [minPrice, setMinPrice] = useState<number>(initMinPrice);
  const [maxPrice, setMaxPrice] = useState<number>(initMaxPrice);
  const [minDay, setMinDay] = useState<number>(initMinDay);
  const [maxDay, setMaxDay] = useState<number>(initMaxDay);

  const clearList = {
    country: () => {
      setSelectedCountries([]);
      setCountryFilter([]);
      setPageFilter("1");
    },
    destination: () => {
      setSelectedDestinations([]);
      setDestinationFilter([]);
      setPageFilter("1");
    },
    experience: () => {
      setSelectedExperiences([]);
      setExperienceFilter([]);
      setPageFilter("1");
    },
    style: () => {
      setStyleList((prev) =>
        prev.map((style) => ({ ...style, checked: false })),
      );
      setStyleFilter([]);
      setPageFilter("1");
    },
    theme: () => {
      setThemeList((prev) =>
        prev.map((theme) => ({ ...theme, checked: false })),
      );
      setThemeFilter([]);
      setPageFilter("1");
    },
    priceRange: () => {
      setMinPrice(0);
      setMaxPrice(MAX_PRICE);
      setMinPriceFilter("");
      setMaxPriceFilter("");
      setPageFilter("1");
    },
    durationRange: () => {
      setMinDay(0);
      setMaxDay(MAX_DAYS);
      setMinDurationFilter("");
      setMaxDurationFilter("");
      setPageFilter("1");
    },
  };

  function clearAllFilters() {
    for (const [key, value] of Object.entries(clearList)) {
      value();
    }
  }

  useEffect(() => {
    getTripList();
  }, []);

  return (
    <div
      className={`w-full lg:w-80 h-fit lg:relative z-50 lg:pt-4 pt-0 p-4 bg-gray-50/20 lg:shadow-md rounded-md lg:block ${
        showFilters ? "block" : "hidden"
      }`}
    >
      <div className="w-full lg:hidden flex justify-between mb-4">
        <Button
          className=""
          variant={"ghost"}
          size={"lg"}
          onClick={toggleFilters}
        >
          <Icon.ArrowLeft className="text-2xl" />
          <span className="text-lg">Back to List</span>
        </Button>
        <Button
          className=""
          variant={"default"}
          size={"lg"}
          onClick={toggleFilters}
        >
          <Icon.Search className="text-2xl" />
          <span className="text-lg">Search</span>
        </Button>
      </div>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Filters</h1>
        <button
          className="text-md text-primary font-semibold hover:text-forth opacity-80 hover:opacity-100"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>
      {/* country selector */}
      <SelectList
        label="Country"
        placeholder="Select Country"
        list={countryList}
        selectedList={selectedCountries}
        setSelectedList={(val) => {
          setSelectedCountries(val);
          setCountryFilter(val.map((country) => country.value));
          setPageFilter("1");
        }}
        clear={clearList.country}
      />
      {/* Style selector */}
      <div className="py-4 border-b border-gray-200">
        <div className="w-full flex justify-between items-center">
          <label htmlFor="select-country" className="text-lg font-semibold">
            Styles
          </label>
          <button
            className="text-[var(--primary-color)] hover:text-[var(--secondary-color)]"
            onClick={clearList.style}
          >
            clear
          </button>
        </div>
        <div>
          <ul>
            {styleList.map((style) => (
              <li key={style.value} className="flex items-center gap-2 my-2">
                <input
                  type="checkbox"
                  name={style.label}
                  id={`theme-${style.value}`}
                  checked={style.checked}
                  onChange={() => {
                    const updated = styleList.map((t) =>
                      t.value === style.value
                        ? { ...t, checked: !t.checked }
                        : t,
                    );
                    setStyleList(updated);
                    setStyleFilter(
                      updated.filter((s) => s.checked).map((s) => s.value),
                    );
                    setPageFilter("1");
                  }}
                />
                <label htmlFor={`theme-${style.value}`}>{style.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* destination selector */}
      <SelectList
        label="Destination"
        placeholder="Select Destination"
        list={destinationList}
        selectedList={selectedDestinations}
        setSelectedList={(val) => {
          setSelectedDestinations(val);
          setDestinationFilter(val.map((destination) => destination.value));
          setPageFilter("1");
        }}
        clear={clearList.destination}
      />
      {/* experience selector */}
      <SelectList
        label="Experience"
        placeholder="Select Experience"
        list={experienceList}
        selectedList={selectedExperiences}
        setSelectedList={(val) => {
          setSelectedExperiences(val);
          setExperienceFilter(val.map((experience) => experience.value));
          setPageFilter("1");
        }}
        clear={clearList.experience}
      />
      {/* theme selector */}
      <div className="py-4 border-b border-gray-200">
        <div className="w-full flex justify-between items-center">
          <label htmlFor="select-country" className="text-lg font-semibold">
            Themes
          </label>
          <button
            className="text-[var(--primary-color)] hover:text-[var(--secondary-color)]"
            onClick={clearList.theme}
          >
            clear
          </button>
        </div>
        <div>
          <ul>
            {themeList.map((theme) => (
              <li key={theme.value} className="flex items-center gap-2 my-2">
                <input
                  type="checkbox"
                  name={theme.label}
                  id={`theme-${theme.value}`}
                  checked={theme.checked}
                  onChange={() => {
                    const updated = themeList.map((t) =>
                      t.value === theme.value
                        ? { ...t, checked: !t.checked }
                        : t,
                    );
                    setThemeList(updated);
                    setThemeFilter(
                      updated.filter((s) => s.checked).map((s) => s.value),
                    );
                    setPageFilter("1");
                  }}
                />
                <label htmlFor={`theme-${theme.value}`}>{theme.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* price range */}
      <div className="py-4 border-b border-gray-200">
        <div className="w-full flex justify-between items-center">
          <label htmlFor="select-country" className="text-lg font-semibold">
            Price Range
          </label>
          <button
            className="text-[var(--primary-color)] hover:text-[var(--secondary-color)]"
            onClick={clearList.priceRange}
          >
            clear
          </button>
        </div>
        <div className="w-full my-2">
          <label htmlFor="price-range">Min & Max Range</label>
          <input
            id="price-range"
            type="text"
            className="mt-2 w-full bg-gray-200 rounded-md px-3 py-2"
            disabled
            value={`A$ ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`}
          />
          <div className="w-full flex justify-between items-center mt-4">
            <span>A$ 0</span>
            <span>A$ {MAX_PRICE.toLocaleString()}</span>
          </div>
          <Slider
            defaultValue={[0, MAX_PRICE]}
            value={[minPrice, maxPrice]}
            max={MAX_PRICE}
            step={500}
            className="mt-1"
            onValueChange={(value) => {
              setMinPrice(value[0]);
              setMaxPrice(value[1]);
              setMinPriceFilter(value[0] === 0 ? "" : value[0].toString());
              setMaxPriceFilter(
                value[1] === MAX_PRICE ? "" : value[1].toString(),
              );
              setPageFilter("1");
            }}
          />
        </div>
      </div>
      {/* duration range */}
      <div className="py-4">
        <div className="w-full flex justify-between items-center">
          <label htmlFor="select-country" className="text-lg font-semibold">
            Duration
          </label>
          <button
            className="text-[var(--primary-color)] hover:text-[var(--secondary-color)]"
            onClick={clearList.durationRange}
          >
            clear
          </button>
        </div>
        <div className="w-full my-2">
          <div className="w-full flex justify-between items-center">
            <label htmlFor="duration-range">Min & Max Days</label>
            <input
              id="duration-range"
              type="text"
              className="mt-2 w-20 bg-gray-200 rounded-md px-3 py-2"
              disabled
              value={`${minDay.toLocaleString()} - ${maxDay.toLocaleString()}`}
            />
          </div>
          <div className="w-full flex justify-between items-center mt-4">
            <span>0</span>
            <span>2 months</span>
          </div>
          <Slider
            defaultValue={[0, MAX_DAYS]}
            value={[minDay, maxDay]}
            max={MAX_DAYS}
            step={1}
            className="mt-1"
            onValueChange={(value) => {
              setMinDay(value[0]);
              setMaxDay(value[1]);
              setMinDurationFilter(value[0] === 0 ? "" : value[0].toString());
              setMaxDurationFilter(
                value[1] === MAX_DAYS ? "" : value[1].toString(),
              );
              setPageFilter("1");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
