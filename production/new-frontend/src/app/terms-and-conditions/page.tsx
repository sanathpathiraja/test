import Container from "@/components/Container";
import TermsAndConditions from "@/components/TermsAndConditions";
import React from "react";

function page() {
	return (
		<main className="pt-[10vh] pb-16">
			<Container>
				<TermsAndConditions />
			</Container>
		</main>
	);
}

export default page;
