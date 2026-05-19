"use client";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Banner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 60 }, [
    Fade(),
  ]);
  const router = useRouter()

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const slides = [
    "/badminton2.jpg",
    "/hocky2.jpg",
    "/football.jpg",
    "/swiming.jpg",
  ];

  return (
    <div className="relative w-full h-screen ">
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Your Game, Your Court
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl drop-shadow">

          Book, manage, and enjoy top-tier sports facilities — all in one place.
        </p>

        <Button onClick={()=>router.push('/allFacilities')} size="lg" className={'mt-5 w-75 h-14 text-2xl active:scale-90 transition-all duration-300 rounded-xl!'}>Explore Facilities</Button>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Slider */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
         {slides.map((src, idx) => (
  <div key={idx} className="relative flex-[0_0_100%] h-full">
    <img
      src={src}
      alt={`slide-${idx}`}
      loading={idx === 0 ? "eager" : "lazy"}
      className="w-full h-full object-cover"
    />
  </div>
))}
        </div>
      </div>
    </div>
  );
}
