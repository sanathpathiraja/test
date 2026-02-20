import React from "react";

function H1({ children }: { children: React.ReactNode }) {
	return <h1 className="text-4xl font-bold my-4">{children}</h1>;
}

function H2({ children }: { children: React.ReactNode }) {
	return <h2 className="text-2xl font-semibold my-4">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
	return <p className="text-base my-2">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
	return <ul className="list-disc pl-6 my-2">{children}</ul>;
}

function Li({ children }: { children: React.ReactNode }) {
	return <li className="my-1 text-base">{children}</li>;
}

function B({ children }: { children: React.ReactNode }) {
	return <strong className="font-bold">{children}</strong>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<a href={href} className="text-blue-600 hover:underline">
			{children}
		</a>
	);
}

function PrivacyPolicy() {
	return (
		<div>
			<H1>Escape Roots Privacy Policy</H1>
			<H2>1. Our Commitment to Your Privacy</H2>
			<P>
				Escape Roots takes its data protection and privacy responsibilities seriously. This privacy policy
				(Policy) explains how we handle the personal information you provide to us, or which we collect when you
				use our services. This includes how we collect, use, and protect your data, as well as the measures we
				take to safeguard your personal information.
			</P>
			<P>
				This policy may be updated periodically to stay current with legal requirements and our business
				operations. You are responsible for regularly checking this policy and staying informed of any changes.
				We will seek to inform you of any significant changes via a notice on our website or, where applicable,
				by email.
			</P>
			<H2>2. What Information We Collect</H2>
			<P>
				We gather certain information from you when you make an inquiry or book a trip with us. Depending on the
				services you use, we typically collect the following personal information:
			</P>
			<Ul>
				<Li>
					<B>Personal and Contact Details:</B> Your full name, date of birth, gender, title, postal address,
					phone number, and email address.
				</Li>
				<Li>
					<B>Travel-Related Information:</B> Passport details (including nationality and city of birth) and
					passport scans, visa information, dietary requirements, and travel insurance details.
				</Li>
				<Li>
					<B>Sensitive Information:</B> We may ask for health information, such as pre-existing medical
					conditions, vaccination status, disabilities, and food allergies. This is handled as sensitive
					information under relevant data protection laws.
				</Li>
				<Li>
					<B>Information for Visa Support:</B> If we assist you with a visa application, you may be asked to
					provide additional information, such as your occupation, marital status, employment history, and
					social media tags.
				</Li>
				<Li>
					<B>Website and Technical Data:</B> When you visit our websites, we automatically collect technical
					identity data, including IP addresses, browser type, and information about your device. We also
					collect usage information as you browse our sites.
				</Li>
			</Ul>
			<H2>3. How and Why We Use Your Information</H2>
			<P>We collect, hold, and process your personal information for various business purposes, including to:</P>
			<Ul>
				<Li>
					<B>Fulfill Bookings:</B> Provide you with our travel products and services, administer your
					reservations and tours, and manage your customer relationship with us.
				</Li>
				<Li>
					<B>Communicate with You:</B> Contact you to respond to your queries, complaints, or if we need to
					provide important updates about your booking.
				</Li>
				<Li>
					<B>Improve Services:</B> Analyze data to improve our products, services, and your overall user
					experience.
				</Li>
				<Li>
					<B>Legal Compliance:</B> Comply with our legal obligations and assist government and law enforcement
					agencies or regulators.
				</Li>
				<Li>
					<B>Marketing:</B> Carry out marketing activities, including identifying and informing you about
					travel-related products or services that may interest you.
				</Li>
				<Li>
					<B>Safety and Wellbeing:</B> Your personal information will be used by our group leaders to identify
					you and ensure your safety during a trip. Your medical information may also be shared with insurance
					providers or medical staff in an emergency.
				</Li>
			</Ul>
			<H2>4. Sharing Your Information</H2>
			<P>To facilitate your travel services, your personal information may be shared with:</P>
			<Ul>
				<Li>
					<B>Travel Providers:</B> We share your information with travel providers such as hotels, airlines,
					and local operators to confirm your booking and provide the relevant services.
				</Li>
				<Li>
					<B>Third-Party Service Providers:</B> This includes third-party payment providers to facilitate
					transactions and research partners who assist us with surveys and analytics.
				</Li>
				<Li>
					<B>Internal Group Entities:</B> As part of a large international group, your information may be
					shared within the Escape Roots Group and any of our related entities worldwide.
				</Li>
			</Ul>
			<H2>5. International Data Transfers</H2>
			<P>
				Since we operate with service providers in numerous countries, your personal information may be
				transferred and stored outside of Australia. We take appropriate steps to ensure that your data receives
				an adequate level of protection. You have a right to request access to the safeguards we use to transfer
				your personal information.
			</P>
			<H2>6. Your Rights and How to Contact Us</H2>
			<P>
				You have the right to request access to and correction of the personal information we hold about you.
				Under certain data protection laws, you may also have the right to object to the processing of your data
				and request that your information be transferred to another party.
			</P>
			<P>
				If you would like to exercise these rights or have a privacy complaint, you can contact our privacy team
				via:
			</P>
			<Ul>
				<Li>
					<B>Email:</B> <A href="mailto:operations@escaperoots.com.au">operations@escaperoots.com.au</A>
				</Li>
				<Li>
					<B>Address:</B>{" "}
				</Li>
			</Ul>
			<H2>7. Cookies & Website Usage</H2>
			<P>
				Our websites use cookies and web server logs to enhance your user experience. For more information,
				please see our separate Cookies Policy.
			</P>
			<H2>8. How We Secure Your Information</H2>
			<P>
				Escape Roots is committed to keeping your personal information secure. We retain and store most
				information in computer systems and databases operated by us or our external service providers. We only
				retain your personal information for as long as necessary to fulfill the purposes for which we collected
				it.
			</P>
		</div>
	);
}

export default PrivacyPolicy;
