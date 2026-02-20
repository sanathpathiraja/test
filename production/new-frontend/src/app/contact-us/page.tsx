import React from "react";
import ContactForm from "@/components/contact-us/ContactForm";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import { environment } from "@/lib/consts";

export const metadata = {
	title: "Contact Us",
	description: "Get in touch with Escape Roots for your travel inquiries.",
	openGraph: {
		title: "Contact Us - Escape Roots",
		description: "Reach out to us for personalized travel planning and inquiries.",
		url: "https://escaperoots.com.au/contact-us",
		images: [`${environment.BASE_URL}/contact-us-hero.png`],
	},
};

function page() {
	return (
		<main>
			<div className="w-full h-[70vh] overflow-hidden bg-[url(/contact-us-hero.png)] bg-cover bg-center bg-no-repeat flex justify-center items-center">
				<div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b -z-0 from-[#0b4525d3] to-[#66666600]" />
				<div className="text-white z-10 flex flex-col items-center">
					<h1 className="md:text-7xl sm:text-6xl text-5xl font-bold font-dm-serif-display mb-4 w-full text-center px-2">
						Contact Us
					</h1>
					{/* <h2 className="sm:text-3xl text-xl font-thin mt-8 pb-6 w-full border-b border-gray-200 px-2">
						Explorer Our Trips
					</h2> */}
				</div>
			</div>
			<Container className="pb-16 -translate-y-32" containerClassName="md:px-4 px-2">
				<div className="w-full flex justify-center">
					<div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-lg md:min-h-[80vh] h-full flex md:flex-row flex-col">
						<div className="md:w-1/2 w-full md:min-h-[80vh] h-full md:px-12 px-6 md:py-0 py-12 flex flex-col justify-center">
							<div className="w-full flex flex-col items-center">
								<span className="text-6xl text-left text-forth font-light font-allison px-4 md:px-0 z-30 w-full">
									Ready to Escape?
								</span>
								<h2 className="md:text-6xl text-5xl text-left font-dm-serif-display font-semibold px-4 md:px-0 z-30 w-full">
									Let's Make
									<br />
									It Happen!
								</h2>
								<p className="mt-4 text-base">
									Got a dream trip in mind? Whether it’s a wild adventure, a serene getaway, or
									something totally unique, we’re here to craft it just for you. Reach out, and let’s
									start planning your next journey!
								</p>
							</div>
							<div className="mt-8">
								<h3 className="text-2xl font-semibold">Reach us on</h3>
								<ul className="mt-4">
									<li className="flex gap-4 items-center">
										<Icon.Phone className="text-lg text-forth" />
										<a href="tel:0487174899">+61 8 8472 9866</a>
									</li>
									<li className="flex gap-4 items-center">
										<Icon.Email className="text-lg text-forth" />
										<a href="mailto:operations@escaperoots.com.au">operations@escaperoots.com.au</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="md:w-1/2 w-full min-h-[80vh] bg-[#2E8B5729] md:px-10 sm:px-8 px-6 flex flex-col justify-center py-8">
							<div>
								<div>
									<h3 className="text-3xl font-semibold">Fill in and Reach us</h3>
									<p className="mt-3 text-base font-normal leading-5">
										Please fill out the inquiry form below, and our travel experts will contact you
										shortly to assist with your tour planning.
									</p>
								</div>
								<ContactForm />
							</div>
						</div>
					</div>
				</div>
			</Container>
		</main>
	);
}

export default page;
