import React, { useEffect } from "react";
import { addDays } from "date-fns";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import BookNowCard from "./BookNowCard";
import { DatePickerRef } from "@/components/ui/date-picker";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "../ui/button";
import Icon from "../Icon";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import SelectInput, { SelectOptionType } from "../ui/SelectInput";
import { Input } from "../ui/input";
import { BookingDetailsType, BookingPersonType, ResponseType, TripType } from "@/lib/types";
import { endpoints } from "@/lib/consts";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import PrivacyPolicy from "../PrivacyPolicy";
import { Tooltip } from "../ui/tooltip";
import TermsAndConditions from "../TermsAndConditions";

const decimalFormatter = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

type ValidatorReturnType = string | null;

const validators = {
	travelerType: (value: string, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (value === "adult" || value === "child") {
			return null;
		}
		return "Invalid traveler type";
	},
	gender: (value: string, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (value === "male" || value === "female" || value === "other") {
			return null;
		}
		return "Gender type required";
	},
	fullName: (value: string, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (value.trim() === "") {
			return "Full name is required";
		}
		// name only allows letters, spaces, and hyphens
		const nameRegex = /^[a-zA-Z\s-]+$/;
		if (!nameRegex.test(value)) {
			return "Invalid name format";
		}
		return null;
	},
	email: (value: string, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (value.trim() === "") {
			return "Email is required";
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			return "Invalid email format";
		}
		return null;
	},
	contactNumber: (value: string, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (value.trim() === "") {
			return "Contact number is required";
		}
		const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
		if (!phoneRegex.test(value)) {
			return "Invalid contact number format";
		}
		return null;
	},
	country: (
		value: SelectOptionType | null,
		countryList: SelectOptionType[],
		changed: boolean
	): ValidatorReturnType => {
		if (!changed) return null;
		if (!value || !value.value) {
			return "Country is required";
		}
		if (!countryList.some((country) => country.value === value.value)) {
			return "Invalid country selected";
		}
		return null;
	},
	passportNumber: (value: string, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (value.trim() === "") {
			return "Passport number is required";
		}
		const passportRegex = /^[A-Z0-9]{6,10}$/; // Example regex for passport numbers
		if (!passportRegex.test(value)) {
			return "Invalid passport number format";
		}
		return null;
	},
	passportExpiry: (value: Date | undefined, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (!value) {
			return "Passport expiry date is required";
		}
		if (value < addDays(new Date(), 15)) {
			return "Passport expiry date must be at least 15 days from today";
		}
		return null;
	},
	agreement: (value: boolean, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (value) return null;
		return "You must agree to the terms and conditions";
	},
	preferredDate: (value: Date | undefined, changed: boolean): ValidatorReturnType => {
		if (!changed) return null;
		if (!value) {
			return "Preferred date is required";
		}
		if (value < addDays(new Date(), 14)) {
			return "Preferred date must be at least 14 days from today";
		}
		return null;
	},
};

function ErrorMsg({ message }: { message: string | null }) {
	if (!message) return null;
	return <small className="text-red-500 text-sm mt-1">{message}</small>;
}

type SecondaryTravelerProps = {
	data: BookingDetailsType;
	setData: React.Dispatch<React.SetStateAction<BookingDetailsType>>;
	countries: SelectOptionType[];
	genderOptions: SelectOptionType[];
	id: number;
};

