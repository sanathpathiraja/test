"use client";
import React, { useState } from "react";
import { BookingDetailsType, BookingType } from "@/lib/types";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import Loading from "../Loading";
import BookNowCard from "./BookNowCard";
import Icon from "../Icon";
import { useRouter } from "next/navigation";
import { endpoints } from "@/lib/consts";

const decimalFormatter = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

type Stage3Props = {
	data: BookingDetailsType;
	previousStage: () => void;
	clientSecret: string;
	booking: BookingType;
};

function Stage3({ data, previousStage, clientSecret, booking }: Stage3Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	// Set once Stripe has taken the payment, so it cannot be submitted again
	const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);

	const navigation = useRouter();
	const stripe = useStripe();
	const elements = useElements();

	// Asks the server to verify the payment with Stripe and confirm the booking. Only identifiers are sent:
	// the server never takes the payment status or amount from the browser.
	async function updateBookingPayment(paymentRef: string) {
		const reconcileData = {
			id: booking.paymentId,
			bookingId: booking.bookingId,
			bookingRef: booking.bookingRef,
			paymentReference: paymentRef,
		};
		const notConfirmedMessage = `Your payment was received, but we couldn't confirm your booking automatically. Please don't pay again - contact us with booking reference ${booking.bookingRef}.`;
		try {
			const response = await fetch(endpoints.bookings.updatebookingpayment(booking.bookingId), {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reconcileData),
			});
			if (!response.ok) {
				console.error("Failed to confirm booking payment", response.status, await response.json().catch(() => null));
				setError(notConfirmedMessage);
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}
			navigation.replace(`/booking-confirmation?ref=${booking.bookingRef}&email=${data.primary.email}`);
		} catch (error) {
			console.error("Failed to confirm booking payment", error);
			setError(notConfirmedMessage);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} finally {
			setLoading(false);
		}
	}

	async function handleSubmit() {
		if (paymentCompleted) return;
		setLoading(true);
		if (!stripe || !elements || !clientSecret) {
			setLoading(false);
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setError(submitError.message);
			setLoading(false);
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
			elements: elements,
			redirect: "if_required",
			confirmParams: {
				return_url: `${window.location.origin}/booking-confirmation?ref=${booking.bookingRef}&email=${data.primary.email}`,
			},
		});

		if (paymentError) {
			setError(paymentError.message);
			setLoading(false);
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}
		if (paymentIntent.status === "succeeded") {
			setPaymentCompleted(true);
			await updateBookingPayment(paymentIntent.id);
		} else if (paymentIntent.status === "processing") {
			setPaymentCompleted(true);
			setError(`Your payment is being processed. Please don't pay again - we'll confirm booking ${booking.bookingRef} once it completes.`);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		setLoading(false);
	}

	return (
		<div className="w-full flex items-center flex-col gap-4">
			<BookNowCard className="sm:py-8 w-full max-w-xl ">
				<div className="w-full flex justify-center">
					<div className="md:pl-2 pl-0 w-full">
						<h2 className="text-2xl font-bold">Payment Details</h2>
						<h3 className="text-lg mb-6">
							You are about to pay{" "}
							<span className="text-primary font-semibold">
								A${decimalFormatter.format(booking.totalAmount)}
							</span>
						</h3>
						{error && (
							<div className="w-full bg-red-500/10 border border-red-500 p-4 rounded-sm text-sm flex items-center text-red-500 mb-4">
								<Icon.Warning className="inline mr-2" />
								{error}
							</div>
						)}
						{clientSecret && stripe && elements ? (
							<PaymentElement id="payment-element" />
						) : (
							<div className="w-full h-120 flex items-center justify-center rounded-sm border border-gray-200">
								<Loading />
							</div>
						)}

						<Button
							className="w-full text-base h-14 mt-4 rounded-sm"
							loading={loading}
							onClick={handleSubmit}
							disabled={!stripe || !elements || loading || paymentCompleted}
						>
							Pay Now
						</Button>
					</div>
				</div>
			</BookNowCard>
		</div>
	);
}

export default Stage3;
