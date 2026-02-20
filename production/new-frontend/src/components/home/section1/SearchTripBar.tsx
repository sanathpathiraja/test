"use client";
import React, { useRef } from "react";
import DateRangePicker, { DateRangePickerRef } from "@/components/ui/date-picker";
import SelectInput, { SelectOptionType } from "@/components/ui/SelectInput";
import { Button } from "@/components/ui/button";
import Icon from "@/components/Icon";

type SearchTripBarProps = {
	countries: SelectOptionType[];
};

function SearchTripBar({ countries }: SearchTripBarProps) {
	const datePickerRef = useRef<DateRangePickerRef>(null);
	const [selectedCountry, setSelectedCountry] = React.useState<SelectOptionType | null>(null);
	const [selectedMaxDuration, setSelectedMaxDuration] = React.useState<number>(0);

	async function findNow() {
		const params: Record<string, string> = {
			page: "1",
			maxDuration: selectedMaxDuration > 0 ? String(selectedMaxDuration) : "",
			country: selectedCountry ? selectedCountry.value : "",
		};
		const filterString = new URLSearchParams(params).toString();
		window.location.href = `/trips?${filterString}`;
	}

	return (
		<div className="w-full bg-[#ffffffa0] px-6 py-10 rounded-lg mt-20 flex lg:flex-row flex-col sm:gap-4 gap-2">
			<div className="lg:w-2/5 w-full">
				<SelectInput
					list={countries}
					placeholder="Country"
					value={selectedCountry}
					onChange={setSelectedCountry}
					notFoundText="No countries found"
					className="w-full rounded-md hover:bg-neutral-200"
					Icon={<Icon.Location className="mr-4" />}
				/>
			</div>
			<div className="lg:w-2/5 w-full full flex items-center justify-between gap-4">
				<DateRangePicker
					ref={datePickerRef}
					className="w-full"
					placeholderClassName="rounded-md bg-white hover:bg-neutral-200 text-black"
					iconNeeded={true}
					onChangeDateCount={setSelectedMaxDuration}
				/>
				<Button
					variant={"secondary"}
					className="h-12 w-12 rounded-md text-white flex items-center justify-center"
					onClick={() => datePickerRef.current?.open()}
				>
					<Icon.Calendar className="!h-5 !w-5" />
				</Button>
			</div>
			<Button className="h-12 lg:w-1/5 w-full rounded-md text-lg font-normal font-poppins" onClick={findNow}>
				Find Now
			</Button>
		</div>
	);
}

export default SearchTripBar;
