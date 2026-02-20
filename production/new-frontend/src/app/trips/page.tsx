"use client";
import React, { Suspense, useState } from "react";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Container from "@/components/Container";
import SearchFilters from "@/components/trips/SearchFilters";
import TripsList from "@/components/trips/TripsList";
import Loading from "@/components/Loading";
import { SelectOptionType } from "@/components/ui/SelectInput";

export type CheckedSelectOptionType = SelectOptionType & { checked: boolean };

function page() {
	const [showFilters, setShowFilters] = React.useState(false);

	const [countryList, setCountryList] = useState<SelectOptionType[]>([]);
	const [destinationList, setDestinationList] = useState<SelectOptionType[]>([]);
	const [experienceList, setExperienceList] = useState<SelectOptionType[]>([]);
	const [themeList, setThemeList] = useState<CheckedSelectOptionType[]>([]);
	const [styleList, setStyleList] = useState<CheckedSelectOptionType[]>([]);

	const [pageFilter, setPageFilter] = useQueryState("page", { defaultValue: "1", clearOnDefault: false });
	const [sortByFilter, setSortByFilter] = useQueryState("sortBy", { defaultValue: "newest" });
	const [searchTextFilter, setSearchTextFilter] = useQueryState("searchText", { defaultValue: "" });

	const [minPriceFilter, setMinPriceFilter] = useQueryState("minPrice", { defaultValue: "" });
	const [maxPriceFilter, setMaxPriceFilter] = useQueryState("maxPrice", { defaultValue: "" });
	const [minDurationFilter, setMinDurationFilter] = useQueryState("minDuration", { defaultValue: "" });
	const [maxDurationFilter, setMaxDurationFilter] = useQueryState("maxDuration", { defaultValue: "" });

	const [countryFilter, setCountryFilter] = useQueryState("country", parseAsArrayOf(parseAsString));
	const [destinationFilter, setDestinationFilter] = useQueryState("destination", parseAsArrayOf(parseAsString));
	const [experienceFilter, setExperienceFilter] = useQueryState("experience", parseAsArrayOf(parseAsString));

	const [themeFilter, setThemeFilter] = useQueryState("theme", parseAsArrayOf(parseAsString));
	const [styleFilter, setStyleFilter] = useQueryState("style", parseAsArrayOf(parseAsString));

	function toggleFilters() {
		setShowFilters((prev) => !prev);
	}

	return (
		<NuqsAdapter>
			<main className="pt-[8vh] min-h-screen">
				<Container containerClassName="lg:px-4 px-0">
					<div className="w-full flex py-8">
						<Suspense fallback={<Loading />}>
							<SearchFilters
								toggleFilters={toggleFilters}
								showFilters={showFilters}
								countryList={countryList}
								setCountryList={setCountryList}
								destinationList={destinationList}
								setDestinationList={setDestinationList}
								experienceList={experienceList}
								setExperienceList={setExperienceList}
								themeList={themeList}
								setThemeList={setThemeList}
								styleList={styleList}
								setStyleList={setStyleList}
								// filter states
								setPageFilter={setPageFilter}
								// price and duration filters
								minPriceFilter={minPriceFilter}
								setMinPriceFilter={setMinPriceFilter}
								maxPriceFilter={maxPriceFilter}
								setMaxPriceFilter={setMaxPriceFilter}
								minDurationFilter={minDurationFilter}
								setMinDurationFilter={setMinDurationFilter}
								maxDurationFilter={maxDurationFilter}
								setMaxDurationFilter={setMaxDurationFilter}
								// country and destination filters
								countryFilter={countryFilter}
								setCountryFilter={setCountryFilter}
								destinationFilter={destinationFilter}
								setDestinationFilter={setDestinationFilter}
								experienceFilter={experienceFilter}
								setExperienceFilter={setExperienceFilter}
								// theme and style filters
								themeFilter={themeFilter}
								setThemeFilter={setThemeFilter}
								styleFilter={styleFilter}
								setStyleFilter={setStyleFilter}
							/>
							<TripsList
								toggleFilters={toggleFilters}
								showFilters={showFilters}
								// filter states
								pageFilter={pageFilter}
								setPageFilter={setPageFilter}
								sortByFilter={sortByFilter}
								setSortByFilter={setSortByFilter}
								searchTextFilter={searchTextFilter}
								setSearchTextFilter={setSearchTextFilter}
							/>
						</Suspense>
					</div>
				</Container>
			</main>
		</NuqsAdapter>
	);
}

export default page;
