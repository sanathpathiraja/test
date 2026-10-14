import { ReadonlyURLSearchParams } from "next/navigation";
import { ValidateFilters } from "./utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/* ---------------------------------------
   SLUG HELPERS
---------------------------------------- */

export function createSlug(title: string, id?: string): string {
	if (!title) return "";

	let cleanTitle = title
		.replace(/[,.\s]+/g, "-")
		.replace(/[^a-z0-9-]/gi, "")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "")
		.toLowerCase()
		.trim();

	// If id is missing, return title only
	if (!id) return cleanTitle;

	return `${cleanTitle}--${id}`;
}

export function extractIdFromSlug1(slug?: string | null): string | null {
	if (!slug || typeof slug !== "string") return null;

	const parts = slug.split("--");
	return parts.length > 1 ? parts[1] : null;
}

export function extractIdFromSlug(slug: string): string {
	if (!slug) return "";

	const index = slug.lastIndexOf("--");
	if (index === -1) return "";

	return slug.substring(index + 2);
}


/* ---------------------------------------
   FILTER HELPERS
---------------------------------------- */

export function tripFilters(
	params: ReadonlyURLSearchParams
): Record<string, any> {
	return new ValidateFilters(params).data();
}

export function generateFilterUrl(filters: Record<string, any>): string {
	const safeArray = (arr: any) =>
		Array.isArray(arr) ? arr.join(",") : "";

	const safeVal = (v: any) =>
		v === undefined || v === null ? "" : v;

	let url = "";

	url += `page=${safeVal(filters.page || 1)}&`;
	url += `searchText=${safeVal(filters.searchText)}&`;
	url += `sortBy=${safeVal(filters.sortBy)}&`;

	const pageSize =
		filters.pageSize && [20, 30].includes(filters.pageSize)
			? filters.pageSize
			: 20;

	url += `pageSize=${pageSize}&`;

	url += `country=${safeArray(filters.country)}&`;
	url += `destination=${safeArray(filters.destination)}&`;
	url += `experience=${safeArray(filters.experience)}&`;
	url += `style=${safeArray(filters.style)}&`;
	url += `theme=${safeArray(filters.theme)}&`;

	url += `minPrice=${safeVal(filters.minPrice)}&`;
	url += `maxPrice=${safeVal(filters.maxPrice)}&`;
	url += `minDuration=${safeVal(filters.minDuration)}&`;
	url += `maxDuration=${safeVal(filters.maxDuration)}`;

	return url;
}

export function checkIfUrlHasFilters(
	query: ReadonlyURLSearchParams
): boolean {
	const keys = [
		"country",
		"destination",
		"style",
		"theme",
		"experience",
		"minPrice",
		"maxPrice",
		"minDuration",
		"maxDuration",
		"searchText",
		"sortBy",
		"page",
		"pageSize",
	];

	// Return true if ANY filter exists (more realistic logic)
	return keys.some((key) => query.has(key));
}

export function navigateWithFilters(
	pathname: string,
	router: AppRouterInstance,
	filters: Record<string, any>,
	scroll: boolean = false
): void {
	const filterUrl = generateFilterUrl(filters);
	router.push(`${pathname}?${filterUrl}`, { scroll });
}

/* ---------------------------------------
   TEXT HELPERS
---------------------------------------- */

export function getTextFromTags(text: string | null): string | null {
	if (!text) return null;

	return text
		.replace(/<[^>]+>/g, "")
		.replace(/&nbsp;/g, " ")
		.trim();
}

/* ---------------------------------------
   ASYNC HELPERS
---------------------------------------- */

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function throttledMap<T, R>(
	items: T[],
	limit: number,
	callback: (item: T) => Promise<R>
): Promise<R[]> {
	const results: R[] = [];

	for (let i = 0; i < items.length; i += limit) {
		const chunk = items.slice(i, i + limit);
		const chunkResults = await Promise.all(chunk.map(callback));
		results.push(...chunkResults);
	}

	return results;
}
