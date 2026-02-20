import React from "react";

function H1({ children }: { children: React.ReactNode }) {
	return <h1 className="text-4xl font-bold my-4">{children}</h1>;
}

function H2({ children }: { children: React.ReactNode }) {
	return <h2 className="text-2xl font-semibold my-4">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
	return <h2 className="text-xl font-semibold my-4">{children}</h2>;
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

function TermsAndConditions() {
	return (
		<div>
			<H1>Terms And Conditions</H1>
			<H2>Agency Booking Conditions</H2>

			<H3>1. Our contract - services provided to you by Escape Roots</H3>
			<P>
				You have booked a third-party operator trip with Escape Roots Pty Ltd (ABN 35 007 172 456) (us/we). In
				this circumstance, we act as an agent for and sell, certain Travel Products on behalf of the third-party
				travel operator (Operator). Any services we provide to you are collateral to that agency relationship.
				Our obligation to you is to (and you expressly authorise us to) provide travel advisory services, make
				travel bookings on your behalf and to arrange relevant contracts between you and the Operator (the
				Booking Services). You pay us for providing the Booking Services to you. Your Booking Confirmation is
				your acknowledgement that we are entitled to retain payment for the Booking Services from the Operator.
				The terms of the relationship between us are governed by these Agency Booking Conditions.
			</P>

			<H3>2. What the Operator provides to you</H3>
			<P>
				In this relationship, we are not ourselves a provider of travel services and have no control over, or
				liability for, the services provided by the Operators. The Operator is responsible for providing the
				Travel Product to you. All bookings are made on your behalf subject to the Operator Terms and
				Conditions, including conditions of carriage and limitations of liability, imposed by these service
				providers. We will require you to expressly agree to these Operator Terms and Conditions that apply to
				the Travel Product. We will provide you with copies of the Operator Terms and Conditions on request.
			</P>

			<H3>3. Deposit and final payments</H3>
			<P>
				You will be required to pay a deposit when booking your Travel Product. Unless otherwise specified in
				the Special Conditions, your sales consultant will advise how much that will be as out in the relevant
				Operator Terms and Conditions. A deposit will secure your booking, however prices quoted may change
				before you make the final payment. The timing for your final payment is set out in in the relevant
				Operator Terms and Conditions unless otherwise advised to you by your Sales Representative. We are not
				liable for any changes made by an Operator to the payment due date and prices for Travel Products are
				not guaranteed until payment has been made in full and documents have been processed by the Operator.
			</P>

			<H3>4. Price and Itineraries</H3>
			<P>
				The Travel Products offered by the Operator are subject to availability and can be withdrawn without
				notice by the Operator. Travel Products may also change at any time in accordance with the terms and
				conditions you agree with the Operator. The prices for your Travel Products may be subject to variable
				and seasonal pricing, both of which are standard practice within the travel industry. This means the
				prices may vary at any time in accordance with demand, market conditions and availability. It is likely
				that different passengers on the same trip have been charged different prices. The most up to date
				pricing is available on our website. The price of your Travel Product may change at any time up to your
				departure due to unfavourable changes in exchange rates, increases in airfares or other transportation
				costs, increases in local operator costs, taxes, or if Operator or government action should require us
				to do so, even after you have paid all or part of the quoted price for your Travel Product. Transfers to
				a third party or an alternative trip are only permitted when operationally possible and, in the case of
				transferring to a third party, where the transferee meets all the requirements in relation to the trip.
				Certain fees may apply.
			</P>

			<H3>5. Your details</H3>
			<P>
				For us to confirm your travel arrangements, you must provide all requested details with the balance of
				the Travel Product price. Necessary details vary by trip; they may include but are not limited to full
				name as per passport, date of birth, nationality, passport number, passport issue and expiry date and
				any pre-existing medical conditions you have which may affect your ability to complete your travel
				arrangements. On some more demanding trips you may be required to complete and forward a Self-Assessment
				form which will be provided to you by your sales representative. Some Operators will deny carriage if
				the customer's name varies from their booking. We are not liable for any loss or damage arising from the
				incorrect entry of a customer’s name or as a result of the Operator’s policies. For more information
				about how we treat your personal information please refer to our Privacy Policy.
			</P>

			<H3>6. Refunds and cancellations</H3>
			<P>
				All bookings are made on your behalf subject to the Operator Terms and Conditions imposed by the
				relevant Operator. We are only able to provide you with the remedy provided by the Operator (if any,
				which may include a credit to use for future travel supplied by the Operator). If you are eligible for a
				refund in relation to a Travel Product for which payment has been made to the Operator, we will not
				provide a refund to you until we receive the funds from the Operator to return to you. In the event of a
				force majeure event making it impossible or unsafe for an Operator to deliver all or part of any Travel
				Product, we will use our reasonable endeavours to assist you to obtain a refund from the Operator.
				Depending on the circumstances, losses may amount to a proportion of the booking price. We will use our
				reasonable endeavours to minimise losses incurred by you.
			</P>

			<H3>7. Our liability to you</H3>
			<P>
				Because we provide you with the Booking Services and you pay us for acquiring the Booking Services only,
				we are liable to you in accordance with these terms and conditions for any breaches of our obligations
				in providing the Booking Services to you. Subject to the application of consumer guarantees which may be
				implied into the supply of the Booking Services to you, we are not otherwise liable to you or anyone
				else (including for negligence, breach of contract or tort) for any loss or damage (including specific,
				direct, indirect, consequential, economic loss, incidental damages, lost profits or savings or damages
				for disappointment) which is suffered directly or indirectly in connection with the: use of (or
				inability to use), including a disruption to the Booking Services; the delivery or non-delivery of the
				Travel Product; or any act or omission of the Operator or other third parties. Our liability will also
				be limited to the extent that any relevant international conventions, for example the Montreal
				Convention in respect of travel by air, the Athens Convention in respect of travel by sea, the Berne
				Convention in respect of travel by rail and the Paris Convention in respect of the provision of
				accommodation, limit the amount of compensation which can be claimed for death, injury, or delay to
				passengers and loss, damage and delay to luggage. Nothing in these terms and conditions is intended to
				exclude or restrict the application of: consumer guarantees under consumer protection laws (including
				Australian Consumer Law) but we do not give any guarantee or warranty and do not make any representation
				of any kind, express or implied, with respect to use of the Booking Services supplied by us outside
				these laws; or any package travel regulations or other consumer protections that may apply to your
				booking. All information relating to a Travel Product or an Operator is provided by the Operators or
				other independent third parties. We are not responsible for and make no warranty or representation about
				such information including the standard, class, or description of accommodation or services provided by
				the Operators.
			</P>

			<H3>8. The liability of Operator</H3>
			<P>
				Your legal rights in connection with the provision of the Travel Products are against the Operator and,
				except to the extent a problem is caused by fault on our part, are not against us. Specifically, if for
				any reason (excluding fault on our part) the Operator is unable to provide the Travel Product for which
				you have contracted, your rights are against the Operator and not against us. Any loss or risk from any
				Operator or Travel Product lies solely with you, whether arising from, but not limited to, insolvency,
				winding up, bankruptcy or similar.
			</P>

			<H3>9. Indemnity</H3>
			<P>
				You indemnify us (and all of our subsidiaries, officers, employees, contractors and agents) against all
				losses, claims actions, proceedings, liabilities, damages, costs and expenses (including legal fees)
				arising from any claim by a third party arising directly or indirectly out of or in connection with:
				your access or use of the Booking Services, this includes your delegate’s access or use of the Booking
				Services through any means provided to you; and from any claim arising from your travel arrangements
				including but not limited to any claim in relation to any Operator or Travel Product.
			</P>

			<H3>10. Acceptance of risk</H3>
			<P>
				You acknowledge that the nature of your Travel Product may be adventurous and participation involves a
				degree of personal risk. You may be visiting places where the political, cultural and geographical
				attributes present dangers and physical challenges greater than those present in our daily lives. You
				also acknowledge that you are choosing to travel at a time where you may be exposed to the COVID-19
				virus. It is your own responsibility to acquaint yourself with all relevant travel information,
				including applicable health risks. You acknowledge that your decision to travel is made based on your
				own consideration of this information, and you acknowledge and agree that you are aware of, and assume
				responsibility for, the risks associated with traveling at this time. You acknowledge that you may be
				required to follow additional policies or requirements in order to travel during this time. To the
				fullest extent permitted by law, we accept no liability in relation to these additional risks.
			</P>

			<H3>11. Passports and visas</H3>
			<P>
				It is your responsibility to obtain information and to have in your possession all the required
				documentation and identification required for entry, departure and travel to each country or region you
				visit on your trip. This includes a valid passport and all travel documents required by the relevant
				governmental authorities including all visas, permits and certificates (including but not limited to
				vaccination or medical certificates) and insurance policies. Your passport must be valid 6 months after
				the last date of travel with is as set out on your itinerary. You accept full responsibility for
				obtaining all such documents, visas and permits prior to the start of the trips, and you are solely
				responsible for the full amount of costs incurred as a result of missing or defective documentation. You
				agree that you are responsible for the full amount of any loss or expense incurred by us that is a
				direct result of your failure to secure or be in possession of proper travel documentation.
			</P>

			<H3>12. Travel insurance</H3>
			<P>
				Travel insurance is mandatory and must be taken out at the time of booking. The specific insurance cover
				required for your Travel Product will be set out in the Operator Terms and Conditions and may vary
				between Travel Products. You are also strongly advised to take out cancellation insurance at the time of
				booking. We are not responsible for any failure by you to acquire adequate insurance cover.
			</P>

			<H3>13. Privacy policy</H3>
			<P>
				Any personal information that we collect about you will be handled in accordance with our Privacy Policy
				and may be used for any purpose associated with the Booking Services and the delivery of the Travel
				Product. In making this booking you consent to this information being passed on to the Operator and any
				other relevant persons to enable us to provide the Booking Services or, if permitted by any relevant
				Spam laws, to send you marketing material in relation to our events and special offers. In particular,
				you agree that in certain circumstances (such as where you request us to book international travel for
				you), we are permitted to disclose your personal information to overseas recipients. Such recipients may
				include the overseas Operators with whom you make a booking. These Operators will in most cases receive
				your personal information in the country in which they will provide the services to you or in which
				their business is based. You are responsible for reviewing this Privacy Policy periodically and
				informing yourself of any changes to this Privacy Policy.
			</P>

			<H3>14. Applicable laws</H3>
			<P>
				The laws of South Australia, Australia govern these Booking Conditions to the fullest extent allowable.
				Any disputes in connection with a trip or these Agency Booking Conditions must be initiated in the
				courts of Victoria, Australia. Nothing in these Booking Conditions, including this clause 14, affects
				your rights as a consumer to rely on any applicable local laws.
			</P>

			<H3>15. Assignment and Registered address</H3>
			<P>
				We can assign or otherwise transfer any of our rights or obligations under these Booking Conditions,
				including novation to a related body corporate (as defined in the Corporations Act 2001 (Cth)), at its
				sole discretion on written notice to You (including notice via the Website). Level 7, 567 Collins St,
				Melbourne VIC, 3000, Australia.
			</P>

			<H3>16. Acknowledgement</H3>
			<P>
				You acknowledge that you are 18 years of age or older and that you understand and agree with the above
				Agency Booking Conditions and our Privacy Policy.
			</P>

			<H2>Standard Booking Conditions — International </H2>
			<P>(Applies to bookings made from all regions except UK and the European Economic Area).</P>
			<P>
				The Booking Conditions in place when you make your booking will apply to your trip. If you are rebooking
				a trip with a credit voucher you will be agreeing to the most current version of the Booking Conditions
				in place when you rebook.
			</P>
			<P>
				If you are booking from the United Kingdom or Europe, please refer to the specific Booking Conditions
				that apply to these regions.
			</P>
			<P>
				Please read and understand the conditions of booking set out below (Booking Conditions) prior to booking
				a trip with us as they set out your legal rights and obligations in relation to your booking.
			</P>
			<P>
				Please also read the Essential Trip Information and Important Notes relating to your trip prior to
				booking to ensure that you understand the itinerary, style and physical demands of the trip you are
				undertaking. The Essential Trip Information and Important Notes relevant to your Trip are located on our
				website.
			</P>
			<P>For any additional terms that may apply to your trip please also see the Special Conditions.</P>

			<H3>1. Our contract </H3>
			<P>
				Your booking contract is with your local <B>Escape Roots</B> entity as set out in clause 25, acting as
				agent for <B>Escape Roots</B> Pty Ltd (ABN 35 007 172 456) (us/we/our). By booking a trip with us you
				have agreed to be bound by the terms and conditions set out in:{" "}
			</P>
			<Ul>
				<Li>these Booking Conditions;</Li>
				<Li>Essential Trip Information and Important Notes that apply to your trip; and </Li>
				<Li>any Special Conditions that may apply,</Li>
			</Ul>
			<P>(all of which constitutes the entire agreement between you and us). </P>
			<P>
				Your booking will be accepted by us on this basis. The services to be provided are those referred to in
				your booking confirmation invoice. In these Booking Conditions references to "you" and "your" include
				the first named person on the booking and all persons on whose behalf a booking is made or any other
				person to whom a booking is added or transferred.
			</P>
			<P>
				If a booking has been made on your behalf by another individual, then you agree that the individual who
				made the booking may make amendments to your booking or cancel your booking on your behalf.{" "}
			</P>
			<P>
				If you are making a booking on behalf of another individual, you must ensure that you inform them, prior
				to making the booking, of the terms and conditions set out in:
			</P>
			<Ul>
				<Li>these Booking Conditions;</Li>
				<Li>Essential Trip Information and Important Notes that apply to your trip; and</Li>
				<Li>any Special Conditions that may apply.</Li>
			</Ul>

			<H3>2. Privacy policy</H3>
			<P>
				Any personal information that we collect about you will be handled in accordance with our Privacy
				Policy.{" "}
			</P>
			<P>
				If you are providing us with the personal information of another person, such as when you make a booking
				on behalf of a group, request visa support services for others in your group or provide details of an
				emergency contact, you must ensure that you inform these persons of the information that you intend to
				provide to us, and that those you represent are aware of the content of our Privacy Policy and consent
				to your acting on their behalf.{" "}
			</P>
			<P>
				You are responsible for reviewing this Privacy Policy periodically and informing yourself of any changes
				to this Privacy Policy.
			</P>

			<H3>3. Deposit requirement </H3>
			<P>
				You are required to pay a non-refundable deposit for your booking to be confirmed. You are required to
				pay a deposit of AUD400,NZD400, CAD400,USD400, ZAR4000 per person per trip, unless otherwise stated in
				the Special Conditions. If your booking is made within 56 days of the departure date then the full
				amount is payable at the time of booking. Deposit amounts vary for selected trips and special campaigns
				that may be run by us from time to time, as set out in and subject to the Special Conditions.
			</P>

			<H3>4. Acceptance of booking and final payments</H3>
			<P>
				If we accept your booking, we will issue you with a booking confirmation invoice. A contract will exist
				between you and us from the date we issue the confirmation invoice or if you book within 56 days of
				departure the contract will exist when we accept your payment. Please refer to your booking confirmation
				invoice for details regarding final payments, including how to make the payment. Payment of the balance
				of the trip price is due 56 days before the departure date, except as otherwise set out in the Special
				Conditions. If this balance is not paid on or before the due date we reserve the right to treat your
				booking as cancelled and any cancellation charges outlined at clause 7 (Cancellation by You) will apply.
			</P>

			<H3>5. Prices and surcharges </H3>
			<P>
				Our trip prices are subject to variable and seasonal pricing, both of which are standard practice within
				the travel industry. This means our trip prices may vary at any time in accordance with demand, market
				conditions and availability. It is likely that different passengers on the same trip have been charged
				different prices. Your best option if you like the price you see is to book at that time.{" "}
			</P>
			<P>
				Any reduced pricing or discounts that may become available after we have confirmed your booking (in
				accordance with clause 4 (Acceptance of booking and final payments) will not apply. If you wish to
				cancel your booking to take advantage of a cheaper price, full cancellation conditions apply as set out
				below in clause 7 (Cancellation by You). The most up to date pricing is available on our website. Prices
				are based on currency exchange rates as of June 2025; note that prices may vary depending on which
				currency the booking is made. We endeavour to ensure that all pricing and other information on our
				website is accurate. However, it is always possible that, despite our efforts, there may be times when
				obvious errors occur such as the price or some other detail displayed being incorrect. We reserve the
				right to amend advertised prices at any time prior to us sending your booking confirmation invoice.{" "}
			</P>
			<P>
				We reserve the right to impose surcharges up to 56 days before departure due to unfavourable changes in
				exchange rates, increases in airfares or other transportation costs, increases in local operator costs,
				taxes, or if government action should require us to do so. In such instances we will be responsible for
				any amount up to 2% of the trip price and you will be responsible for the balance. If any surcharge
				results in an increase of more than 10% of the trip price you may cancel the booking within 14 days of
				notification of the surcharge and obtain a full refund. Please note that a surcharge may be applied to a
				purchase made by credit card.
			</P>

			<H3>6. Your details</H3>
			<P>
				For us to confirm your travel arrangements, you must provide all requested details with the balance of
				the trip price. Necessary details vary by trip; they include but are not limited to full name as per
				passport, date of birth, nationality, passport number, passport issue and expiry date and any
				pre-existing medical conditions you have which may affect your ability to complete your travel
				arrangements. On some more demanding trips we also require you to complete and forward a Self-Assessment
				form which will be provided to you by your sales representative. For more information about how we treat
				your personal information please refer to our Privacy Policy.
			</P>

			<H3>7. Cancellation by you</H3>
			<P>
				If you cancel some or all portions of your booking the cancellation terms set out below will apply. A
				cancellation will only be effective when we receive written confirmation from you that you wish to
				cancel. If you cancel a trip:{" "}
			</P>
			<P>
				a) 56 days or more prior to departure, we will hold your deposit amount as a credit (Deposit Credit);{" "}
			</P>
			<P>
				b) between 31 and 55 days prior to departure, we charge a cancellation fee of 30% of the total booking
				cost;{" "}
			</P>
			<P>
				c) between 30 and 15 days prior to departure, we charge a cancellation fee of 60% of the total booking
				cost; or{" "}
			</P>
			<P>d) 14 days or fewer prior to departure, we charge a cancellation fee of 100% of the booking cost. </P>
			<P>Any Deposit Credit may not be applied to the same or similar dates of travel.</P>
			<P>
				Note that different cancellation conditions apply to some styles of trips and additional services as set
				out in the Special Conditions and the Essential Trip Information relating to your trip. You are strongly
				advised to take out cancellation insurance at the time of booking. If you leave a trip for any reason
				after it has commenced, we are not obliged to make any refunds for unused services. If you fail to join
				a trip, join it after departure, or leave it prior to its completion, no refund will be made. The above
				cancellation terms are in addition to fees which may be levied by accommodation providers, travel agents
				or third-party tour and transport operator fees. Please refer to clause 20 (Liability), which provides
				more information about your rights under Australian Consumer Law which may apply to your cancellation.
			</P>

			<H3>8. Cancellation by us </H3>
			<P>
				Our trips are guaranteed to depart once they have one fully paid customer unless minimum group size
				specifically states otherwise (which is stated in the trip page or on our website) and subject to
				reasonable itinerary changes as described in these Booking Conditions. In the event that we cancel your
				trip, you can transfer amounts paid to an alternate departure date or receive a refund, unless your trip
				is cancelled due to a Force Majeure Event (as defined below in clause 9).
			</P>

			<H3>9. Cancellations due to Force Majeure </H3>
			<P>
				In addition to the cancellation rights set out above, a trip may be cancelled due to a Force Majeure
				Event occurring at your holiday destination or its immediate vicinity and significantly affecting the
				performance of the holiday or significantly affecting the transport arrangements to the destination.{" "}
			</P>
			<P>
				In these circumstances, <B>Escape Roots</B> will offer you:
			</P>
			<P>a) a 100% credit of money paid for your trip; or </P>
			<P>b) a refund minus unrecoverable costs. </P>
			<P>
				If the cancellation due to a Force Majeure Event occurs after your trip has commenced,{" "}
				<B>Escape Roots</B> will offer you:{" "}
			</P>
			<P>a) 100% credit for the days that remain on your trip; or </P>
			<P>b) refund minus unrecoverable costs of the days that remain on your trip. </P>
			<P>
				A “Force Majeure Event” means any event or circumstance beyond the reasonable control of the parties,
				whether or not foreseeable, which would make it dangerous or not viable for a trip to commence or
				continue and includes but is not limited to: acts of God; war; civil commotion; riot; blockade or
				embargo; fire; explosion; breakdown; union dispute; earthquake; epidemic, pandemic or other health
				emergency; flood; windstorm or other extreme weather event; lack or failure of courses of supply;
				passage of any law, order, proclamation, regulation, ordinance, demand, requisition or requirement or
				any other act of any government authority, beyond the reasonable control of the parties.{" "}
			</P>
			<P>
				In the event of any cancellation, there will be no claim for damages by either party against the other
				and we are not responsible for any incidental expenses that you may have incurred as a result of your
				booking including but not limited to visas, vaccinations, travel insurance excess or non-refundable
				flights.{" "}
			</P>
			<P>
				<B>Important Note regarding credit:</B>
				<br />
				There may be circumstances in which we issue you with credit. For instance, we may offer you the choice
				of a credit voucher instead of a cash refund when you are entitled to a full or partial refund. Unless
				specified otherwise in the Special Conditions, any credit issued under these Booking Conditions:
			</P>
			<Ul>
				<Li>does not have an expiry date; </Li>
				<Li>
					may be applied towards any other available trip offered by us, except in the case of Deposit Credits
					which may not be applied to the same or similar dates of travel of the original booking;{" "}
				</Li>
				<Li>is not transferrable to another person or redeemable for cash; and </Li>
				<Li>may not be used to book flights or insurance as they will have their own booking conditions.</Li>
			</Ul>

			<H3>10. Booking amendments </H3>
			<P>
				Transfers to a third party or an alternative trip are only permitted when operationally possible and, in
				the case of transferring to a third party, where the transferee meets all the requirements in relation
				to the trip. Certain fees may apply.{" "}
			</P>
			<P>No amendments are permitted to your booking within 56 days of departure.</P>

			<H3>11. Inclusions</H3>
			<P>The land price of your trip includes as described in the Essential Trip Information: </P>
			<Ul>
				<Li>all accommodation </Li>
				<Li>all transport </Li>
				<Li>sightseeing and meals </Li>
				<Li>the services of a group leader</Li>
			</Ul>

			<H3>12. Exclusions</H3>
			<P>
				The land price of your trip does not include: international or internal flights unless specified airport
				transfers, taxes and excess baggage charges unless specified meals other than those specified in the
				Essential Trip Information visa and passport fees travel insurance optional activities and all personal
				expenses.
			</P>

			<H3>13. Age & Health requirements </H3>
			<P>
				<B>Minimum Age:</B>
				<br />
				<br />
				For the majority of our trips, the minimum age is 15 at the time of travel. All travellers under the age
				of 18 must be accompanied by a legal guardian, or in lieu of a legal guardian, by an escort over the age
				of 18, appointed by their legal guardian. The legal guardian or their designee will be responsible for
				the traveller under the age of 18’s day to day care. If a legal guardian elects to designate an escort
				in their lieu, they will be required to complete and sign a relevant document, to delegate their
				authority.
			</P>
			<P>
				<B>Maximum Age:</B>
				<br />
				<br />
				For the majority of our trips, we have no upper age limit though we remind you that our trips can be
				physically demanding and passengers must ensure that they are suitably fit to allow full participation.
				We can provide details on mandatory health requirements; however, we are not medical experts. It is your
				responsibility to ensure that you obtain proper and detailed medical advice at least two months prior to
				travel for the latest health requirements and recommendations for your destination.
			</P>
			<P>Please refer to the Special Conditions and the Essential Trip Information that relates to your trip.</P>

			<H3>14. Additional terms </H3>
			<P>For additional terms that apply to certain trips, please see the Special Conditions. </P>
			<P>
				Due to the nature of some of our trips, in addition to these Booking Conditions, you may be required to
				sign and submit a separate waiver, different terms and/ or a release form to a third-party supplier who
				is helping to run your trip. Specifically, the ground suppliers of our trips in North America require a
				waiver to be agreed and signed by you on day 1 of your trip, in order to meet their insurance
				requirements. A copy of this waiver can be provided to you prior to departure on request.{" "}
			</P>
			<P>
				To the extent there are any inconsistencies between the terms of these Booking Conditions and the
				supplemental waiver, the terms of these Booking Conditions shall prevail and supersede any supplemental
				waiver. We reserve the right to deny participation to you if you have not signed a waiver.
			</P>

			<H3>15. Passport and visas </H3>
			<P>
				It is your responsibility to obtain information and to have in your possession all the required
				documentation and identification required for entry, departure and travel to each country or region you
				visit on your trip. This includes a valid passport and all travel documents required by us and/or the
				relevant governmental authorities including all visas, permits and certificates (including but not
				limited to vaccination or medical certificates) and insurance policies. Your passport must be valid 6
				months after the last date of travel with is as set out on your itinerary. You accept full
				responsibility for obtaining all such documents, visas and permits prior to the start of the trips, and
				you are solely responsible for the full amount of costs incurred as a result of missing or defective
				documentation. You agree that you are responsible for the full amount of any loss or expense incurred by
				us that is a direct result of your failure to secure or be in possession of proper travel documentation.
			</P>

			<H3>16. Travel insurance </H3>
			<P>
				Travel insurance is mandatory for all our travellers and must be taken out at the time of booking. Your
				travel insurance must provide cover against personal accident, death, medical expenses and emergency
				repatriation with a recommended minimum coverage of US$200,000 for each of the categories of cover. We
				also strongly recommend it covers cancellation, curtailment, personal liability and loss of luggage and
				personal effects. You must provide your travel insurance policy number and the insurance company's
				24-hour emergency contact number on the first day of your trip; you will not be able to join the trip
				without these details. If you have travel insurance connected to your credit card or bank account please
				ensure you have details of the participating insurer, the insurance policy number and emergency contact
				number with you rather than the bank's name and credit card details.
			</P>

			<H3>17. Change of itinerary </H3>
			<P>
				You appreciate and acknowledge that the nature of this type of travel requires considerable flexibility
				and you should allow for alternatives. The itinerary provided for each trip is representative of the
				types of activities contemplated, but it is understood that the route, schedules, itineraries, amenities
				and mode of transport may be subject to alteration without prior notice due to local circumstances or
				events.{" "}
			</P>
			<P>
				While we endeavour to operate all trips as described we reserve the right to change the trip itinerary.
				Please refer to our website before departure for the most recent updates to your itinerary.
			</P>
			<P>
				<B>Before departure:</B> If we make a significant change we will inform you as soon as reasonably
				possible if there is time before departure. The definition of a significant change is deemed to be a
				change affecting at least one day in five of the itinerary. When a significant change is made you may
				choose between accepting the change and paying any additional costs associated with the change,
				obtaining a refund of money paid on the land portion of the trip only or accepting an alternative trip
				offered.
			</P>
			<P>
				<B>After departure:</B> We reserve the right to change an itinerary after departure due to local
				circumstances or a Force Majeure Event. In such emergency circumstances, the additional cost of any
				necessary itinerary alterations will be covered by you.
			</P>
			<P>
				Please note we are not responsible for any incidental expenses that may be incurred as a result of any
				change in itineraries including but not limited to visas, vaccinations or non-refundable or
				non-changeable flights.
			</P>

			<H3>18. Authority on tour</H3>
			<P>
				Our trips are generally run by group leaders, local representatives, crews or skippers (Leaders). The
				decision of the Leader is final on all matters likely to affect the safety or well-being of any
				traveller or staff member participating in the trip. If you fail to comply with a decision made by a
				Leader, interfere with the well-being of the group or our ability to run a trip as planned, the Leader
				may direct you to leave the trip immediately, with no right of refund. We may also elect not to carry
				you on any future trips booked. You must at all times comply with the laws, customs, foreign exchange
				and drug regulations of all countries visited, and you also agree to travel in accordance with our
				Responsible Travel Guidelines.
			</P>

			<H3>19. Acceptance of risk </H3>
			<P>
				You acknowledge that the nature of the trip may be adventurous and participation involves a degree of
				personal risk. You may be visiting places where the political, cultural and geographical attributes
				present dangers and physical challenges greater than those present in our daily lives.{" "}
			</P>
			<P>
				You acknowledge that you are choosing to travel at a time where you may be exposed to the COVID-19
				virus. We will take all reasonable steps to ensure your safety and may require you to follow additional
				safety protocols on your trip.{" "}
			</P>
			<P>
				We use information from government foreign departments and reports from our own contacts in assessing
				whether the itinerary should operate. However, it is also your own responsibility to acquaint yourself
				with all relevant travel information, including applicable health risks and the nature of your
				itinerary. You acknowledge that your decision to travel is made in light of consideration of this
				information and you accept that you are aware of the personal risks attendant upon such travel. To the
				fullest extent permitted by law, we accept no liability in relation to these additional risks.
			</P>

			<H3>20. Liability and service guarantee </H3>
			<P>
				Our services which include our trips (“Services”) may come with guarantees that cannot be excluded under
				Australian Consumer Law.
			</P>
			<P>
				“Australian Consumer Law” means the uniform consumer protection law set out in Schedule 2 of the
				Competition and Consumer Act 2010 (Cth) (the CCA).{" "}
			</P>
			<P>
				20.1 To the maximum extent permitted by law (including the CCA) we exclude all liability whatsoever to
				you or any other person (whether in contract tort or otherwise) for any loss (whether direct, indirect,
				consequential) including death or personal injury or damage of any kind that may be suffered as a result
				of any act or omission whether negligent or otherwise by or on behalf of us in connection with the
				Services or any other matter or thing relating to these Booking Conditions except to the extent that
				such loss or damage is incurred as a direct result of our fraud or wilful misconduct. This clause does
				not limit or exclude your rights under the CCA.{" "}
			</P>
			<P>
				20.2 (Limitation of Liability) Where the law implies a warranty into these Booking Conditions which may
				not lawfully be excluded (in particular warranties under the CCA) our liability for breach of such a
				warranty will be limited to either supplying the Services again or payment of the cost of having the
				services supplied again.{" "}
			</P>
			<P>
				20.3 (Indemnity) You indemnify us (and all of our subsidiaries, officers, employees, contractors and
				agents) against all losses, claims actions, proceedings, damages, costs and expenses (including legal
				fees) arising from any claim by a third party arising directly or indirectly out of or in connection
				with:{" "}
			</P>
			<P>
				(a) your access or use of the Services, this includes your delegate’s access or use of the Services; and{" "}
			</P>
			<P>(b) any breach by you (or your delegate) of: </P>
			<P>(i) these Booking Conditions; or </P>
			<P>(ii) any additional terms applicable to providing the Services,</P>
			<P>except to the extent that such loss or damage as a direct result of our fraud or willful misconduct. </P>
			<P>
				20.4 (Third parties) We contract with a network of companies, activity providers, accommodation
				providers, airlines, coach and transfer companies, tour and local guides, government agencies,
				independent contractors and individuals to assist in the running of our trips as agent for these third
				parties (Third Party Supplier). Third Party Suppliers may also engage the services of local operators
				and sub-contractors. Although we take all reasonable steps to select reputable Third Party Suppliers, we
				cannot be responsible for their acts or omissions. Any services provided by Third Party Suppliers may be
				subject to the terms and conditions imposed by these Third Party Suppliers and you may be required to
				sign additional terms as set out in clause 14. These may limit or exclude the liability of the Third
				Party Supplier. You acknowledge that Third Party Suppliers operate in compliance with the applicable
				laws of the countries in which they operate and we do not warrant that any Third Party Supplier is in
				compliance with the laws of your country of residence or any other jurisdiction.{" "}
			</P>
			<P>
				We are not responsible for the acts and omissions, whether negligent or otherwise, of these Third
				Parties Suppliers. Any disputes between you and any third party, are to be resolved solely between you
				and that party.{" "}
			</P>
			<P>
				20.5 (Vicarious liability) We shall not be held vicariously liable for the intentional or negligent acts
				of any persons not employed by us nor for any intentional or negligent acts of our employees committed
				while off duty or outside the course and scope of their employment.
			</P>

			<H3>21. Optional activities </H3>
			<P>
				Optional activities not included in the trip price do not form part of the trip or this contract. You
				accept that any assistance, recommendations or advice given by your group leader or local representative
				in arranging optional activities (including before or after a trip) does not render us liable for them
				in any way. The contract for the provision of that activity will be between you and the activity
				provider.
			</P>

			<H3>22. Claims & complaints </H3>
			<P>
				If you have a complaint about your trip please inform your group leader or our local representative at
				the time so that they can attempt to rectify the matter. If you believe that your complaint has not been
				resolved through these means then any further complaint should be put in writing to us within 30 days of
				the end of the trip through our General Enquiries page.
			</P>

			<H3>23. Severability </H3>
			<P>
				In the event that any term or condition contained in these Booking Conditions is unenforceable or void
				by operation of law or as being against public policy or for any other reason then such term or
				condition shall be deemed to be severed from this contract or amended accordingly only to such extent
				necessary to allow all remaining terms and conditions to survive and continue as binding.
			</P>

			<H3>24. Applicable law </H3>
			<P>
				The laws of South Australia, Australia govern these Booking Conditions to the fullest extent allowable.
				Nothing in these Booking Conditions, including this clause 24, affects your rights as a consumer to rely
				on any applicable local laws.
			</P>

			<H3>25. Assignment and Registered address </H3>
			<P>
				We can assign or otherwise transfer any of our rights or obligations under these Booking Conditions,
				including novation to a related body corporate (as defined in the Corporations Act 2001 (Cth)), at its
				sole discretion on written notice to You (including notice via the Website).{" "}
			</P>

			<H3>26. Booking entity </H3>
			<P>
				Depending on the country or region you are making your booking from, you will be booking through the
				following <B>Escape Roots</B> entity acting as an agent on behalf of <B>Escape Roots</B> Pty Ltd (ABN 35
				007 172 456):{" "}
			</P>
			<Ul>
				<Li>
					Australia: <B>Escape Roots</B> Australia Pty Ltd
				</Li>
			</Ul>

			<H3>26. Promotional terms </H3>
			<P>
				From time to time, we may run promotions and special offers (Promotions) on our website which are
				subject to both these Booking Conditions and any additional promotion-specific terms which are
				incorporated into these Booking Conditions by reference. You should ensure that you read the specific
				conditions that apply to each Promotion.{" "}
			</P>
			<P>
				Promotions are available for a limited time, as defined on our website. We reserve the right to cancel
				or change any Promotion at any time in our discretion. By purchasing a trip on a promotional basis, you
				agree and accept the terms that apply to the applicable Promotion. In the event of any inconsistencies
				between these Booking Conditions and the Promotional terms, the Promotional terms apply to your booking.
			</P>
		</div>
	);
}

export default TermsAndConditions;
