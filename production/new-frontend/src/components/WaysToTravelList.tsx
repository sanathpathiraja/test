import React from "react";
import TripListPage, { TrupListPageProps } from "./TripListPage";
import { DetailsPageType, TripListType, TripRecordType } from "@/lib/types";
import Container from "./Container";
import PageHeader from "./PageHeader";

type WaysToTravelListProps = TrupListPageProps & {
	details: DetailsPageType;
	img: string;
	list: TripListType<TripRecordType>;
	goUp: boolean;
};

async function WaysToTravelList({ details, img, list, goUp }: WaysToTravelListProps) {
	return (
		<div className="relative">
			<PageHeader details={details} img={img} />
			<Container className="" containerClassName="sm:px-4 px-0 bg-white">
				<TripListPage list={list} goUp={goUp} />
			</Container>
		</div>
	);
}

export default WaysToTravelList;
