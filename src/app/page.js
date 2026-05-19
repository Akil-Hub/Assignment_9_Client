import Banner from "@/components/sections/Banner";
import FeaturedFacilities from "@/components/sections/FeaturedFacilities";
import TennisClub from "@/components/TennisClub";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner/>
      <TennisClub/>
      <FeaturedFacilities/>
    </div>
  );
}
