"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import Container from "@/components/Container";
import { endpoints } from "@/lib/consts";
import { CustomerBookingDetailsType, ResponseType } from "@/lib/types";
import Loading from "@/components/Loading";
import BookNowCard from "@/components/book-now/BookNowCard";
import { DetailsCard } from "@/components/book-now/Stage2";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="w-full flex items-center text-base py-2">
      <div className="w-full flex max-w-48 min-w-30">
        <label className="font-semibold">{label}</label>
      </div>
      <div className="flex-grow">
        <p>{value}</p>
      </div>
    </div>
  );
}

const tabAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: "easeInOut" as const },
};

function OverviewsTab({ details }: { details: CustomerBookingDetailsType }) {
  const overviews = [
    {
      label: "Booking Ref",
      value: details.bookingOverview.bookingRef,
    },
    {
      label: "Booked By",
      value: details.bookingOverview.primaryUser || "N/A",
    },
    {
      label: "Status",
      value: details.bookingOverview.bookingStatus,
    },
    {
      label: "Total Amount",
      value: details.bookingOverview.totalAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "AUD",
      }),
    },
    {
      label: "Fully paid",
      value: details.bookingOverview.fullyPaid ? "Yes" : "No",
    },
    {
      label: "Paid Amount",
      value: details.bookingOverview.paidAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "AUD",
      }),
    },
    {
      label: "Trip",
      value: details.bookingOverview.tripName,
    },
    {
      label: "Start Date",
      value: format(
        new Date(details.bookingOverview.preferredStartDate),
        "dd MMM yyyy",
      ),
    },
    {
      label: "Duration",
      value: `${details.bookingOverview.duration} Days`,
    },
    {
      label: "Tour Status",
      value: details.bookingOverview.tourStatus,
    },
    {
      label: "Created At",
      value: format(
        new Date(details.bookingOverview.createdDate),
        "dd MMM yyyy",
      ),
    },
    {
      label: "Contact Email",
      value: details.bookingOverview.primaryEmail || "N/A",
    },
  ];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Overview</h2>
      <div className="w-full">
        {overviews.map((overview, index) => (
          <DetailRow
            key={index}
            label={overview.label}
            value={overview.value}
          />
        ))}
      </div>
    </div>
  );
}
function TravelersTab({ details }: { details: CustomerBookingDetailsType }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Travelers</h2>
      <h3 className="text-xl">
        No Of Travelers ({details.bookingPersons.length})
      </h3>
      <div className="w-full flex flex-col pb-8 border-b border-gray-200 mt-4">
        {details.bookingPersons.map((traveler, index) => (
          <DetailsCard
            traveler={{
              contactNumber: traveler.contactNo,
              country: { label: "", value: "" },
              email: traveler.email,
              fullName: traveler.fullName,
              gender: "other",
              passportNumber: traveler.passportNo,
              passportExpiry: new Date(traveler.passportExpiryDate),
              travelerType: traveler.isChild ? "child" : "adult",
            }}
            primary={traveler.isPrimary}
            amount={traveler.amount}
            key={index}
          />
        ))}
      </div>
      <div className="pt-8 w-full flex items-center justify-between">
        <label className="text-2xl font-semibold">Total Amount (A$)</label>
        <p className="text-2xl font-semibold">
          {details.bookingPayments[0].amount.toLocaleString("en-US", {
            style: "currency",
            currency: "AUD",
          })}
        </p>
      </div>
    </div>
  );
}
function PaymentTab({ details }: { details: CustomerBookingDetailsType }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Payment Details</h2>
      <div className="w-full pb-8 border-b border-gray-200">
        <DetailRow
          label="Total Amount"
          value={details.bookingPayments[0].amount.toLocaleString("en-US", {
            style: "currency",
            currency: "AUD",
          })}
        />
        <DetailRow
          label="Paid Amount"
          value={details.bookingPayments[0].amount.toLocaleString("en-US", {
            style: "currency",
            currency: "AUD",
          })}
        />
        <DetailRow
          label="Fully Paid"
          value={
            details.bookingPayments[0].isSuccessfull ? (
              <span className="text-primary">Yes</span>
            ) : (
              <span className="text-red-500">No</span>
            )
          }
        />
      </div>
      <h2 className="text-3xl font-bold mb-4 mt-8">Payment Summary</h2>
      <table className="w-fit border-collapse rounded-lg overflow-hidden md:block hidden mt-4">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-4 text-center border-r border-white">Payment</th>
            <th className="p-4 text-center border-r border-white">
              Payment Status
            </th>
            <th className="p-4 text-center border-r border-white">Paid On</th>
            <th className="p-4 text-center border-r border-white">
              Description
            </th>
            <th className="p-4 text-center border-r border-white">Amount</th>
          </tr>
        </thead>
        <tbody>
          {details.bookingPayments.map((payment, index) => (
            // border right need to be added to the every
            <tr key={index} className="bg-primary/10 text-center">
              <td className="p-4 border-r border-white">{index + 1}</td>
              <td className="p-4 border-r border-white">
                {payment.isSuccessfull ? (
                  <span className="text-primary">Success</span>
                ) : (
                  <span className="text-red-500">Failed</span>
                )}
              </td>
              <td className="p-4 border-r border-white">
                {format(new Date(payment.paymentDate), "dd MMM yyyy")}
              </td>
              <td className="p-4 border-r border-white">
                {payment.description}
              </td>
              <td className="p-4 border-r border-white">
                {payment.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "AUD",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-full border-collapse rounded-lg overflow-hidden md:hidden block bg-primary/10 overflow-x-auto theme-scrollbar">
        <tbody className="w-full">
          <tr className="w-full border-b border-white">
            <td className="p-4 bg-primary text-white">
              <div className="min-w-32">Payment</div>
            </td>
            <td className="p-4 w-full">
              <div className="min-w-42">1</div>
            </td>
          </tr>
          <tr className="w-full border-b border-white">
            <td className="p-4 bg-primary text-white">Payment Status</td>
            <td className="p-4 ">
              {details.bookingPayments[0].isSuccessfull ? (
                <span className="text-primary">Success</span>
              ) : (
                <span className="text-red-500">Failed</span>
              )}
            </td>
          </tr>
          <tr className="w-full border-b border-white">
            <td className="p-4 bg-primary text-white">Paid On</td>
            <td className="p-4 ">
              {format(
                new Date(details.bookingPayments[0].paymentDate),
                "dd MMM yyyy",
              )}
            </td>
          </tr>
          <tr className="w-full border-b border-white">
            <td className="p-4 bg-primary text-white">Description</td>
            <td className="p-4 ">{details.bookingPayments[0].description}</td>
          </tr>
          <tr className="w-full">
            <td className="p-4 bg-primary text-white">Amount</td>
            <td className="p-4 ">
              {details.bookingPayments[0].amount.toLocaleString("en-US", {
                style: "currency",
                currency: "AUD",
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function page() {
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const email = searchParams.get("email");

  if (!ref || !email) {
    navigation.replace("/404");
  }

  const [bookingDetails, setBookingDetails] =
    useState<CustomerBookingDetailsType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "travelers" | "payment"
  >("payment");

  async function fetchBookingDetails() {
    setLoading(true);
    try {
      const response = await fetch(
        endpoints.bookings.bookingDetails(ref!, email!),
      );
      if (!response.ok) {
        console.error(
          "Failed to fetch booking details",
          response.status,
          response.statusText,
        );
        return navigation.replace("/404");
      }
      const { data } =
        (await response.json()) as ResponseType<CustomerBookingDetailsType>;
      console.log("Booking Details", data);
      setBookingDetails(data);
    } catch (error) {
      console.error("Failed to fetch booking details", error);
      return navigation.replace("/404");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  if (loading) {
    return (
      <Container className="pt-[10vh]">
        <div className="flex items-center justify-center h-[80vh]">
          <Loading />
        </div>
      </Container>
    );
  }
  if (!bookingDetails) {
    return navigation.replace("/404");
  }

  return (
    <main>
      <Container className="pt-[10vh] pb-20">
        <div>
          <h1 className="text-5xl font-dm-serif-display">
            {bookingDetails.bookingOverview.tripName}
          </h1>
          <h3 className="text-2xl font-thin mt-2">
            Booking: {bookingDetails.bookingOverview.bookingRef}
          </h3>
        </div>
        <BookNowCard className="sm:py-8">
          <div className="flex gap-4 pb-8 border-b border-gray-200">
            <button
              className={`px-4 py-2 rounded-sm ${
                activeTab === "overview"
                  ? "bg-primary text-white"
                  : "bg-primary/20 hover:bg-primary/30"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 rounded-sm ${
                activeTab === "travelers"
                  ? "bg-primary text-white"
                  : "bg-primary/20 hover:bg-primary/30"
              }`}
              onClick={() => setActiveTab("travelers")}
            >
              Travelers
            </button>
            <button
              className={`px-4 py-2 rounded-sm ${
                activeTab === "payment"
                  ? "bg-primary text-white"
                  : "bg-primary/20 hover:bg-primary/30"
              }`}
              onClick={() => setActiveTab("payment")}
            >
              Payment
            </button>
          </div>
          <div className="py-8">
            <AnimatePresence mode="wait" key={"booking-details tabs"}>
              {activeTab === "overview" && (
                <motion.div key="overview-tab" {...tabAnimation}>
                  <OverviewsTab details={bookingDetails} />
                </motion.div>
              )}
              {activeTab === "travelers" && (
                <motion.div key="travelers-tab" {...tabAnimation}>
                  <TravelersTab details={bookingDetails} />
                </motion.div>
              )}
              {activeTab === "payment" && (
                <motion.div key="payment-tab" {...tabAnimation}>
                  <PaymentTab details={bookingDetails} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </BookNowCard>
      </Container>
    </main>
  );
}

export default page;
