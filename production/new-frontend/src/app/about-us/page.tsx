import React from "react";
import Container from "@/components/Container";
import { environment } from "@/lib/consts";

export const metadata = {
	title: "About Us",
	description: "Learn more about our company and values at Escape Roots.",
	openGraph: {
		title: "About Us - Escape Roots",
		description: "Discover the mission and vision behind Escape Roots.",
		url: "https://escaperoots.com.au/about-us",
		images: [`${environment.BASE_URL}/about-us-hero.png`],
	},
};

type ServiceType = {
	title: string;
	description: React.ReactNode;
	icon: string;
};

type ServiceCardProps = {
	service: ServiceType;
};

function ServiceCard({ service }: ServiceCardProps) {
	return (
		<div className="w-full sm:min-h-90 min-h-80 px-4 py-8 flex flex-col items-center justify-center bg-white rounded-md ">
			<div className="mb-2">
				<img src={service.icon} alt={service.title} className="w-10 h-10 object-contain" />
			</div>
			<h4 className="sm:text-xl text-lg font-semibold text-center leading-[1.1]">{service.title}</h4>
			<div className="text-gray-600 text-center mt-2 sm:text-sm text-xs">{service.description}</div>
		</div>
	);
}

function page() {
	const services: ServiceType[] = [
		{
			title: "Travel Planning Consultation",
			description: "Expert guidance on destinations, routes, and personalized itineraries.",
			icon: "/svg/chat.svg",
		},
		{
			title: "Booking and Reservations",
			description: "We manage flights, accommodations, transportation, and curated activities.",
			icon: "/svg/booking.svg",
		},
		{
			title: "Customized Travel Packages",
			description: (
				<div>
					<p className="w-full text-left pl-2">Tailored experiences, including:</p>
					<ul className="list-disc sm:pl-6 pl-4 mt-2 text-left">
						<li>
							<strong>Adventure Tours</strong> – Safaris, hiking, and outdoor expeditions
						</li>
						<li>
							<strong>Cultural Experiences</strong> – Immersive local traditions and heritage
						</li>
						<li>
							<strong>Wellness Retreats</strong> – Relaxation and rejuvenation in stunning locations
						</li>
					</ul>
				</div>
			),
			icon: "/svg/travel-package.svg",
		},
		{
			title: "Visa and Travel Documentation Assistance",
			description: "Support with visa applications and essential travel documents.",
			icon: "/svg/travel-doc.svg",
		},
		{
			title: "Travel Insurance Coordination",
			description: "Guidance on choosing the right coverage for medical emergencies, cancellations, and more.",
			icon: "/svg/travel-insurance.svg",
		},
		{
			title: "Group and Corporate Travel",
			description: "Custom solutions for group trips, corporate retreats, and team-building experiences.",
			icon: "/svg/group-travel.svg",
		},
		{
			title: "On-Trip Support and Emergency Assistance",
			description: "24/7 assistance for itinerary changes, bookings, and unexpected issues.",
			icon: "/svg/assistance.svg",
		},
		{
			title: "Specialized Services",
			description: (
				<div>
					<p className="w-full text-left pl-2">Exclusive offerings such as:</p>
					<ul className="list-disc sm:pl-6 pl-4 mt-2 text-left">
						<li>
							<strong>Luxury Travel</strong> – Private villas, premium tours, and VIP experiences
						</li>
						<li>
							<strong>Honeymoon Getaways</strong> – Romantic escapes designed for couples
						</li>
						<li>
							<strong>Sustainable Travel</strong> – Eco-friendly journeys supporting conservation and
							communities
						</li>
					</ul>
				</div>
			),
			icon: "/svg/special-service.svg",
		},
	];
	return (
		<main className="w-full">
			<div className="w-full h-screen overflow-hidden bg-[url(/about-us-hero.png)] bg-cover bg-center bg-no-repeat flex justify-center items-center">
				<div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b -z-0 from-[#0b4525d3] to-[#66666600]" />
				<div className="text-white z-10 flex flex-col items-center">
					<h1 className="text-7xl font-bold font-dm-serif-display mb-4 w-full text-center">Why Us?</h1>
					{/* <h2 className="sm:text-3xl text-xl font-thin mt-8 pb-6 w-full border-b border-gray-200 px-2">
						Explorer Our Trips
					</h2> */}
				</div>
			</div>
			<Container containerClassName="md:px-4 px-2 -translate-y-28" className="flex flex-col items-center">
				<div className="w-full flex flex-col items-center">
					<div className="w-full flex flex-col items-center max-w-6xl bg-white rounded-t-3xl pt-12 z-10">
						<span className="text-6xl text-center text-forth font-light font-allison px-4 md:px-0 z-30">
							Discover Your
						</span>
						<h2 className="md:text-7xl text-6xl text-center font-dm-serif-display font-semibold px-4 md:px-0 z-30">
							Next Adventure with Us
						</h2>
						<p className="my-6 text-lg max-w-2xl text-center px-4 md:px-0  z-30">
							Escape Roots is a zestful startup company founded in 2024, our unwavering focus and
							aspiration to customize every venture, to give your mind the sense of taking long slow
							relaxing breaths, at destinations you can only find beyond the usual tourist path. Well
							equipped with proficient local professionals, knowledgeable of the best-kept hidden views
							and customs of each locale, we take an oath to help you bring a keepsake of yourself you
							never knew existed.
						</p>
					</div>
				</div>
				{/* mission and vission */}
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full max-w-4xl mt-8 md:px-0 px-4">
					<div className="w-full flex flex-col items-end md:p-8 p-4 rounded-xl bg-[#F8F8F8]">
						<div className="w-full flex items-center md:justify-end gap-2">
							<h3 className="text-2xl font-semibold text-primary">Mission</h3>
							<img src="/svg/arrow-bulls-eye.svg" alt="Mission Icon" className="w-6 h-8" />
						</div>
						<p className="mt-4 text-base tracking-wider md:text-right leading-[200%]">
							At ESCAPE ROOTS, we redefine travel by blending relaxation with adventure through authentic,
							immersive experiences. Our dedicated team curates journeys beyond the typical tourist trail,
							fostering deeper connections with local cultures, traditions, and landscapes. We champion
							sustainable travel, inspiring meaningful and memorable explorations.
						</p>
					</div>
					<div className="w-full flex flex-col items-start md:p-8 p-4 rounded-xl bg-[#F8F8F8]">
						<div className="w-full flex items-center justify-start gap-2">
							<img src="/svg/vision.svg" alt="Vision Icon" className="w-6 h-8" />
							<h3 className="text-2xl font-semibold text-primary">Vision</h3>
						</div>
						<p className="mt-4 text-base tracking-wider text-left leading-[200%]">
							ESCAPE ROOTS envisions a world where every journey fosters deeper connections through
							immersive experiences and transformative memories. We create escapes that lead to a renewed
							sense of belonging, rooted in the beauty and diversity of each destination.
						</p>
					</div>
				</div>
				{/* what we offer */}
			</Container>
			<div className="w-full bg-[#2E8B570F] py-12 mt-8">
				<Container className="flex flex-col items-center">
					<div className="w-full flex flex-col items-center">
						<span className="text-6xl text-center text-forth font-light font-allison px-4 md:px-0 z-30">
							Our Services
						</span>
						<h2 className="md:text-7xl text-6xl text-center font-dm-serif-display font-semibold px-4 md:px-0 z-30">
							What We Offer
						</h2>
						<p className="text-lg mt-2">Comprehensive Travel Solutions for Your Next Adventure</p>
					</div>
					<div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 py-16">
						{services.map((service, index) => (
							<ServiceCard key={index} service={service} />
						))}
					</div>
					<div className="w-full py-12">
						<p className="text-primary font-allison text-6xl w-full text-center">
							Let’s plan your next adventure. Contact Escape Roots today.
						</p>
					</div>
				</Container>
			</div>
		</main>
	);
}

export default page;
