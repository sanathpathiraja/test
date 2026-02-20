import React, { Suspense } from "react";
import Container from "../../Container";
import { endpoints } from "@/lib/consts";
import SearchTripBar from "./SearchTripBar";
import { CountryType, ResponseType } from "@/lib/types";
import Loading from "@/components/Loading";

async function Hero() {
  let countries: CountryType[] = [];

  try {
    const response = await fetch(endpoints.trips.countries, {
      next: { revalidate: 300 },
	  cache: "no-store", // prevents build-time failures
    });

    if (!response.ok) {
      console.error("Hero: failed to fetch countries");
    } else {
      const data = (await response.json()) as ResponseType<CountryType[]>;
      countries = data?.data ?? [];
    }
  } catch (err) {
    console.error("Hero fetch error:", err);
  }

  return (
    <section className="w-full h-screen flex items-center justify-center relative shadow-2xl">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/home-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-[#0b4525d3] to-[#66666600]" />

      <Container
        className="w-full"
        containerClassName="w-full h-full flex flex-col items-center justify-center relative z-10"
      >
        <div className="w-full">
          <div className="w-full flex flex-col items-center relative">
            <img
              src="/svg/flight-travel.svg"
              alt="Flight Travel"
              className="absolute -top-44 rotate-3 drop-shadow-md"
            />
            <h1 className="text-[54px] leading-none sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center font-dm-serif-display">
              Holiday Beyond
              <br />
              Imagination
            </h1>
          </div>

          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center mt-8">
                <Loading />
              </div>
            }
          >
            <SearchTripBar
              countries={countries.map((country) => ({
                label: country.name,
                value: country.id,
              }))}
            />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
