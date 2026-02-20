"use client";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import Icon from "../Icon";

type DateRangePickerProps = {
	className?: string;
	placeholderClassName?: string;
	placeholder?: string;
	value?: DateRange;
	onChange?: (range: DateRange) => void;
	onChangeDateCount?: (count: number) => void;
	iconNeeded?: boolean;
	variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null;
	error?: string;
	disabledOn?: {
		before?: Date;
		after?: Date;
	};
};

export type DateRangePickerRef = {
	close: () => void;
	open: () => void;
	toggle: () => void;
	openState: boolean;
};

function DateRangePicker(
	{
		className,
		placeholderClassName,
		onChange,
		onChangeDateCount,
		placeholder,
		value,
		iconNeeded = true,
		variant,
		error,
		disabledOn,
	}: DateRangePickerProps,
	ref: React.ForwardedRef<DateRangePickerRef>
) {
	const [date, setDate] = React.useState<DateRange>({
		from: value?.from,
		to: value?.to,
	});
	const [open, setOpen] = React.useState(false);

	useImperativeHandle(
		ref,
		() => {
			return {
				close: () => {
					setOpen(false);
				},
				open: () => {
					setOpen(true);
				},
				toggle: () => {
					setOpen((prev) => !prev);
				},
				openState: open,
			};
		},
		[open]
	);

	function handleDateChange(range: DateRange | undefined) {
		if (range) {
			setDate(range);
			onChange?.(range);
			const from = range.from ? new Date(range.from) : undefined;
			const to = range.to ? new Date(range.to) : undefined;
			const count = from && to ? Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;
			onChangeDateCount?.(count);
		}
	}

	const formatted =
		date.from && date.to
			? `${format(date.from, "y LLL, dd")} - ${format(date.to, "y LLL, dd")}`
			: "Pick a date range";

	useEffect(() => {
		setDate({ from: value?.from, to: value?.to });
	}, [value]);

	return (
		<div className={cn("grid gap-2 relative", className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={variant}
						className={cn(
							"w-full h-12 rounded text-base justify-start text-left font-normal z-[99]",
							!date.from && "!text-muted-foreground",
							placeholderClassName,
							error ? "border-red-500 hover:bg-red-50 border" : "hover:bg-neutral-200"
						)}
						onClick={() => {
							setOpen(!open);
						}}
					>
						{iconNeeded && <CalendarIcon className="mr-2 h-4 w-4" />}
						{date.from && date.to ? formatted : placeholder ? placeholder : "Pick a date range"}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 relative" align="start">
					<Calendar
						autoFocus
						mode="range"
						selected={date}
						onSelect={handleDateChange}
						numberOfMonths={1}
						animate
						min={1}
						disabled={
							disabledOn
								? (disabledOn as any)
								: {
										before: new Date(),
								  }
						}
					/>
				</PopoverContent>
			</Popover>

			{date.from && date.to ? (
				<button
					className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-red-500 text-lg z-[100] p-2"
					onClick={() => {
						onChange?.({ from: undefined, to: undefined });
						onChangeDateCount?.(0);
						handleDateChange(undefined);
						setOpen(false);
						setDate({ from: undefined, to: undefined });
					}}
				>
					<Icon.Close />
				</button>
			) : null}
		</div>
	);
}

export default forwardRef(DateRangePicker);

type DatePickerProps = {
	className?: string;
	placeholderClassName?: string;
	placeholder?: string;
	value?: Date;
	onChange?: (range: Date | undefined) => void;
	iconNeeded?: boolean;
	variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null;
	error?: string;
	disabledOn?:
		| {
				before?: Date;
				after?: Date;
		  }
		| undefined;
};

export type DatePickerRef = DateRangePickerRef;

export const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
	(
		{ className, disabledOn, error, iconNeeded, onChange, placeholder, placeholderClassName, value, variant },
		ref
	) => {
		const [date, setDate] = React.useState<Date | undefined>(value);
		const [open, setOpen] = React.useState(false);
		useImperativeHandle(
			ref,
			() => {
				return {
					close: () => {
						setOpen(false);
					},
					open: () => {
						setOpen(true);
					},
					toggle: () => {
						setOpen((prev) => !prev);
					},
					openState: open,
				};
			},
			[open]
		);

		function handleDateChange(date: Date | undefined) {
			if (date) {
				setDate(date);
				onChange?.(date);
			}
		}
		const formatted = date ? format(date, "y LLL, dd") : "Pick a date";

		return (
			<div className={cn("grid gap-2 relative", className)}>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant={variant}
							className={cn(
								"w-full h-12 rounded text-base justify-start text-left font-normal",
								!date && "!text-muted-foreground",
								placeholderClassName,
								error ? "border-red-500 hover:bg-red-50 border" : "hover:bg-neutral-200"
							)}
							onClick={() => {
								setOpen(!open);
							}}
						>
							{iconNeeded && <CalendarIcon className="mr-2 h-4 w-4" />}
							{date ? formatted : placeholder ? placeholder : "Pick a date range"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							autoFocus
							mode="single"
							captionLayout="label"
							selected={date}
							onSelect={handleDateChange}
							numberOfMonths={1}
							animate
							disabled={
								disabledOn
									? (disabledOn as any)
									: {
											before: new Date(),
									  }
							}
						/>
					</PopoverContent>
				</Popover>

				{date ? (
					<button
						className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-red-500 text-lg z-[100] p-2"
						onClick={() => {
							onChange?.(undefined);
							handleDateChange(undefined);
							setOpen(false);
							setDate(undefined);
						}}
					>
						<Icon.Close />
					</button>
				) : null}
			</div>
		);
	}
);
