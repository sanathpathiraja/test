import Container from "@/components/Container";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import React from "react";

function page() {
	return (
		<main className="pt-[10vh] pb-16">
			<Container>
				<PrivacyPolicy />
			</Container>
		</main>
	);
}

export default page;
