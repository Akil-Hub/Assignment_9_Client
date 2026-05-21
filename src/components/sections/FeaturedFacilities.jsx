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
} from "lucide-react";

import { Button } from "@/components/ui/button";

const facilities = [
  {
    _id: "1",
    facility_name: "Elite Football Arena",
    category: "Football",
    location: "Mirpur, Dhaka",
    price_per_hour: 1200,
    rating: 4.9,
    reviews: 128,
    badge: "Top Rated",
    icon: Trophy,
  },
  {
    _id: "2",
    facility_name: "Premier Cricket Ground",
    category: "Cricket",
    location: "Uttara, Dhaka",
    price_per_hour: 2500,
    rating: 4.8,
    reviews: 94,
    badge: "Most Booked",
    icon: ShieldCheck,
  },
  {
    _id: "3",
    facility_name: "Pro Badminton Court",
    category: "Badminton",
    location: "Dhanmondi, Dhaka",
    price_per_hour: 800,
    rating: 4.7,
    reviews: 76,
    badge: "Best Value",
    icon: Sparkles,
  },
  {
    _id: "4",
    facility_name: "Olympic Swimming Pool",
    category: "Swimming",
    location: "Gulshan, Dhaka",
    price_per_hour: 1500,
    rating: 4.9,
    reviews: 110,
    badge: "Premium",
    icon: Waves,
  },
  {
    _id: "5",
    facility_name: "Indoor Basketball Court",
    category: "Basketball",
    location: "Banani, Dhaka",
    price_per_hour: 1000,
    rating: 4.6,
    reviews: 58,
    badge: "New",
    icon: Volleyball,
  },
  {
    _id: "6",
    facility_name: "Tennis Academy Court",
    category: "Tennis",
    location: "Bashundhara, Dhaka",
    price_per_hour: 1800,
    rating: 4.8,
    reviews: 82,
    badge: "Top Rated",
    icon: Dumbbell,
  },
];

const badgeStyles= {
  "Top Rated":
    "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  "Most Booked":
    "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  "Best Value":
    "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  Premium:
    "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  New: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300",
};

const iconStyles= {
  Football: "bg-green-50 dark:bg-green-950/40 text-green-600",
  Cricket: "bg-blue-50 dark:bg-blue-950/40 text-blue-600",
  Badminton: "bg-purple-50 dark:bg-purple-950/40 text-purple-600",
  Swimming: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600",
  Basketball: "bg-orange-50 dark:bg-orange-950/40 text-orange-600",
  Tennis: "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600",
};

const features = [
  {
    title: "Instant Booking",
    description:
      "Book your favorite sports facility instantly without any hassle.",
    icon: CalendarCheck,
  },
  {
    title: "Trusted Venues",
    description:
      "Verified and top-rated venues trusted by thousands of players.",
    icon: ShieldCheck,
  },
  {
    title: "Active Community",
    description:
      "Join sports enthusiasts and grow your network through games.",
    icon: Users,
  },
];

const FeaturedFacilities = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-green-600 dark:text-green-400 mb-3">
            Top Picks
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Facilities
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Hand-picked top-rated sports facilities trusted by thousands of
            players across Dhaka.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => {
            const Icon = facility.icon;

            return (
              <div
                key={facility._id}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover:border-green-400 dark:hover:border-green-700 hover:shadow-xl transition-all duration-300"
              >
                {/* Top Icon Block */}
                <div
                  className={`relative flex items-center justify-center h-40 ${iconStyles[facility.category]}`}
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <Icon size={42} strokeWidth={1.8} />
                  </div>

                  {/* Badge */}
                  <span
                    className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                      badgeStyles[facility.badge]
                    }`}
                  >
                    {facility.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {facility.facility_name}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {facility.category}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin
                        size={15}
                        className="text-green-500 shrink-0"
                      />
                      <span>{facility.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock
                        size={15}
                        className="text-green-500 shrink-0"
                      />
                      <span>৳{facility.price_per_hour} / hour</span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star
                        size={15}
                        className="text-yellow-400 fill-yellow-400"
                      />

                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {facility.rating}
                      </span>

                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        ({facility.reviews})
                      </span>
                    </div>

                    <Link href={`/allFacilities/${facility._id}`}>
                      <Button className="h-9 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
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

        {/* Additional Creative Section 1 */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-7 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-5">
                  <Icon
                    size={28}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>

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

        {/* Additional Creative Section 2 */}
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
              Explore premium sports venues across Dhaka and enjoy seamless
              booking experiences with flexible schedules and affordable pricing.
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

          {/* Decorative Blur */}
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-10 w-72 h-72 bg-black/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;