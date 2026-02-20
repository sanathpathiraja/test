import React from "react";
import Container from "@/components/Container";
import { Accordion } from "@/components/ui/accordion";
import { environment } from "@/lib/consts";

export const metadata = {
	title: "FAQ",
	description: "Frequently Asked Questions about Escape Roots.",
	openGraph: {
		title: "FAQ - Escape Roots",
		description: "Find answers to common questions about our travel services.",
		url: "https://escaperoots.com.au/faq",
		images: [`${environment.BASE_URL}/faq-hero.png`],
	},
};

function page() {
	const faqs: { title: string; details: string }[] = [
		{
			title: "How do I book a trip with EscapeRoots?",
			details:
				"Booking your trip can be done by just swiping through our website and completing the inquiry form, we ensure to keep your personal details secure throughout your stay with us, or you can always reach us through email or directly through phone call. Our experts will help create and adventure curated to your preferences within no time!",
		},
		{
			title: "What types of travel experiences do you offer?",
			details:
				"We strive to provide you travel experiences to peak your desires for adventure, cultural immersions and reputed hotel accommodations all customed to suit the itinerary you were looking for when you clicked on Escaperoots. ",
		},
		{
			title: "How FAR IN ADVANCE SHOULD I BOOK MY TRIP?",
			details:
				"We would advise you to start on that bucket list as early as possible, what better time than now? Completing the booking process at a bare minimum to 02-03 months in prior would help us design the trip of your dreams. But if you want to just shut the world out and get away right now, we would often be able to curate to your desires at the last minute as well.",
		},
		{
			title: "ARE YOUR TRAVEL EXPERIENCES SUITABLE FOR FAMILIES?",
			details:
				"We love designing trips to give you the joy of making memories together. Ensuring the availability of experiences for each family member and activities that are family friendly, to also ensuring accommodation for every member are some of the measures we take to give you and your family the ultimate experience.",
		},
		{
			title: "CAN I MAKE CHANGES TO MY ITINERARY AFTER BOOKING?",
			details:
				"We are able to comprehend that plans do change at times and your need might change regarding your destinations. Given prior notice we will strive our best to get you the requested changes to your itinerary based on availability and keep you on the loop for any additional charges that may apply in order for you to decide.",
		},
		{
			title: "HOW DO YOU ENSURE THE SAFETY OF YOUR TRAVELERS?",
			details:
				"We make your safety our most important task when creating your booking, our partnership with trusted local seasoned guides and accommodation providers to ensure your peace of mind while traveling to and from your destinations.",
		},
		{
			title: "WHAT IS YOUR CANCELLATION POLICY?",
			details:
				"Policies for cancellation of bookings may differ based on the specifics of your booking and our providers involved. Cancellations made within a reasonable time frame before departure may incur certain costs. For further guidelines we recommend reviewing our Cancellation Policy before lodging your booking with us.",
		},
		{
			title: "DO YOU OFFER GROUP TRAVEL OPTIONS?",
			details:
				"Yes! We are all in for you to travel with your mates, we provide custom itineraries for corporate trips, special occasions and family get-togethers. Make sure to give us the necessary details and we’ll have you guys in amazing destinations in no time!",
		},
		{
			title: "CAN YOU ACCOMMODATE DIETARY RESTRICTIONS OR SPECIAL REQUESTS?",
			details:
				"Of course! We work with partners that value the needs of customers staying with them. Give us the details of your requirements and we will ensure that your needs are prioritized with utmost discretion.",
		},
		{
			title: "HOW DO I CONTACT CUSTOMER SERVICES?",
			details:
				"Reach our customer support team via email at sales@escaperoots.com.au or by phone at 048 717 4899. We’re available Monday through Friday, from 9 AM to 6 PM (GMT+9:30). For urgent inquiries, please contact us directly.",
		},
	];
	return (
		<main>
			<div className="w-full h-screen overflow-hidden bg-[url(/faq-hero.png)] bg-cover bg-center bg-no-repeat flex justify-center items-center">
				<div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b -z-0 from-[#0b4525d3] to-[#66666600]" />
				<div className="text-white z-10 flex flex-col items-center">
					<h1 className="text-7xl font-bold font-dm-serif-display mb-4 w-full text-center">FAQs</h1>
					{/* <h2 className="sm:text-3xl text-xl font-thin mt-8 pb-6 w-full border-b border-gray-200 px-2">
						Explorer Our Trips
					</h2> */}
				</div>
			</div>
			<Container className="pb-32 -translate-y-28 flex flex-col items-center" containerClassName="md:px-4 px-2">
				<div className="w-full flex flex-col items-center pt-12 bg-white rounded-t-2xl max-w-6xl">
					<span className="text-6xl text-center text-forth font-light font-allison px-4 md:px-0 z-30">
						Common inquiries
					</span>
					<h2 className="md:text-7xl sm:text-6xl text-5xl text-center font-dm-serif-display font-semibold px-4 md:px-0 z-30">
						Clear and concise answers to
					</h2>
				</div>
				<div className="w-full flex justify-center">
					<div className="w-full py-12 max-w-4xl flex flex-col gap-4">
						{faqs.map((faq, index) => (
							<Accordion key={index} title={faq.title} details={faq.details} />
						))}
					</div>
				</div>
			</Container>
		</main>
	);
}

export default page;
