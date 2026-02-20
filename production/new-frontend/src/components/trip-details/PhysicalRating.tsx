import { cn } from "@/lib/utils";
import React from "react";

/*
Rate 1 - Relaxing with minimal physical activity
Rate 2 - Some easy activities; no special fitness needed
Rate 3 - Moderate activities; requires good fitness
Rate 4 - Challenging activities; high fitness recommended
Rate 5 - Intense activities; extreme fitness required
*/

function PhysicalRating({ rating, className }: { rating: number; className?: string }) {
	const ratings: Record<string, { disable: string; color: string; label: string }> = {
		"1": {
			disable: "#8A8A8A",
			color: "#2E8B57",
			label: "Relaxing with minimal physical activity",
		},
		"2": {
			disable: "#A2A2A2",
			color: "#41AE71",
			label: "Some easy activities; no special fitness needed",
		},
		"3": {
			disable: "#B1B1B1",
			color: "#4AC37F",
			label: "Moderate activities; requires good fitness",
		},
		"4": {
			disable: "#C8C7C7",
			color: "#56DC90",
			label: "Challenging activities; high fitness recommended",
		},
		"5": {
			disable: "#D9D9D9",
			color: "#5FFAA2",
			label: "Intense activities; extreme fitness required",
		},
	};
	return (
		<>
			<div className={cn("w-full flex items-center rounded-md overflow-hidden", className)}>
				{Array.from({ length: 5 }, (_, index) => {
					const rate = index + 1;
					return (
						<div key={rate} className="flex items-center gap-2 w-1/5">
							<div
								className="w-full h-10 flex items-center justify-center"
								style={{
									backgroundColor:
										rating >= rate ? ratings[String(rate)].color : ratings[String(rate)].disable,
									color: "#fff",
								}}
							>
								{rate}
							</div>
							{/* <span className="text-sm">{ratings[rate].label}</span> */}
						</div>
					);
				})}
			</div>
			<div className="mt-4">
				<h5 className="text-base font-semibold">Check Your Rate</h5>
				<ul>
					{Object.entries(ratings).map(([key, value]) => (
						<li key={key} className="flex items-center gap-2">
							<span className="text-sm">
								Rate {key} - {value.label}
							</span>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default PhysicalRating;