function SecondaryTraveler({ data, setData, countries, genderOptions, id }: SecondaryTravelerProps) {
	const travelerData = data.secondary[id];

	const [changed, setChanged] = React.useState(false);

	function removeTraveler() {
		setData((prev) => ({
			...prev,
			secondary: prev.secondary.filter((traveler, index) => index !== id),
		}));
	}

	return (
		<BookNowCard className="relative">
			<h2 className="text-2xl font-bold">{id + 1}. Secondary Traveler</h2>
			<Tooltip label="Remove Traveler" className="absolute top-4 right-4">
				<button
					onClick={removeTraveler}
					className="p-2 bg-red-500 border-2 border-red-500 text-white rounded-md hover:bg-white hover:text-red-500 transition-colors duration-150"
				>
					<Icon.Trash className="!h-5 !w-5" />
				</button>
			</Tooltip>
			<div className="w-full flex md:flex-row flex-col md:gap-0 gap-4">
				<div className="md:w-1/2 w-full md:border-r md:px-0 sm:px-4 px-0">
					<h3 className="text-lg font-semibold mb-4">Personal Details</h3>
					{/* select traveler type */}
					<div className="flex gap-16 items-center">
						<label className="text-base font-light">Adult / Child</label>
						<RadioGroup
							onValueChange={(value) => {
								setChanged(true);
								setData((prev) => ({
									...prev,
									secondary: prev.secondary.map((traveler, index) => {
										if (index === id) {
											return {
												...traveler,
												travelerType: value as "adult" | "child",
											};
										}
										return traveler;
									}),
								}));
							}}
						>
							<div className="flex gap-4">
								<label className="text-sm cursor-pointer">
									<RadioGroupItem
										value="adult"
										className="mr-2 "
										checked={data.secondary[id].travelerType === "adult"}
									/>
									Adult
								</label>
								<label className="text-sm cursor-pointer">
									<RadioGroupItem
										value="child"
										className="mr-2"
										checked={data.secondary[id].travelerType === "child"}
									/>
									Child
								</label>
							</div>
						</RadioGroup>
						<ErrorMsg message={validators.travelerType(travelerData.travelerType, changed)} />
					</div>
					{/* select gender */}
					<div className="w-full relative mt-4">
						<label className="text-base font-light mb-2">Gender</label>
						<SelectInput
							searchable={false}
							list={genderOptions}
							className="sm:w-sm w-full relative"
							placeholder="Gender"
							value={genderOptions.find((i) => i.value === travelerData.gender)!}
							onChange={(option) => {
								setChanged(true);
								if (option) {
									setData((prev) => ({
										...prev,
										secondary: prev.secondary.map((traveler, index) => {
											if (index === id) {
												return {
													...traveler,
													gender: option?.value as "male" | "female" | "other",
												};
											}
											return traveler;
										}),
									}));
								}
							}}
						/>
						<ErrorMsg message={validators.gender(travelerData.gender, changed)} />
					</div>
					{/* full name */}
					<div className="w-full relative mt-4">
						<label className="text-base font-light mb-2">Full Name</label>
						<Input
							className="sm:w-sm w-full bg-white"
							placeholder="Enter your full name"
							value={data.secondary[id].fullName || ""}
							onChange={(e) => {
								setChanged(true);
								setData((prev) => ({
									...prev,
									secondary: prev.secondary.map((traveler, index) => {
										if (index === id) {
											return {
												...traveler,
												fullName: e.target.value,
											};
										}
										return traveler;
									}),
								}));
							}}
							required
						/>
						<ErrorMsg message={validators.fullName(travelerData.fullName, changed)} />
					</div>
					{/* email */}
					{/* <div className="w-full relative mt-4">
						<label className="text-base font-light mb-2">Email</label>
						<Input
							className="sm:w-sm w-full bg-white"
							placeholder="Enter your email"
							value={data.secondary[id].email || ""}
							onChange={(e) => {
								setChanged(true);
								setData((prev) => ({
									...prev,
									secondary: prev.secondary.map((traveler, index) => {
										if (index === id) {
											return {
												...traveler,
												email: e.target.value,
											};
										}
										return traveler;
									}),
								}));
							}}
							required
						/>
						<ErrorMsg message={validators.email(travelerData.email, changed)} />
					</div> */}
					{/* contact number */}
					{/* <div className="w-full relative mt-4">
						<label className="text-base font-light mb-2">Contact Number</label>
						<Input
							className="sm:w-sm w-full bg-white"
							placeholder="Enter your contact number"
							value={data.secondary[id].contactNumber || ""}
							onChange={(e) => {
								setChanged(true);
								setData((prev) => ({
									...prev,
									secondary: prev.secondary.map((traveler, index) => {
										if (index === id) {
											return {
												...traveler,
												contactNumber: e.target.value,
											};
										}
										return traveler;
									}),
								}));
							}}
							required
						/>
						<ErrorMsg message={validators.contactNumber(travelerData.contactNumber, changed)} />
					</div> */}
				</div>
				<div className="md:w-1/2 w-full md:px-0 sm:px-4 px-0 md:pl-8">
					<h3 className="text-lg font-semibold mb-4">Passport Details</h3>
					{/* country */}
					<div className="w-full relative mt-4">
						<label className="text-base font-light mb-2">Country of Passport</label>
						<SelectInput
							searchable={false}
							list={countries} // Assuming countries are passed in data
							className="sm:w-sm w-full relative"
							placeholder="Country"
							value={data.secondary[id].country.value === "" ? null : data.secondary[id].country}
							onChange={(option) => {
								setChanged(true);
								setData((prev) => ({
									...prev,
									secondary: prev.secondary.map((traveler, index) => {
										if (index === id) {
											return {
												...traveler,
												country: option || { label: "", value: "" },
											};
										}
										return traveler;
									}),
								}));
							}}
						/>
						<ErrorMsg message={validators.country(travelerData.country, countries, changed)} />
					</div>
					{/* passport number */}
					<div className="w-full relative mt-4">
						<label className="text-base font-light mb-2">Passport Number</label>
						<Input
							className="sm:w-sm w-full bg-white"
							placeholder="Enter your passport number"
							value={data.secondary[id].passportNumber || ""}
							onChange={(e) => {
								setChanged(true);
								setData((prev) => ({
									...prev,
									secondary: prev.secondary.map((traveler, index) => {
										if (index === id) {
											return {
												...traveler,
												passportNumber: e.target.value,
											};
										}
										return traveler;
									}),
								}));
							}}
							required
						/>
						<ErrorMsg message={validators.passportNumber(travelerData.passportNumber, changed)} />
					</div>
					{/* passport expiry date */}
					<div className="w-full relative mt-4 max-w-sm">
						<label className="text-base font-light mb-2">Passport Expiry Date</label>
						<DatePicker
							variant={"ghost"}
							iconNeeded={true}
							placeholder="Select passport expiry date"
							className="flex-grow"
							placeholderClassName="bg-white"
							disabledOn={{ before: addDays(new Date(), 15) }}
							value={data.secondary[id].passportExpiry}
							onChange={(date) => {
								setChanged(true);
								if (!date) return;
								setData((prev) => ({
									...prev,
									secondary: prev.secondary.map((traveler, index) => {
										if (index === id) {
											return {
												...traveler,
												passportExpiry: date,
											};
										}
										return traveler;
									}),
								}));
							}}
						/>
						<ErrorMsg message={validators.passportExpiry(travelerData.passportExpiry, changed)} />
					</div>
				</div>
			</div>
		</BookNowCard>
	);
}

