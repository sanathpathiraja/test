import { cn } from "@/lib/utils";
import React from "react";

type BookNowCardProps = {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
};

function BookNowCard({ children, className }: BookNowCardProps) {
	return (
		<div className={cn("w-full sm:px-8 px-4 sm:py-12 py-8 my-6 bg-[#eaf8f0] rounded-lg", className)}>
			{children}
		</div>
	);
}

export default BookNowCard;
