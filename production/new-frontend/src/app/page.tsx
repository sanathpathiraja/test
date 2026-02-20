export const revalidate = 300;
import Hero from "@/components/home/section1/Hero";
import TravelDeals from "@/components/home/section2/TravelDeals";
import PerfectHoliday from "@/components/home/section3/PerfectHoliday";
import JustForYou from "@/components/home/section4/JustForYou";
import DiscoverWorldBest from "@/components/home/section5/DiscoverWorldBest";
import Reviews from "@/components/home/section6/Reviews";

function Home() {
  return (
    <main className="w-full">
      <Hero />
      <TravelDeals />
      <PerfectHoliday />
      <JustForYou />
      <DiscoverWorldBest />
      <Reviews />
    </main>
  );
}

export default Home;
