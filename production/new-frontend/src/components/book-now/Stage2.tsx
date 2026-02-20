import React from "react";
import { format } from "date-fns";
import {
	BookingDetailsType,
	BookingInfoType,
	BookingPersonType,
	BookingType,
	ResponseType,
	TripType,
} from "@/lib/types";
import { Button } from "../ui/button";
import Icon from "../Icon";
import BookNowCard from "./BookNowCard";
import { endpoints } from "@/lib/consts";

const decimalFormatter = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

type DetailsCardProps = {
	primary?: boolean;
	traveler: BookingPersonType;
	amount: number;
};

export function DetailsCard({ traveler, primary, amount }: DetailsCardProps) {
	return (
		<div className="w-full md:p-6 p-4 rounded-lg border-2 border-primary border-dashed bg-primary/10 my-3">
			<div className="w-full flex items-center sm:justify-between justify-start sm:mt-0 mb-4">
				<h4 className="text-xl font-semibold md:block hidden">{traveler.fullName}</h4>
				<div className="flex items-center gap-2">
					<span className="text-sm border rounded-md px-4 py-1.5 border-primary text-primary">
						{traveler.travelerType === "adult" ? "Adult" : "Child"}
					</span>
					<span
						className={`px-4 py-2 ${
							primary ? "bg-secondary" : "bg-primary text-white"
						} text-black rounded-md text-sm`}
					>
						{primary ? "Primary" : "Secondary"} Traveler
					</span>
				</div>
			</div>
			<h4 className="text-xl font-semibold md:hidden block">{traveler.fullName}</h4>
			<div className="w-full flex flex-col md:flex-row md:gap-8 gap-2 mt-4 border-b pb-4">
				<div className="md:w-fit w-full flex md:flex-col flex-row justify-between items-start">
					<label className="text-sm">Passport No</label>
					<p className="text-base font-bold">{traveler.passportNumber}</p>
				</div>
				<div className="md:w-fit w-full flex md:flex-col flex-row justify-between items-start">
					<label className="text-sm">Expire On</label>
					<p className="text-base font-bold">{format(traveler.passportExpiry!, "dd MMM yyyy")}</p>
				</div>
				{primary && (
					<>
						<div className="md:w-fit w-full flex md:flex-col flex-row justify-between items-start">
							<label className="text-sm">Contact Number</label>
							<p className="text-base font-bold">{traveler.contactNumber}</p>
						</div>
						<div className="md:w-fit w-full flex md:flex-col flex-row justify-between items-start">
							<label className="text-sm">Email</label>
							<p className="text-base font-bold">{traveler.email}</p>
						</div>
					</>
				)}
			</div>
			<div className="w-full pt-4 mt-2 border-t border-gray-300 md:gap-8 gap-0 flex md:justify-start justify-between items-center">
				<label>Amount</label>
				<p className="text-lg font-semibold">
					{amount.toLocaleString("en-US", {
						style: "currency",
						currency: "AUD",
					})}
				</p>
			</div>
		</div>
	);
}

type BookingTravelerType = {
	amount: number;
	contactNo: string;
	countryId: string;
	email: string;
	fullName: string;
	gender: number;
	id: string;
	isChild: boolean;
	isPrimary: boolean;
	passportExpiryDate: string;
	passportNo: string;
};

type Stage2Props = {
	data: BookingDetailsType;
	nextStage: () => void;
	previousStage: () => void;
	details: TripType;
	info: BookingInfoType;
	setBooking: (booking: BookingType) => void;
};

