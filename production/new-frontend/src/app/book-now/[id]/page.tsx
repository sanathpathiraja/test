"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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

// loadStripe crashes on an undefined key, so only initialise Stripe when the publishable key is configured
const stripePromise = environment.STRIPE_KEY ? loadStripe(environment.STRIPE_KEY) : null;
if (!stripePromise) {
	console.error("Stripe publishable key is not configured (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY*). Payments are unavailable.");
}

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
	const [clientSecret, setClientSecret] = useState<string>();
	const [paymentSetupError, setPaymentSetupError] = useState<string>();
	// One PaymentIntent per booking: effects can run more than once (e.g. React StrictMode), so reuse the request
	const paymentIntentRequest = useRef<{ bookingId: string; promise: Promise<string> }>(undefined);
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

	async function fetchClientSecret(booking: BookingType): Promise<string> {
		const response = await fetch(endpoints.bookings.createPaymentIntent, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// The server works out the amount and currency from the booking
			body: JSON.stringify({
				bookingId: booking.bookingId,
				bookingRef: booking.bookingRef,
				paymentId: booking.paymentId,
			}),
		});
		const data = await response.json().catch(() => null);
		if (!response.ok) {
			throw new Error(data?.error || "We couldn't start the payment. Please refresh the page and try again.");
		}
		if (!data?.clientSecret) {
			throw new Error("We couldn't start the payment. Please refresh the page and try again.");
		}
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
			// Booking details can change on the first stage, so the created booking no longer applies
			if (currentIndex - 1 === 0) {
				setBooking(undefined);
				setClientSecret(undefined);
				setPaymentSetupError(undefined);
			}
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

	const isPaymentStage = tabStages[2].isActive;

	// Create the booking's PaymentIntent on reaching the payment stage; Stripe Elements is then initialised from it
	useEffect(() => {
		if (!isPaymentStage || !booking || clientSecret) return;
		if (paymentIntentRequest.current?.bookingId !== booking.bookingId) {
			paymentIntentRequest.current = { bookingId: booking.bookingId, promise: fetchClientSecret(booking) };
		}
		const request = paymentIntentRequest.current;
		let cancelled = false;
		setPaymentSetupError(undefined);
		request.promise
			.then((secret) => {
				if (!cancelled) setClientSecret(secret);
			})
			.catch((err) => {
				console.error("Failed to fetch client secret:", err);
				if (!cancelled) setPaymentSetupError(err instanceof Error && err.message ? err.message : "We couldn't start the payment. Please refresh the page and try again.");
			});
		return () => {
			cancelled = true;
		};
	}, [isPaymentStage, booking, clientSecret]);

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
									booking={booking}
									setBooking={setBooking}
								/>
							)}
							{tabStages[2].isActive &&
								(stripePromise ? (
									clientSecret ? (
										// Amount, currency and payment methods come from the booking's PaymentIntent
										<Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret }}>
											<Stage3
												data={data}
												previousStage={previousStage}
												clientSecret={clientSecret}
												booking={booking!}
											/>
										</Elements>
									) : (
										<BookNowCard className="w-full max-w-xl mx-auto">
											{paymentSetupError ? (
												<div className="w-full bg-red-500/10 border border-red-500 p-4 rounded-sm text-sm flex items-center text-red-500">
													<Icon.Warning className="inline mr-2" />
													{paymentSetupError}
												</div>
											) : (
												<div className="w-full h-120 flex items-center justify-center">
													<Loading />
												</div>
											)}
										</BookNowCard>
									)
								) : (
									<BookNowCard className="w-full max-w-xl mx-auto">
										<div className="w-full bg-red-500/10 border border-red-500 p-4 rounded-sm text-sm flex items-center text-red-500">
											<Icon.Warning className="inline mr-2" />
											Online payment is currently unavailable. Please contact us to complete your booking.
										</div>
									</BookNowCard>
								))}
						</div>
					</Container>
				)}
			</>
		</main>
	);
}

export default Page;
