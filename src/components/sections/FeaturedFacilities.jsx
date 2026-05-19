import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
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
    emoji: "⚽",
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
    emoji: "🏏",
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
    emoji: "🏸",
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
    emoji: "🏊",
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
    emoji: "🏀",
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
    emoji: "🎾",
  },
];

const badgeStyles = {
  "Top Rated": "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  "Most Booked": "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  "Best Value": "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
  "Premium": "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
  "New": "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300",
};

const emojiColors = {
  "⚽": "bg-green-50 dark:bg-green-950",
  "🏏": "bg-blue-50 dark:bg-blue-950",
  "🏸": "bg-purple-50 dark:bg-purple-950",
  "🏊": "bg-cyan-50 dark:bg-cyan-950",
  "🏀": "bg-orange-50 dark:bg-orange-950",
  "🎾": "bg-yellow-50 dark:bg-yellow-950",
};

const FeaturedFacilities = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-600 dark:text-green-400 mb-3">
            Top Picks
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Facilities
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Hand-picked top-rated sports facilities trusted by thousands of
            players across Dhaka.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-green-400 dark:hover:border-green-700 hover:shadow-md transition-all duration-200"
            >
              {/* Top Color Block */}
              <div
                className={`${emojiColors[facility.emoji]} flex items-center justify-center h-36 text-6xl relative`}
              >
                {facility.emoji}
                {/* Badge */}
                <span
                  className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyles[facility.badge]}`}
                >
                  {facility.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                    {facility.facility_name}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                  {facility.category}
                </p>

                {/* Meta */}
                <div className="flex flex-col gap-1.5 mb-4">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin size={12} className="text-green-500 shrink-0" />
                    {facility.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} className="text-green-500 shrink-0" />
                    ৳{facility.price_per_hour} / hour
                  </span>
                </div>

                {/* Rating + CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star
                      size={13}
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
                    <Button
                      size="sm"
                      className="text-xs h-8 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-12">
          <Link href="/allFacilities">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
            >
              View All Facilities
              <ArrowRight size={15} />
            </Button>
          </Link>
        </div>
<p>Tow Additionla creative swectoin is required</p>
      </div>
    </section>
  );
};

export default FeaturedFacilities;