type Stage1Props = {
	data: BookingDetailsType;
	setData: React.Dispatch<React.SetStateAction<BookingDetailsType>>;
	details: TripType;
	nextStage: () => void;
};

function Stage1({ data, setData, details, nextStage }: Stage1Props) {
	const datePickerRef = React.useRef<DatePickerRef>(null);
	const [countries, setCountries] = React.useState<SelectOptionType[]>([]);
	const [changed, setChanged] = React.useState(false);
	const [formComplete, setFormComplete] = React.useState(false);

	const genderOptions = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
		{ value: "other", label: "Other" },
	];

	const initSecondaryTraveler: BookingPersonType = {
		id: undefined,
		travelerType: "adult",
		fullName: "",
		email: "",
		gender: "",
		contactNumber: "",
		country: { label: "", value: "" },
		passportNumber: "",
		passportExpiry: undefined,
	};

	function checkFormCompletion() {
		let hasError = false;
		if (validators.agreement(data.agreement, changed)) {
			hasError = true;
		}
		if (validators.travelerType(data.primary.travelerType, changed)) {
			hasError = true;
		}
		if (validators.preferredDate(data.preferredDate, changed)) {
			hasError = true;
		}
		if (validators.fullName(data.primary.fullName, changed)) {
			hasError = true;
		}
		if (validators.email(data.primary.email, changed)) {
			hasError = true;
		}
		if (validators.contactNumber(data.primary.contactNumber, changed)) {
			hasError = true;
		}
		if (validators.passportNumber(data.primary.passportNumber, changed)) {
			hasError = true;
		}
		if (validators.passportExpiry(data.primary.passportExpiry, changed)) {
			hasError = true;
		}
		if (validators.country(data.primary.country, countries, changed)) {
			hasError = true;
		}
		data.secondary.forEach((traveler, index) => {
			if (validators.fullName(traveler.fullName, changed)) {
				hasError = true;
			}
			if (validators.passportNumber(traveler.passportNumber, changed)) {
				hasError = true;
			}
			if (validators.passportExpiry(traveler.passportExpiry, changed)) {
				hasError = true;
			}
			if (validators.country(traveler.country, countries, changed)) {
				hasError = true;
			}
			if (validators.travelerType(traveler.travelerType, changed)) {
				hasError = true;
			}
			if (validators.gender(traveler.gender, changed)) {
				hasError = true;
			}
		});
		setFormComplete(!hasError);
	}

	async function goToNextStage() {
		// check is there any error in primary traveler or secondary travelers
		if (!formComplete || !changed) {
			setChanged(true);
			checkFormCompletion();
		} else {
			nextStage();
		}
	}

	function addSecondaryTraveler() {
		setData((prev) => ({
			...prev,
			secondary: [...prev.secondary, { ...initSecondaryTraveler, id: prev.secondary.length + 1 }],
		}));
	}

	async function getCountries() {
		try {
			const response = await fetch(endpoints.common.countryList);
			if (!response.ok) {
				console.error("Failed to fetch countries", await response.json());
				return;
			}
			const data = (await response.json()) as ResponseType<{ id: string; name: string }[]>;
			const countryOptions = data.data.map((country) => ({
				value: country.id,
				label: country.name,
			}));
			setCountries(countryOptions);
		} catch (error) {
			console.error("Failed to fetch countries", error);
		}
	}

	useEffect(() => {
		getCountries();
	}, []);

	useEffect(() => {
		checkFormCompletion();
	}, [data, changed]);

	return (
		<div>
			<BookNowCard>
				<label className="text-base">Please select your preferred date to book your trip.</label>
				{/* preferred date picker */}
				<div>
					<div className="flex mt-4 max-w-sm gap-2">
						<DatePicker
							variant={"ghost"}
							ref={datePickerRef}
							iconNeeded={true}
							placeholder="Select preferred date"
							className="flex-grow"
							placeholderClassName="bg-white"
							disabledOn={{ before: addDays(new Date(), 15) }}
							value={data.preferredDate}
							onChange={(date) => {
								setChanged(true);
								if (!date) return;
								setData((prev) => ({
									...prev,
									preferredDate: date,
								}));
							}}
						/>
						<Button
							variant={"secondary"}
							className="h-12 w-12 rounded-md text-white flex items-center justify-center"
							onClick={() => datePickerRef.current?.open()}
						>
							<Icon.Calendar className="!h-5 !w-5" />
						</Button>
					</div>
					<ErrorMsg message={validators.preferredDate(data.preferredDate, changed)} />
				</div>
			</BookNowCard>
			<BookNowCard>
				<h2 className="text-2xl font-bold mb-6">01. Primary Traveler</h2>
				<div className="w-full flex md:flex-row flex-col">
					<div className="md:w-1/2 w-full md:border-r md:px-0 sm:px-4 px-0">
						<h3 className="text-lg font-semibold mb-4">Personal Details</h3>
						{/* select type */}
						<div className="flex gap-16 items-center">
							<label className="text-base font-light">Adult / Child</label>
							<RadioGroup
								onValueChange={(value) => {
									setChanged(true);
									setData((prev) => ({
										...prev,
										primary: { ...prev.primary, travelerType: value as "adult" | "child" },
									}));
								}}
							>
								<div className="flex gap-4">
									<label className="text-sm">
										<RadioGroupItem value="adult" className="mr-2 " checked={true} />
										Adult
									</label>
									<label className="text-sm text-gray-500">
										<RadioGroupItem
											value="child"
											className="mr-2"
											checked={false}
											disabled={true}
										/>
										Child
									</label>
								</div>
							</RadioGroup>
							<ErrorMsg message={validators.travelerType(data.primary.travelerType, changed)} />
						</div>
						{/* select gender */}
						<div className="w-full relative mt-4">
							<label className="text-base font-light mb-2">Gender</label>
							<SelectInput
								searchable={false}
								list={genderOptions}
								className="sm:w-sm w-full relative"
								placeholder="Gender"
								value={genderOptions.find((i) => i.value === data.primary.gender)!}
								onChange={(option) => {
									setChanged(true);
									setData((prev) => ({
										...prev,
										primary: {
											...prev.primary,
											gender: option ? (option.value as "male" | "female" | "other") : "",
										},
									}));
								}}
							/>
							<ErrorMsg message={validators.gender(data.primary.gender, changed)} />
						</div>
						{/* full name */}
						<div className="w-full relative mt-4">
							<label className="text-base font-light mb-2">Full Name</label>
							<Input
								className="sm:w-sm w-full bg-white"
								placeholder="Enter your full name"
								value={data.primary.fullName || ""}
								onChange={(e) => {
									setChanged(true);
									setData((prev) => ({
										...prev,
										primary: { ...prev.primary, fullName: e.target.value },
									}));
								}}
								required
							/>
							<ErrorMsg message={validators.fullName(data.primary.fullName, changed)} />
						</div>
						{/* email */}
						<div className="w-full relative mt-4">
							<label className="text-base font-light mb-2">Email</label>
							<Input
								className="sm:w-sm w-full bg-white"
								placeholder="Enter your email"
								value={data.primary.email || ""}
								onChange={(e) => {
									setChanged(true);
									setData((prev) => ({
										...prev,
										primary: { ...prev.primary, email: e.target.value },
									}));
								}}
								required
							/>
							<ErrorMsg message={validators.email(data.primary.email, changed)} />
						</div>
						{/* contact number */}
						<div className="w-full relative mt-4">
							<label className="text-base font-light mb-2">Contact Number</label>
							<Input
								className="sm:w-sm w-full bg-white"
								placeholder="Enter your contact number"
								value={data.primary.contactNumber || ""}
								onChange={(e) => {
									setChanged(true);
									setData((prev) => ({
										...prev,
										primary: { ...prev.primary, contactNumber: e.target.value },
									}));
								}}
								required
							/>
							<ErrorMsg message={validators.contactNumber(data.primary.contactNumber, changed)} />
						</div>
					</div>
					<div className="md:w-1/2 w-full md:pl-8 sm:px-4 px-0 md:mt-0 mt-4">
						<h3 className="text-lg font-semibold mb-4">Passport Details</h3>
						{/* country */}
						<div className="w-full relative mt-4">
							<label className="text-base font-light mb-2">Country of Passport</label>
							<SelectInput
								list={countries} // Assuming countries are passed in data
								className="sm:w-sm w-full relative"
								placeholder="Country"
								value={data.primary.country.value === "" ? null : data.primary.country}
								onChange={(option) => {
									setChanged(true);
									setData((prev) => ({
										...prev,
										primary: { ...prev.primary, country: option || { label: "", value: "" } },
									}));
								}}
							/>
							<ErrorMsg message={validators.country(data.primary.country, countries, changed)} />
						</div>
						{/* passport number */}
						<div className="w-full relative mt-4">
							<label className="text-base font-light mb-2">Passport Number</label>
							<Input
								className="sm:w-sm w-full bg-white"
								placeholder="Enter your passport number"
								value={data.primary.passportNumber || ""}
								onChange={(e) => {
									setChanged(true);
									setData((prev) => ({
										...prev,
										primary: { ...prev.primary, passportNumber: e.target.value },
									}));
								}}
								required
							/>
							<ErrorMsg message={validators.passportNumber(data.primary.passportNumber, changed)} />
						</div>
						{/* passport expiry date */}
						<div className="w-full relative mt-4 max-w-sm">
							<label className="text-base font-light mb-2">Passport Expiry Date</label>
							<DatePicker
								variant={"ghost"}
								iconNeeded={true}
								placeholder="Select passport expiry date"
								className="flex-grow"
								placeholderClassName="bg-white"
								disabledOn={{ before: addDays(new Date(), 15) }}
								value={data.primary.passportExpiry}
								onChange={(date) => {
									setChanged(true);
									setData((prev) => ({
										...prev,
										primary: { ...prev.primary, passportExpiry: date },
									}));
								}}
							/>
							<ErrorMsg message={validators.passportExpiry(data.primary.passportExpiry, changed)} />
						</div>
					</div>
				</div>
			</BookNowCard>
			{/* add secondary traveler button */}
			<BookNowCard className="sm:py-8">
				<div className="w-full flex justify-between md:items-center items-start md:gap-0 gap-2 md:flex-row flex-col">
					<h2 className="text-2xl font-bold">Secondary Traveler</h2>
					<Tooltip label="Add Secondary Traveler">
						<Button size={"xl"} onClick={addSecondaryTraveler}>
							<div className="flex items-center gap-4">
								<Icon.Plus />
								<span>Add Secondary Traveler</span>
							</div>
						</Button>
					</Tooltip>
				</div>
			</BookNowCard>
			{/* secondary travelers list */}
			{data.secondary.map((traveler, index) => (
				<SecondaryTraveler
					id={index}
					key={traveler.id || index}
					data={data}
					setData={setData}
					countries={countries}
					genderOptions={genderOptions}
				/>
			))}
			<BookNowCard>
				<h2 className="text-2xl font-bold">Booking Summary</h2>
				<div className="w-full flex flex-col mt-6">
					<div className="w-full flex justify-between items-center py-4 px-2 border-b border-gray-200">
						<p className="text-lg">Child</p>
						<p className="text-lg">{data.secondary.filter((tt) => tt.travelerType === "child").length}</p>
					</div>
					<div className="w-full flex justify-between items-center py-4 px-2 border-b border-gray-200">
						<p className="text-lg">Adult</p>
						<p className="text-lg">
							{data.secondary.filter((tt) => tt.travelerType === "adult").length + 1}
						</p>
					</div>

					<div className="w-full flex justify-between items-center py-4 px-2">
						<p className="text-lg font-bold">Total Amount (A$)</p>
						<p className="text-xl font-bold">
							{decimalFormatter.format(
								data.secondary.filter((tt) => tt.travelerType === "child").length *
									details.accomadationPriceChild +
									(data.secondary.filter((tt) => tt.travelerType === "adult").length + 1) *
										details.accomadationPriceAdult
							)}
						</p>
					</div>
				</div>
			</BookNowCard>
			<BookNowCard>
				<h2 className="text-2xl font-bold">Special Note</h2>
				<p className="text-base font-light mt-4">
					Please let us know if you have any special requests or additional notes regarding your reservation
				</p>
				<Textarea
					placeholder="Any Message"
					value={data.specialRequests}
					onChange={(e) => setData({ ...data, specialRequests: e.target.value })}
					rows={6}
					className="bg-white mt-2 min-h-32"
				></Textarea>
			</BookNowCard>
			<BookNowCard>
				<h2 className="text-2xl font-bold">Terms & Conditions *</h2>
				<p className="text-base font-light mt-4">
					Please carefully read our Terms and Conditions. By agreeing below, you confirm that you accept them
					and wish to proceed with your reservation.{" "}
				</p>
				<Dialog>
					<DialogTrigger asChild>
						<Button size={"xl"} variant={"secondary"} className="my-8">
							Read The Terms and Conditions
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-2xl max-w-full h-[80vh] overflow-y-scroll">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold">Terms and Conditions</DialogTitle>
						</DialogHeader>
						<TermsAndConditions />
					</DialogContent>
				</Dialog>
				<label className="flex items-center gap-4 text-base font-light cursor-pointer">
					<Checkbox
						checked={data.agreement}
						onCheckedChange={(checked) => {
							setChanged(true);
							setData({ ...data, agreement: checked as boolean });
						}}
					/>
					<span>I have read and agree to the Terms and Conditions.</span>
				</label>
				<ErrorMsg message={validators.agreement(data.agreement, changed)} />
			</BookNowCard>
			<div className="flex justify-start mt-4">
				<Button size={"xl"} onClick={goToNextStage} className="btn btn-primary w-48" disabled={!formComplete}>
					<div className="flex items-center justify-between w-full">
						<span>Next</span>
						<Icon.ArrowRight className="inline ml-2" />
					</div>
				</Button>
			</div>
		</div>
	);
}

export default Stage1;
