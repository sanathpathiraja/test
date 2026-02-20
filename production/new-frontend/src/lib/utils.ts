import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type FilterData = {
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

export class ValidateFilters {
	private filters: ReadonlyURLSearchParams;

	constructor(filters: ReadonlyURLSearchParams) {
		this.filters = filters;
	}

	public data(): FilterData {
		return {
			country: this.getArray("country"),
			destination: this.getArray("destination"),
			style: this.getArray("style"),
			theme: this.getArray("theme"),
			experience: this.getArray("experience"),
			minPrice: this.getNumber("minPrice"),
			maxPrice: this.getNumber("maxPrice"),
			minDuration: this.getInt("minDuration"),
			maxDuration: this.getInt("maxDuration"),
			searchText: this.getSearchText(),
			sortBy: this.getSortBy(),
			page: this.getPage(),
			pageSize: this.getPageSize(),
		};
	}

	/* ---------------------------
	   GENERIC HELPERS
	---------------------------- */

	private getArray(key: string): string[] | undefined {
		const value = this.filters.get(key);
		if (!value) return undefined;

		const arr = value
			.split(",")
			.map((v) => v.trim())
			.filter(Boolean);

		return arr.length ? arr : undefined;
	}

	private getNumber(key: string): number | undefined {
		const value = this.filters.get(key);
		if (!value) return undefined;

		const num = parseFloat(value);
		return isNaN(num) ? undefined : num;
	}

	private getInt(key: string): number | undefined {
		const value = this.filters.get(key);
		if (!value) return undefined;

		const num = parseInt(value, 10);
		return isNaN(num) ? undefined : num;
	}

	/* ---------------------------
	   SPECIFIC VALIDATORS
	---------------------------- */

	private getSearchText(): string | undefined {
		const text = this.filters.get("searchText");
		return text ? text.trim() : undefined;
	}

	private getSortBy(): string {
		const sortBy = this.filters.get("sortBy");

		const validSortOptions = [
			"priceLowest",
			"priceHighest",
			"shortest",
			"longest",
			"popularity",
			"newest",
		];

		if (sortBy && validSortOptions.includes(sortBy)) {
			return sortBy;
		}

		return "newest";
	}

	private getPage(): number {
		const page = this.filters.get("page");
		const pageNumber = page ? parseInt(page, 10) : 1;
		return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
	}

	private getPageSize(): number {
		const pageSize = this.filters.get("pageSize");
		const size = pageSize ? parseInt(pageSize, 10) : 20;

		if (isNaN(size)) return 20;
		if (size < 20) return 20;
		if (size > 30) return 30;

		return size;
	}
}
