import Loading from "@/components/Loading";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { metadataDefault } from "@/lib/consts";

export const metadata: Metadata = {
	title: "Search Your Next Trip",
	description:
		"Find your perfect trip with our comprehensive search filters. Explore countries, destinations, experiences, themes, and styles to plan your next adventure.",
	keywords: metadataDefault.keywords,
	openGraph: metadataDefault.openGraph,
};

function layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Suspense
				fallback={
					<div className="w-full h-[80vh] flex items-center justify-center">
						<Loading />
					</div>
				}
			>
				{children}
			</Suspense>
		</>
	);
}

export default layout;
