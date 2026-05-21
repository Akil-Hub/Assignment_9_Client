"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TennisClub() {
  return (
    <section className="wrapper py-16 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
<div className="grid grid-cols-2 gap-3 h-[500px]">
  <div className="relative rounded-lg overflow-hidden">
    <Image fill src="/tennis/tennis1.png" alt="tennis" className="object-cover rounded-lg  hover:scale-105 transition-all duration-500" />
  </div>

  <div className="flex flex-col gap-3">
    <div className="relative flex-1 rounded-lg overflow-hidden">
      <Image fill src="/tennis/tennis2.png" alt="tennis" className="object-cover rounded-lg  hover:scale-105 transition-all duration-500" />
    </div>
    <div className="relative flex-1 rounded-lg overflow-hidden">
      <Image fill src="/tennis/tennis3.png" alt="tennis" className="object-cover rounded-lg  hover:scale-105 transition-all duration-500" />
    </div>
  </div>
</div>
        <div className="flex flex-col gap-5">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm">
            World Class Facilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Experience Tennis <br /> Like Never Before
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Our state-of-the-art tennis club offers premium courts, professional coaching, 
            and a vibrant community for players of all skill levels. Whether you're a 
            beginner picking up a racket for the first time or a seasoned pro, we have 
            everything you need to elevate your game.
          </p>
          <ul className="flex flex-col gap-2 text-muted-foreground">
            <li className="flex items-center gap-2"> 10+ Professional Courts</li>
            <li className="flex items-center gap-2"> Expert Coaching Staff</li>
            <li className="flex items-center gap-2"> Easy Online Booking</li>
            <li className="flex items-center gap-2"> Open 7 Days a Week</li>
          </ul>
          <div className="flex gap-4 mt-2">
            <Button size="lg">Book a Court</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>

      </div>
    </section>
  );
}