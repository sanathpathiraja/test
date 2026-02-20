"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import Icon from "@/components/Icon";

function page() {
	const navigation = useRouter();
	const searchParams = useSearchParams();
	const ref = searchParams.get("ref");
	const email = searchParams.get("email");

	if (!ref || !email) {
		return navigation.replace("/404");
	}

	return (
		<Container>
			<div className="max-w-3xl pt-[10vh] mx-auto px-4 py-8 flex flex-col items-center justify-center gap-4 h-[80vh] text-center">
				<Icon.Completed className="w-20 h-20 text-primary mb-4" />
				<h1 className="sm:text-4xl text-3xl text-primary font-bold">Your Payment was Successful</h1>
				<p className="text-base">
					Thank you for your payment. Your booking is confirmed. You can get more details via below link. And
					also you will receive a confirmation email shortly.
				</p>
				<div className="mt-6">
					<p className="text-base">Booking Reference</p>
					<h3 className="text-2xl font-bold">{ref}</h3>
				</div>
				<Link
					href={`/booking-detail?ref=${ref}&email=${email}`}
					className="mt-8 py-3 px-8 bg-primary rounded-sm hover:bg-primary/50 text-white text-base"
				>
					View Details
				</Link>
			</div>
		</Container>
	);
}

export default page;
