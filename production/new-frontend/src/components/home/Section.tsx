import React from "react";
import Container from "../Container";
import Carousel, { CarouselCardType } from "../Carousel";
import { cn } from "@/lib/utils";

type SectionProps = {
	list: CarouselCardType[];
	title: string;
	subtitle: string;
	description: React.ReactNode;
	className?: string;
	carouselPriceColor?: string;
};

function Section({ list, title, subtitle, description, className, carouselPriceColor }: SectionProps) {
	return (
		<section className={cn("relative", className)}>
			<Container containerClassName="md:px-4 px-0 md:-translate-y-20">
				<div className="w-full flex flex-col items-center">
					<div className="w-full flex flex-col items-center max-w-6xl bg-white rounded-t-3xl pt-12 z-10">
						<img
							src="/svg/flight-location-travel.svg"
							alt="Flight Travel Location"
							className="absolute right-0 top-4 lg:block hidden z-30"
						/>
						<span className="text-6xl text-center text-forth font-light font-allison px-4 md:px-0 z-30">
							{subtitle}
						</span>
						<h2 className="md:text-7xl text-6xl text-center font-dm-serif-display font-semibold px-4 md:px-0 z-30">
							{title}
						</h2>
						<p className="my-6 text-lg max-w-xl text-center px-4 md:px-0  z-30">{description}</p>
					</div>
				</div>
				<Carousel list={list} carouselPriceColor={carouselPriceColor} />
			</Container>
		</section>
	);
}

export default Section;
