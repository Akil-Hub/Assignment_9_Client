"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Trophy,
  Dumbbell,
  Waves,
  Volleyball,
  ShieldCheck,
  Users,
  CalendarCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



function getBadge(count) {

  


  const n = Number(count);
  if (n >= 100) return { label: "Top Rated", style: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" };
  if (n >= 50) return { label: "Most Booked", style: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" };
  if (n >= 30) return { label: "Popular", style: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" };
  return { label: "Trending", style: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" };
}

const features = [
  { title: "Instant Booking", description: "Book your favorite sports facility instantly without any hassle.", icon: CalendarCheck },
  { title: "Trusted Venues", description: "Verified and top-rated venues trusted by thousands of players.", icon: ShieldCheck },
  { title: "Active Community", description: "Join sports enthusiasts and grow your network through games.", icon: Users },
];



const FeaturedFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const { data: session  } = authClient.useSession();
  

  const router  = useRouter()


  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allFacilities`);

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        const all = Array.isArray(data) ? data : data.facilities;
        const highlyBooked = all
          .filter((f) => Number(f.booking_count) >= 10)
          .sort((a, b) => Number(b.booking_count) - Number(a.booking_count))
        setFacilities(highlyBooked);
      } catch (err) {
        console.error("Failed to fetch facilities:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);
  const handleRedirect= (id) => {
    if (session?.user) {
      router.push(`/allFacilities/${id}`)
    }else{
       router.push('/signIn')

    }
   
  };
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-green-600 dark:text-green-400 mb-3">
            <TrendingUp size={13} />
            Highly Booked
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Facilities
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Hand-picked top-rated sports facilities trusted by thousands of players across Dhaka.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-16 text-red-500 dark:text-red-400">
            <p className="font-medium">Failed to load facilities.</p>
            <p className="text-sm mt-1 text-gray-400">{error}</p>
          </div>
        )}

        {/* Empty */}
        { facilities.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="font-medium">No highly booked facilities found yet.</p>
            <p className="text-sm mt-1">Check back soon — popular venues will appear here.</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
             facilities.map((facility) => {
              const sportType = facility.sports_type || facility.facility_type || "";

              const badge = getBadge(facility.booking_count);

              return (
                <div
                  key={facility._id}
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover:border-green-400 dark:hover:border-green-700 hover:shadow-xl transition-all duration-300"
                >
                  {/* Image / Icon block */}
                  <div className={`relative flex items-center justify-center h-40 overflow-hidden `}>
       
                   
                        <Image
                        fill
                          src={facility.imageUrl}
                          alt={facility.facility_name}
                          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100  duration-300"
                        />
                      
                  
                  
                    <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${badge.style}`}>
                      {badge.label}
                    </span>
                    <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-black/20 text-white backdrop-blur-sm flex items-center gap-1">
                      <TrendingUp size={11} />
                      {facility.booking_count} bookings
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {facility.facility_name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{sportType}</p>
                    </div>

                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin size={15} className="text-green-500 shrink-0" />
                        <span>{facility.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={15} className="text-green-500 shrink-0" />
                        <span>৳{facility.price_per_hour} / hour</span>
                      </div>
                      {facility.available_slots && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <CalendarCheck size={15} className="text-green-500 shrink-0" />
                          <span>{facility.available_slots}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={15} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          {facility.rating ?? "New"}
                        </span>
                        {facility.reviews && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            ({facility.reviews})
                          </span>
                        )}
                      </div>
                      <section onClick={()=>handleRedirect(facility._id)} >
                        <Button className="h-9 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm">
                          Book Now
                        </Button>
                      </section>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {!loading && facilities.length > 0 && (
          <div className="flex justify-center mt-12">
            <Link href="/allFacilities">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-6 py-6 rounded-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
              >
                View All Facilities
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        )}

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-7 hover:shadow-lg transition-all duration-300"
              >
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-24 relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-green-600 to-emerald-500 p-10 md:p-14">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-white/90 text-sm font-medium mb-4">
              <Sparkles size={16} />
              Join The Sports Community
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
              Discover, Book & Play Your Favorite Sports Anytime
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
              Explore premium sports venues across Dhaka and enjoy seamless booking experiences
              with flexible schedules and affordable pricing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/allFacilities">
                <Button className="bg-white text-green-700 hover:bg-gray-100 rounded-full px-6 h-11">
                  Explore Facilities
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-full px-6 h-11 border-white text-white hover:bg-white hover:text-green-700"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-10 w-72 h-72 bg-black/10 rounded-full blur-3xl" />
        </div>

      </div>
    </section>
  );
};

export default FeaturedFacilities;