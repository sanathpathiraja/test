import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const environments = {
	production: {
		BASE_URL: "https://escaperoots.com.au",
		BASE_API_URL: "https://escaperoots.com.au",
		STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PRODUCTION as string,
	},
	development: {
		BASE_URL: "https://staging.escaperoots.com.au",
		BASE_API_URL: "http://localhost:5164",
		STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
	},
	staging: {
		BASE_URL: "https://staging.escaperoots.com.au",
		BASE_API_URL: "https://stagingapi.escaperoots.com.au/api",
		STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
	},
};

const currentEnv: keyof typeof environments = "production";
export const environment = environments[currentEnv];

export const BASE_API_URL = environment.BASE_API_URL + "/api/";

export const endpoints = {

	nav: {
		destinations: `${BASE_API_URL}nav/destinations/menu`,
		waysToTravel: `${BASE_API_URL}nav/waysToTravel/menu`,
		experiences: `${BASE_API_URL}nav/experiences/menu`,
	},
	trips: {
		trips: `${BASE_API_URL}trips`,
		countries: `${BASE_API_URL}trips/countries`,
		countriesById: (countryid: string) => `${BASE_API_URL}trips/countries/${countryid}`,
		tripfilters: `${BASE_API_URL}trips/tripfilters`,
		upcoming: `${BASE_API_URL}trips/upcoming?recordCount=10`,
		hotdeals: `${BASE_API_URL}trips/hotdeals?recordCount=10`,
		byId: (tripid: string) => `${BASE_API_URL}trips/${tripid}`,
		itineraries: (tripid: string) => `${BASE_API_URL}trips/${tripid}/itineraries`,
		stylesById: (styleid: string) => `${BASE_API_URL}trips/styles/${styleid}`,
		experienceById: (experienceId: string) => `${BASE_API_URL}trips/experiences/${experienceId}`,
		themesById: (themesId: string) => `${BASE_API_URL}trips/themes/${themesId}`,
	},
	bookings: {
		info: (tripid: string) => `${BASE_API_URL}bookings/tripInfo/${tripid}`,
		createPaymentIntent: `${BASE_API_URL}payment/createpaymentintent`,
		book: `${BASE_API_URL}bookings`,
		updatebookingpayment: (bookingId: string) => `${BASE_API_URL}bookings/${bookingId}/updatebookingpayment`,
		bookingDetails: (ref: string, email: string) => `${BASE_API_URL}bookings/${ref},${email}`,
	},
	common: {
		countryList: `${BASE_API_URL}common/CommonService/countrySelectList`,
	},
	countries: (countryid: string) => `${BASE_API_URL}countries/${countryid}`,
	countryDetails: (countryid: string) => `${BASE_API_URL}admin/country/${countryid}`,
	styles: (styleid: string) => `${BASE_API_URL}styles/${styleid}`,
	experiences: (experienceid: string) => `${BASE_API_URL}experiences/${experienceid}`,
	themes: (themeid: string) => `${BASE_API_URL}themes/${themeid}`,
	clientInquiry: `${BASE_API_URL}inquires/clientinquiry`,
};

const ogDefault = {
	title: "Escape Roots - Holiday Beyond Imagination",
	description:
		"Discover your next adventure with Escape Roots. Explore countries, experiences, and unique travel themes.",
	images: [`${environment.BASE_URL}/opengraph.png`],
	type: "website",
	siteName: "Escape Roots",
	url: environment.BASE_URL,
	emails: "sales@escaperoots.com.au",
};

export const metadataDefault = {
	title: "Escape Roots - Holiday Beyond Imagination",
	description:
		"Discover your next adventure with Escape Roots. Explore countries, experiences, and unique travel themes.",
	keywords: [
		"travel",
		"adventure",
		"exploration",
		"Escape Roots",
		"trips",
		"trip",
		"destinations",
		"experiences",
		"themes",
		"styles",
	],
	icons: "/favicon.ico",
	openGraph: ogDefault,
};

export function buildImageUrl(path?: string | null) {
	const baseUrl = environment.BASE_API_URL;
	const fallback = "/images/placeholder.jpg";

	if (!path) return `${baseUrl}${fallback}`;
	if (path.startsWith("http")) return path;
	return `${baseUrl}${path}`;
}




/*

/favicon.ico
/fonts/Allison-Regular.ttf
/footer-cover.png
/gallery1.png
/gallery2.png
/gallery3.png
/gallery4.png
/gallery5.png
/gallery6.png
/home-video.mp4
/logo.png
/opengraph.png
/svg/flight-location-travel.svg
/svg/flight-travel.svg
/svg/home-section4-bg.svg


escaperoots@localhost:/etc/nginx/sites-available$ cat escaperoots.com.au 
server {
	server_name escaperoots.com.au www.escaperoots.com.au;

	location / {
	root /var/www/escaperoots/production/frontend;
	try_files $uri $uri/ /index.html;
		proxy_pass http://localhost:4300;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}

	listen 443 ssl;
	ssl_certificate /etc/letsencrypt/live/escaperoots.com.au/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/escaperoots.com.au/privkey.pem;
	include /etc/letsencrypt/options-ssl-nginx.conf;
	ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
	if ($host = escaperoots.com.au) {
		return 301 https://$host$request_uri;
	}

	listen 80;
	server_name escaperoots.com.au www.escaperoots.com.au;
	return 301 https://$host$request_uri;
}


i have another frontend created for this site but its not replace entirely this site. its created by next js and its runs 4350 port and its replace following pages of original site

/ - home page
/trip and /trip/.... every url after url
/trips and everything /trips/...

and also these files

/favicon.ico
/fonts/Allison-Regular.ttf
/footer-cover.png
/gallery1.png
/gallery2.png
/gallery3.png
/gallery4.png
/gallery5.png
/gallery6.png
/home-video.mp4
/logo.png
/opengraph.png
/svg/flight-location-travel.svg
/svg/flight-travel.svg
/svg/home-section4-bg.svg

how can i achieve it


*/
