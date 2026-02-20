import { cn } from "@/lib/utils";
import React from "react";

function Container({
	children,
	className,
	containerClassName,
}: {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
	containerClassName?: string;
}) {
	return (
		<div className={cn("w-full h-full flex justify-center relative px-4", containerClassName)}>
			<div className={cn("max-w-7xl w-full", className)}>{children}</div>
		</div>
	);
}

export default Container;
