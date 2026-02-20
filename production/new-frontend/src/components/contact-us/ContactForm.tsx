"use client";
import React, { useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { Input } from "../ui/input";
import SelectInput, { SelectOptionType } from "../ui/SelectInput";
import DateRangePicker, { DateRangePickerRef } from "../ui/date-picker";
import { Button } from "../ui/button";
import Icon from "../Icon";
import { Textarea } from "../ui/textarea";
import { differenceInDays, format } from "date-fns";
import { ResponseType } from "@/lib/types";
import { endpoints } from "@/lib/consts";
import { DateRange } from "react-day-picker";

function toMidnightUTC(date: Date): Date {
	const normalized = new Date(date);
	normalized.setHours(0, 0, 0, 0);
	return normalized;
}

function addDays(date: Date, days: number): Date {
	const result = new Date(date); // clone
	result.setDate(result.getDate() + days);
	return result;
}

const today = toMidnightUTC(new Date());
const minStartDate = addDays(today, 14);
const maxDate = addDays(today, 360);
const minEndDate = addDays(today, 17);

const contactUsSchema = Yup.object().shape({
	fullName: Yup.string()
		.required("Full Name is required")
		.min(2, "Must be at least 2 characters")
		.max(255, "Must be at most 255 characters")
		.test("no-leading-whitespace", "Cannot start with whitespace", (val) =>
			typeof val === "string" ? val.trimStart() === val : true
		),

	email: Yup.string()
		.required("Email is required")
		.email("Invalid email")
		.max(255)
		.test("no-leading-whitespace", "Cannot start with whitespace", (val) =>
			typeof val === "string" ? val.trimStart() === val : true
		),

	contactNo: Yup.string()
		.required("Contact number is required")
		.min(9, "Minimum 9 digits")
		.max(15, "Maximum 15 digits")
		.matches(/^\+?\d+$/, "Must be a valid phone number")
		.test("no-leading-whitespace", "Cannot start with whitespace", (val) =>
			typeof val === "string" ? val.trimStart() === val : true
		),

	country: Yup.string().required("Country is required").min(2, "Invalid country selection"),

	message: Yup.string()
		.required("Message is required")
		.min(10, "Minimum 10 characters")
		.max(4000, "Maximum 4000 characters")
		.test("no-leading-whitespace", "Cannot start with whitespace", (val) =>
			typeof val === "string" ? val.trimStart() === val : true
		),

	paxCount: Yup.number().required("No. of Pax is required").min(1, "Minimum 1 pax"),
});

const initialValues = {
	fullName: "",
	email: "",
	contactNo: "",
	country: "",
	message: "",
	paxCount: "",
};

function ContactForm() {
	const datePickerRef = useRef<DateRangePickerRef>(null);
	const [countryList, setCountryList] = React.useState<SelectOptionType[]>([]);
	const [selectedCountry, setSelectedCountry] = React.useState<SelectOptionType | null>(null);
	const [startDate, setStartDate] = React.useState<Date | null>(null);
	const [endDate, setEndDate] = React.useState<Date | null>(null);
	const [hasDateError, setHasDateError] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [submissionError, setSubmissionError] = React.useState<string | null>(null);
	const [submissionSuccess, setSubmissionSuccess] = React.useState<boolean>(false);

	function hasError<T>(error: T): boolean {
		return error !== undefined && error !== null && error !== "";
	}

	async function handleSubmit(values: typeof initialValues, helpers: FormikHelpers<typeof initialValues>) {
		setHasDateError(!Boolean(startDate && endDate));
		if (!startDate || !endDate || differenceInDays(endDate, startDate) < 2) return;

		setLoading(true);
		setSubmissionError(null);
		setSubmissionSuccess(false);

		try {
			const response = await fetch(endpoints.clientInquiry, {
				method: "POST",
				body: JSON.stringify({
					fullName: values.fullName,
					email: values.email,
					contactNo: values.contactNo,
					country: values.country,
					message: values.message,
					paxCount: values.paxCount,
					preferredStartDate: format(startDate, "yyyy-MM-dd"),
					preferredEndDate: format(endDate, "yyyy-MM-dd"),
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (!response.ok || !data.isSuccess) {
				// Handle backend validation errors
				const validationErrors = data?.problemDetails?.validationErrors || {};
				if (Object.keys(validationErrors).length > 0) {
					// Map backend errors to Formik
					const formikErrors: Partial<typeof initialValues> = {};
					for (const key in validationErrors) {
						if (validationErrors.hasOwnProperty(key)) {
							formikErrors[key as keyof typeof initialValues] = validationErrors[key].join(" ");
						}
					}
					helpers.setErrors(formikErrors);
					setSubmissionError("Please review the form errors and try again.");
				} else {
					setSubmissionError(data?.message || "Submission failed.");
				}
			} else if (data.isSuccess) {
				setSubmissionSuccess(true);
				helpers.resetForm();
				setSelectedCountry(null);
				setStartDate(null);
				setEndDate(null);
			} else {
				setSubmissionError(data?.message || "Submission failed.");
			}
		} catch (error) {
			console.error("Submission error:", error);
			setSubmissionError("An unexpected error occurred.");
		}
		setLoading(false);
	}

	async function loadCountries() {
		try {
			const response = await fetch(endpoints.common.countryList);
			if (!response.ok) {
				throw new Error("Failed to fetch trip filters");
			}
			const data = (await response.json()) as ResponseType<{ name: string; id: string }[]>;
			setCountryList(
				data.data
					.map((country) => ({ label: country.name, value: country.id }))
					.sort((a, b) => a.label.localeCompare(b.label))
			);
		} catch (error) {
			console.error("Error fetching trip filters:", error);
		}
	}

	useEffect(() => {
		loadCountries();
	}, []);

	return (
		<Formik initialValues={initialValues} validationSchema={contactUsSchema} onSubmit={handleSubmit}>
			{({ errors, values, handleChange, handleSubmit }) => (
				<div className="flex flex-col gap-4 mt-8">
					{submissionError && (
						<div className="text-red-500 text-sm w-full mt-1 px-4 py-4 rounded-sm border-red-500 border bg-red-500/10">
							{submissionError}
						</div>
					)}
					{submissionSuccess && (
						<div className="text-green-500 text-sm w-full mt-1 px-4 py-4 rounded-sm border-green-500 border bg-green-500/10">
							Thank you for your inquiry! We will get back to you shortly.
						</div>
					)}
					<div className="grid sm:gap-2 gap-4 sm:grid-cols-2 grid-cols-1">
						<div>
							<Input
								placeholder="Full Name"
								className="w-full h-12 bg-white !text-sm"
								onChange={handleChange("fullName")}
								value={values.fullName}
								error={hasError(errors.fullName) ? errors.fullName : undefined}
							/>
						</div>
						<div>
							<Input
								placeholder="Email"
								type="email"
								className="w-full h-12 bg-white !text-sm"
								onChange={handleChange("email")}
								value={values.email}
								error={hasError(errors.email) ? errors.email : undefined}
							/>
						</div>
					</div>
					<div className="grid sm:gap-2 gap-4 sm:grid-cols-2 grid-cols-1">
						<div>
							<Input
								placeholder="Contact Number"
								className="w-full h-12 bg-white !text-sm"
								onChange={handleChange("contactNo")}
								value={values.contactNo}
								error={hasError(errors.contactNo) ? errors.contactNo : undefined}
							/>
						</div>
						<div>
							<SelectInput
								placeholder="Country"
								className="w-full h-12 bg-white !text-sm"
								list={countryList}
								value={selectedCountry}
								onChange={(setCountry) => {
									setSelectedCountry(setCountry);
									if (setCountry) {
										handleChange("country")(setCountry.value);
									}
								}}
								error={hasError(errors.country) ? errors.country : undefined}
							/>
						</div>
					</div>
					<div>
						<div className="w-full full flex flex-wrap items-center justify-between">
							<DateRangePicker
								ref={datePickerRef}
								value={{ from: startDate, to: endDate } as DateRange}
								className="w-[calc(100%-4rem)]"
								placeholderClassName="rounded-md bg-white hover:bg-neutral-200 text-black h-12 !text-sm"
								iconNeeded={false}
								disabledOn={{
									before: addDays(minStartDate, 1),
								}}
								onChange={(range) => {
									setStartDate(range?.from || null);
									setEndDate(range?.to || null);
									setHasDateError(!Boolean(range?.from && range?.to));
								}}
								error={
									hasDateError
										? !startDate || !endDate || differenceInDays(endDate, startDate) < 3
											? "Invalid date range"
											: undefined
										: undefined
								}
							/>
							<Button
								variant={"secondary"}
								className="h-12 w-12 rounded-md text-white flex items-center justify-center ml-4"
								onClick={datePickerRef.current?.open}
							>
								<Icon.Calendar className="!h-5 !w-5" />
							</Button>
							{hasDateError ? (
								<div className="w-full">
									<p className="text-red-500 text-xs mt-1 px-2">
										{differenceInDays(endDate!, startDate!) < 3
											? "Please select more than 2 days."
											: "Invalid date range."}
									</p>
								</div>
							) : undefined}
						</div>
					</div>
					<div>
						<Input
							placeholder="No Of Pax"
							className="w-full h-12 bg-white !text-sm"
							type="number"
							onChange={handleChange("paxCount")}
							value={values.paxCount}
							error={hasError(errors.paxCount) ? errors.paxCount : undefined}
						/>
					</div>
					<div>
						<Textarea
							placeholder="Message"
							className="w-full bg-white !text-sm"
							rows={6}
							onChange={handleChange("message")}
							value={values.message}
							error={hasError(errors.message) ? errors.message : undefined}
						/>
					</div>
					<div className="py-2">
						<Button
							type="submit"
							variant={"default"}
							size={"xl"}
							className="w-full"
							onClick={() => {
								setHasDateError(!Boolean(startDate && endDate));
								handleSubmit();
							}}
							disabled={hasDateError || Object.keys(errors).length > 0 || loading}
							loading={loading}
						>
							Send
						</Button>
					</div>
				</div>
			)}
		</Formik>
	);
}

export default ContactForm;