function Stage2({ data, nextStage, previousStage, details, info, setBooking }: Stage2Props) {
	function genderValidater(gender: BookingPersonType["gender"]): number {
		if (gender === "male") return 1;
		else if (gender === "female") return 2;
		return 4;
	}

	function travelerData(traveler: BookingPersonType, isPrimary: boolean): BookingTravelerType {
		return {
			amount: traveler.travelerType === "adult" ? details.accomadationPriceAdult : details.accomadationPriceChild,
			contactNo: isPrimary ? traveler.contactNumber : "",
			countryId: traveler.country.value,
			email: isPrimary ? traveler.email : "",
			fullName: traveler.fullName,
			gender: genderValidater(traveler.gender),
			id: "00000000-0000-0000-0000-000000000000",
			isChild: traveler.travelerType === "child",
			isPrimary: isPrimary,
			passportExpiryDate: format(traveler.passportExpiry!, "yyyy-MM-dd"),
			passportNo: traveler.passportNumber,
		};
	}

	async function handleNextStage() {
		const totalAmount =
			data.secondary.filter((tt) => tt.travelerType === "child").length * details.accomadationPriceChild +
			(data.secondary.filter((tt) => tt.travelerType === "adult").length + 1) * details.accomadationPriceAdult;
		let sendData = {
			id: "00000000-0000-0000-0000-000000000000",
			accomadationPriceAdult: details.accomadationPriceAdult,
			accomadationPriceChild: details.accomadationPriceChild,
			bookingPersons: [] as BookingTravelerType[],
			duration: details.duration,
			isActive: true,
			isAgreed: data.agreement,
			payInInstallments: false,
			payingAmount: totalAmount,
			preferredStartDate: format(data.preferredDate!, "yyyy-MM-dd"),
			specialRequests: data.specialRequests,
			totalAmount: totalAmount,
			tripId: details.id,
			tripPdfPath: info.tripPdfPath,
		};

		sendData.bookingPersons.push(travelerData(data.primary, true));
		data.secondary.forEach((traveler) => {
			sendData.bookingPersons.push(travelerData(traveler, false));
		});

		try {
			const response = await fetch(endpoints.bookings.book, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sendData),
			});
			if (!response.ok) {
				console.error("Failed to book trip", response.status, response.statusText, await response.json());
			}
			const { data } = (await response.json()) as ResponseType<BookingType>;
			setBooking(data);
			nextStage();
		} catch (error) {
			console.error("Failed to book trip", error);
		}
	}

	return (
		<div>
			<BookNowCard>
				<div>
					<h2 className="text-2xl font-bold">Total Amount (A$)</h2>
					<p className="my-2">No Of Travelers ({data.secondary.length + 1})</p>
				</div>
				<div className="mt-8">
					<DetailsCard traveler={data.primary} primary amount={details.accomadationPriceAdult} />
					{data.secondary.map((traveler, index) => (
						<DetailsCard
							key={index}
							traveler={traveler}
							amount={
								traveler.travelerType === "adult"
									? details.accomadationPriceAdult
									: details.accomadationPriceChild
							}
						/>
					))}
				</div>
			</BookNowCard>
			<BookNowCard className="sm:py-8">
				<div className="w-full flex justify-between items-center px-2">
					<h2 className="text-2xl font-bold">Total Amount (A$)</h2>
					<p className="text-2xl font-bold">
						{decimalFormatter.format(
							data.secondary.filter((tt) => tt.travelerType === "child").length *
								details.accomadationPriceChild +
								(data.secondary.filter((tt) => tt.travelerType === "adult").length + 1) *
									details.accomadationPriceAdult
						)}
					</p>
				</div>
			</BookNowCard>
			<div className="w-full sm:flex sm:justify-between grid grid-cols-2 gap-4">
				<Button size={"xl"} onClick={previousStage} className="btn btn-primary sm:w-48 w-full">
					<div className="flex items-center justify-between w-full">
						<Icon.ArrowLeft className="inline" />
						<span>Previous</span>
					</div>
				</Button>
				<Button size={"xl"} onClick={handleNextStage} className="btn btn-primary sm:w-48 w-full">
					<div className="flex items-center justify-between w-full">
						<span>Next</span>
						<Icon.ArrowRight className="inline" />
					</div>
				</Button>
			</div>
		</div>
	);
}

export default Stage2;
