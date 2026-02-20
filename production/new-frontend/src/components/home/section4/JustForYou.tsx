import Container from "@/components/Container";
import React from "react";

// https://www.youtube.com/watch?v=5_pqViaH8-g&ab_channel=EscapeRoots
function JustForYou() {
  return (
    <section className="w-full pb-8 md:mt-0 mt-16">
      <Container
        className="flex flex-col items-center"
        containerClassName="md:px-4 px-0"
      >
        <span className="text-6xl text-center text-forth font-light font-allison px-4 md:px-0">
          Escapes Crafted
        </span>
        <h2 className="font-dm-serif-display text-6xl md:text-7xl font-semibold text-center px-4 md:px-0">
          Just For You
        </h2>
        <p className="text-lg text-center max-w-4xl mt-8 px-4">
          Every Escape Roots journey is one-of-a-kind. Whether you’re dreaming
          of a handpicked adventure from our Aussie-inspired travel collection
          or a fully custom-built trip, we’ll shape the perfect getaway that’s
          all yours—designed with your wanderlust in mind.
        </p>
        <iframe
          className="w-full sm:h-[60vh] h-[35vh] mt-6"
          src="https://www.youtube.com/embed/5_pqViaH8-g?si=VcUm6pJ54nabC61V"
          title="YouTube video player"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Container>
    </section>
  );
}

export default JustForYou;
