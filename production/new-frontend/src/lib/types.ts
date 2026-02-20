import { SelectOptionType } from "@/components/ui/SelectInput";

export type ResponseType<T> = {
	data: T;
	isSuccess: boolean;
	problemDetails: string | null;
};

export type CountryType = {
	id: string;
	name: string;
};

export type TripImages = Array<{
	id: string;
	fileName: string;
	thumbName: string;
	caption?: string | null;
	displayImage: boolean;
	imageUrl: string;
	thumbUrl: string;
}>;

export type TripType = {
	id: string;
	name: string;
	tripCode: string;
	tagline: string;
	description: string;
	duration: number;
	noOfNights: number;
	startDestination: {
		id: string;
		destinationId: string;
		name: string;
		sequenceNo: number;
	};
	endDestination: {
		id: string;
		destinationId: string;
		name: string;
		sequenceNo: number;
	};
	ageMin?: number | null;
	ageMax?: number | null;
	groupMin?: number | null;
	groupMax?: number | null;
	accomadationPriceAdult: number;
	accomadationPriceChild: number;
	physicalRating?: number | null;
	countryId: string;
	country: string;
	styleId: string;
	style: string;
	tripImages: TripImages;
	tripInclusions: Array<{
		id: string;
		tripId: string;
		title?: string | null;
		tripInclusionExclusionTypeId: number;
		displayText: string;
	}>;
	tripExclusions: Array<{
		id: string;
		tripId: string;
		title?: string | null;
		tripInclusionExclusionTypeId: number;
		displayText: string;
	}>;
	tripDestinations: Array<{
		id: string;
		destinationId: string;
		name: string;
		sequenceNo?: number;
	}>;
	distinctDestinations?: Array<{
		id: string;
		destinationId?: string;
		name?: string;
	}>;
	tripThemes?: Array<{ id: string; name: string }>;
	tripExperiences?: Array<{ id: string; name: string }>;
};

export type TripPlanType = {
	id: string;
	day: number;
	title: string;
	description: string;
	specialInfo?: string | null;
	tripId: string;
	dailyActivities: Array<string>;
	transportDetails: Array<string>;
	accomadationDetails: Array<string>;
	mealPlans: Array<{
		mealType: string;
		displayText: string;
	}>;
	addonActivities?: Array<string>;
};

export type TripFiltersType = {
	country?: string[];
	destination?: string[];
	style?: string[];
	theme?: string[];
	experience?: string[];
	minPrice?: number;
	maxPrice?: number;
	minDuration?: number;
	maxDuration?: number;
	searchText?: string;
	sortBy: string;
	page: number;
	pageSize: number;
};

export type RegionItemType = {
	id: string;
	active: boolean;
	link: string;
	name: string;
};

export type RegionType = {
	id: string;
	active: boolean;
	link: string | null;
	name: string;
	subItems: RegionItemType[];
};

export type RegionResponseType = {
	data: {
		items: RegionType[];
	};
};

export type DestinationType = {
	id: string;
	name: string;
};

export type ExperienceType = {
	id: string;
	name: string;
};

export type ThemeType = {
	id: string;
	name: string;
};

export type StyleType = {
	id: string;
	name: string;
};

export type TripFiltersResponseType = {
	data: {
		countryList: CountryType[];
		destinationList: DestinationType[];
		experienceList: ExperienceType[];
		styleList: StyleType[];
		themeList: ThemeType[];
	};
};

export type ImageType = {
	id: string;
	fileName: string;
	thumbName: string;
	caption?: string | null;
	displayImage: boolean;
	imageUrl: string;
	thumbUrl: string;
};

export type TripRecordType = {
	id: string;
	name: string;
	tripCode: string;
	country: string;
	style: string;
	duration: number;
	noOfNights: number;
	price: number;
	displayImage: ImageType;
};

export type PagingSettingsType = {
	boundaryLinks: boolean;
	collectionSize: number;
	lastRecordIndex: number;
	maxSize: number;
	page: number;
	pageSize: number;
};

export type TripListType<T> = {
	pagingSettings: PagingSettingsType;
	records: T[];
};

export type DetailsPageType = {
	id: string;
	name: string;
	description: string | null;
	tags: string[];
};

export type BookingPersonType = {
	id?: number;
	travelerType: "adult" | "child";
	gender: "male" | "female" | "other" | "";
	fullName: string;
	email: string;
	contactNumber: string;
	passportNumber: string;
	passportExpiry?: Date;
	country: SelectOptionType;
};

export type BookingDetailsType = {
	preferredDate?: Date;
	specialRequests: string;
	primary: BookingPersonType;
	secondary: BookingPersonType[];
	agreement: boolean;
};

export type BookingInfoType = {
	id: string;
	name: string;
	tripCode: string;
	duration: number;
	minAge: number;
	maxAge: number;
	adultPrice: number;
	childPrice: number;
	tripPdfPath: string;
};

export type BookingType = {
	bookingId: string;
	paymentId: string;
	bookingRef: string;
	totalAmount: number;
	preferredStartDate: string;
};

export type CustomerBookingDetailsType = {
	bookingOverview: {
		bookingId: string;
		bookingRef: string;
		pdfFilePath: string | null;
		primaryEmail: string | null;
		primaryUser: string | null;
		totalAmount: number;
		paidAmount: number;
		amountDue: number;
		tripId: string;
		tripName: string;
		duration: number;
		preferredStartDate: string;
		createdDate: string;
		cancelledDate: string | null;
		bookingStatus: string;
		tourStatus: string;
		payInInstallments: boolean;
		fullyPaid: boolean;
		bookedByAdmin: boolean;
		adultPrice: number;
		childPrice: number;
	};
	bookingPersons: Array<{
		bookingId: string;
		isPrimary: boolean;
		isChild: boolean;
		passportNo: string;
		passportExpiryDate: string;
		gender: number;
		fullName: string;
		email: string;
		contactNo: string;
		countryId: string;
		amount: number;
		id: string;
		isActive: boolean;
		createdDate: string;
		createdBy: string;
		modifiedDate: string | null;
		modifiedBy: string | null;
	}>;
	bookingPayments: Array<{
		bookingId: string;
		amount: number;
		primaryEmail: string | null;
		primaryUser: string | null;
		paymentDate: string;
		paymentReference: string;
		bookingRef: string;
		isSuccessfull: boolean;
		isVerified: boolean;
		paymentMethod: number;
		responseMessage: string;
		description: string;
		id: string;
		isActive: boolean;
		createdDate: string;
		createdBy: string;
		modifiedDate: string | null;
		modifiedBy: string | null;
	}>;
};
