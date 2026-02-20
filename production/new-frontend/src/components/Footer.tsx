import React from "react";
import Container from "./Container";
import Icon from "./Icon";
import Link from "next/link";
import { Button } from "./ui/button";

const navigations = [
	{ name: "Home", href: "/" },
	{ name: "FAQ", href: "/faq" },
	{ name: "About Us", href: "/about-us" },
	{ name: "Contact Us", href: "/contact-us" },
	{ name: "Travel Destinatons", href: "/trips" },
];

function Footer() {
	return (
		<footer className="w-full text-white">
			{/* <div className="bg-[url(/footer-cover.png)] bg-center bg-cover bg-no-repeat w-full min-h-[60vh]" /> */}
			<div className="w-full bg-[#00755d] py-20">
				<Container>
					<div className="w-full flex md:flex-row flex-col">
						<div className="md:w-4/10 w-full md:px-12 sm:px-8 px-0">
							<h3 className="text-4xl font-semibold">EscapeRoots</h3>
							<div className="mt-8">
								<h4 className="text-lg font-semibold">Find Your Next Adventure</h4>
								<p>Escape Roots newsletter is packed with inspiration for your next trip</p>
							</div>
							<div className="mt-4">
								<div className="grid grid-cols-2 gap-2">
									<input
										type="text"
										placeholder="First Name"
										className="bg-gray-200 text-gray-500 text-base px-4 py-2 border rounded-sm w-full"
									/>
									<input
										type="text"
										placeholder="Last Name"
										className="bg-gray-200 text-gray-500 text-base px-4 py-2 border rounded-sm w-full"
									/>
								</div>
								<input
									type="text"
									placeholder="Email Address"
									className="bg-gray-200 mt-2 text-gray-500 text-base px-4 py-2 border rounded-sm w-full"
								/>
								<p className="mt-4 mb-8">
									<small className="leading-4.5 inline-block">
										By entering your email, you agree to our{" "}
										<Link href={"/terms-and-conditions"} className="text-secondary hover:underline">
											Terms of Use
										</Link>{" "}
										and{" "}
										<Link href={"/privacy-policy"} className="text-secondary hover:underline">
											Privacy Policy
										</Link>
										, including receipt of email promotion.
									</small>
								</p>
								<Button variant={"secondary"} size={"xl"} className="w-full">
									Subscribe
								</Button>
							</div>
						</div>
						<div className="md:w-6/10 w-full flex flex-wrap md:px-12 sm:px-8 px-0 md:border-l border-gray-300/30">
							<div className="md:w-1/2 w-full flex flex-col items-center px-4 mt-8 md:mt-0 mb-12">
								<h4 className="text-secondary font-noraml text-2xl w-full">Contact Us</h4>
								<ul className="mt-4 w-full">
									<li className="flex items-center gap-2 mb-2 w-full">
										<Icon.Email className="text-2xl mr-2" />
										<a
											href="mailto:operations@escaperoots.com.au"
											className="text-lg lg:text-left hover:text-secondary"
										>
											operations@escaperoots.com.au
										</a>
									</li>
									<li className="flex items-center gap-2 w-full">
										<Icon.Phone className="text-2xl mr-2" />
										<a
											href="tel:+61884729866"
											className="text-lg lg:text-left hover:text-secondary"
										>
											+61 8 8472 9866
										</a>
									</li>
								</ul>
							</div>
							<div className="md:w-1/2 w-full flex flex-col items-center px-4 mt-8 md:mt-0 mb-12">
								<h4 className="text-secondary font-noraml text-2xl w-full">Quick Navigation</h4>
								<ul className="mt-4 w-full">
									{navigations.map((nav, idx) => (
										<li key={idx} className="flex items-center gap-2 w-full">
											<Link href={nav.href} className="text-lg w-full">
												{nav.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="w-full mt-8 md:mt-0 pt-12 md:border-t border-gray-300/30">
								<h4 className="text-secondary font-noraml text-2xl">Instagram Feed</h4>
								<div className="mt-4 md:h-[218px] w-full overflow-hidden">
									<iframe
										scrolling="no"
										src="https://cdn.lightwidget.com/widgets/62e0c8519a515758ba576ca5c707620c.html"
										className="lightwidget-widget w-full border-0 overflow-hidden"
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</footer>
	);
}

export default Footer;
