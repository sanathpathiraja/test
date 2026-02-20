import { redirect } from "next/navigation";

async function page() {
	redirect("/trips");
}

export default page;
