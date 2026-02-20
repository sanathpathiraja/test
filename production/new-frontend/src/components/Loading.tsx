import { cn } from "@/lib/utils";
import React from "react";

type LoadingProps = {
	height?: string | number;
	width?: string | number;
	bgColor?: string;
	gap?: string;
	lineDifference?: number;
	className?: string;
};

function Loading({
	className,
	height = 40,
	width = 4,
	bgColor = "bg-primary",
	gap = "gap-1",
	lineDifference = 8,
}: LoadingProps) {
	return (
		<div className={cn("relative", className)}>
			<div className={cn("relative flex items-end", gap)}>
				<span
					className={cn("w-1 rounded-full animate-bounce", bgColor)}
					style={{ height: height, width: width }}
				></span>
				<span
					className={cn("w-1 rounded-full -translate-y-1 animate-bounce delay-200", bgColor)}
					style={{ height: `calc(${height}px + ${lineDifference}px)`, width: width }}
				></span>
				<span
					className={cn("w-1 rounded-full -translate-y-2 animate-bounce delay-400", bgColor)}
					style={{ height: height, width: width }}
				></span>
				<span
					className={cn("w-1 rounded-full -translate-y-2 animate-bounce delay-600", bgColor)}
					style={{ height: `calc(${height}px + ${lineDifference}px)`, width: width }}
				></span>
				<span
					className={cn("w-1 rounded-full -translate-y-1 animate-bounce delay-800", bgColor)}
					style={{ height: height, width: width }}
				></span>
				<span
					className={cn("w-1 rounded-full animate-bounce delay-1000", bgColor)}
					style={{ height: height, width: width }}
				></span>
			</div>
		</div>
	);
}

export default Loading;
