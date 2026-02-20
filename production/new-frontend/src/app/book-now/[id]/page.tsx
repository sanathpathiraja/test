"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import Loading from "@/components/Loading";
import { endpoints, environment } from "@/lib/consts";
import { BookingDetailsType, BookingInfoType, BookingType, ResponseType, TripType } from "@/lib/types";
import BookNowCard from "@/components/book-now/BookNowCard";
import Stage1 from "@/components/book-now/Stage1";
import Stage2 from "@/components/book-now/Stage2";
import Stage3 from "@/components/book-now/Stage3";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(environment.STRIPE_KEY);

type BookingStageType = {
	value: string;
	label: string;
	isActive: boolean;
};

type BookingHeaderProps = {
	stages: BookingStageType[];
};

function BookingHeader({ stages }: BookingHeaderProps) {
	return (
		<BookNowCard>
			<div className="flex md:flex-row flex-col md:gap-2 gap-4 justify-between md:items-center items-start">
				{stages.map((stage, index) => (
					<React.Fragment key={stage.value}>
						<div
							className={`flex items-center justify-self-start gap-2 text-center ${
								stage.isActive ? "font-bold" : "text-gray-400"
							}`}
						>
							<span
								className={`w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center ${
									stage.isActive ? "opacity-100" : "opacity-50"
								}`}
							>
								{index + 1}
							</span>
							<span className="text-lg">{stage.label}</span>
						</div>
						{index < stages.length - 1 && (
							<div className="md:flex-grow border-t border-gray-300 mx-4 md:w-auto w-px md:h-0 h-8 bg-gray-300"></div>
						)}
					</React.Fragment>
				))}
			</div>
		</BookNowCard>
	);
}

function Page() {
	const { id } = useParams();
	const navigation = useRouter();
	const [tripDetails, setTripDetails] = useState<TripType>();
	const [bookingInfo, setBookingInfo] = useState<BookingInfoType>();
	const [booking, setBooking] = useState<BookingType>();
	const [tabStages, setTabStages] = useState([
		{
			value: "details",
			label: "Booking Details",
			isActive: true,
		},
		{
			value: "summary",
			label: "Booking Summary",
			isActive: false,
		},
		{
			value: "payment",
			label: "Payment",
			isActive: false,
		},
	]);

	const [data, setData] = React.useState<BookingDetailsType>({
		preferredDate: undefined,
		specialRequests: "",
		agreement: false,
		primary: {
			travelerType: "adult",
			gender: "",
			country: { label: "", value: "" },
			fullName: "",
			email: "",
			contactNumber: "",
			passportNumber: "",
			passportExpiry: undefined,
		},
		secondary: [],
	});

	async function getTripDetails() {
		if (!id) return;
		let tripId = typeof id === "string" ? id : id[0];
		try {
			const response = await fetch(endpoints.trips.byId(tripId));
			if (!response.ok) {
				console.error(
					"Failed to fetch trip details book now page",
					response.status,
					response.statusText,
					response
				);
				return navigation.replace("/404");
			}
			const { data } = (await response.json()) as ResponseType<TripType>;
			setTripDetails(data);
		} catch (error) {
			console.error("Failed to fetch trip details book now page", error);
			return navigation.replace("/404");
		}
	}

	async function getTripBookingInfo() {
		if (!id) return;
		let tripId = typeof id === "string" ? id : id[0];
		try {
			const response = await fetch(endpoints.bookings.info(tripId));
			if (!response.ok) {
				console.error(
					"Failed to fetch trip booking details book now page",
					response.status,
					response.statusText,
					response
				);
				return navigation.replace("/404");
			}
			const { data } = (await response.json()) as ResponseType<BookingInfoType>;
			setBookingInfo(data);
		} catch (error) {
			console.error("Failed to fetch trip booking details book now page", error);
			return navigation.replace("/404");
		}
	}

	async function fetchClientSecret(): Promise<string> {
		if (!booking) return "";
		const response = await fetch(endpoints.bookings.createPaymentIntent, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: booking.totalAmount,
				bookingId: booking.bookingId,
				bookingRef: booking.bookingRef,
				currency: "aud",
				paymentId: booking.paymentId,
			}),
		});
		if (!response.ok) {
			throw new Error("Failed to fetch client secret");
		}
		const data = await response.json();
		console.log("Client secret fetched successfully", data);
		return data.clientSecret;
	}

	function nextStage() {
		const currentIndex = tabStages.findIndex((stage) => stage.isActive);
		if (currentIndex < tabStages.length - 1) {
			const newStages = tabStages.map((stage, index) => ({
				...stage,
				isActive: index === currentIndex + 1,
			}));
			setTabStages(newStages);
		}
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function previousStage() {
		const currentIndex = tabStages.findIndex((stage) => stage.isActive);
		if (currentIndex > 0) {
			const newStages = tabStages.map((stage, index) => ({
				...stage,
				isActive: index === currentIndex - 1,
			}));
			setTabStages(newStages);
		}
	}

	useEffect(() => {
		getTripDetails();
		getTripBookingInfo();
	}, []);

	return (
		<main className="w-full pt-[8vh] min-h-screen">
			<>
				{!tripDetails || !bookingInfo ? (
					<div className="w-full h-screen flex items-center justify-center">
						<Loading />
					</div>
				) : (
					<Container className="py-8">
						<div>
							<h1 className="sm:text-5xl text-4xl font-dm-serif-display" onClick={previousStage}>
								{tripDetails.name}
							</h1>
							<div className="flex justify-between max-w-lg items-center mt-8">
								<h3 className="text-xl text-primary font-thin">
									TRIP CODE: <strong className="font-bold">{tripDetails.tripCode}</strong>
								</h3>
								<span className="sm:text-2xl text-lg font-light text-primary">
									<Icon.Calendar className="inline mr-2" />
									{tripDetails.duration} Days. {tripDetails.noOfNights} Nights
								</span>
							</div>
						</div>
						<div className="mt-10">
							<BookingHeader stages={tabStages} />
						</div>
						<div className="mt-8">
							{tabStages[0].isActive && (
								<Stage1 data={data} setData={setData} details={tripDetails} nextStage={nextStage} />
							)}
							{tabStages[1].isActive && (
								<Stage2
									data={data}
									nextStage={nextStage}
									details={tripDetails}
									info={bookingInfo}
									previousStage={previousStage}
									setBooking={setBooking}
								/>
							)}
							{tabStages[2].isActive && (
								<Elements
									stripe={stripePromise}
									options={{
										mode: "payment",
										currency: "aud",
										amount: booking?.totalAmount,
										paymentMethodTypes: ["card"],
									}}
								>
									<Stage3
										data={data}
										previousStage={previousStage}
										getClientSecrete={fetchClientSecret}
										booking={booking!}
									/>
								</Elements>
							)}
						</div>
					</Container>
				)}
			</>
		</main>
	);
}

export default Page;
