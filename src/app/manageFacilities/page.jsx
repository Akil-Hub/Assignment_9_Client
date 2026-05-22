import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RemoveFacilityDialog } from "@/components/common/RemoveFacilityDialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  Pencil,
  MapPin,
  Clock,
  Tag,
  Plus,
  Building2,
  BadgeCheck,
} from "lucide-react";

const OwnerFacilitiesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id } = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/allFacilities`,
    {
      cache: "no-store",
    }
  );

  const facilities = await res.json();

  const myFacilities = facilities.filter(
    (facility) => facility.ownerId === id
  );

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-5xl mx-auto mt-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-500" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                My Facilities
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                {myFacilities.length} facilit
                {myFacilities.length === 1 ? "y" : "ies"} listed
              </p>
            </div>
          </div>

          <Link href="/addFacilities">
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white rounded-xl px-5 py-2 text-sm font-medium shadow-lg shadow-green-900/30">
              <Plus className="w-4 h-4 mr-1" />
              Add Facility
            </Button>
          </Link>
        </div>

        {/* Empty State */}
        {myFacilities.length === 0 && (
          <div className="flex flex-col items-center justify-center border border-dashed border-gray-800 rounded-3xl py-20 px-6 text-center bg-gray-900/70 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
              <Building2 className="w-8 h-8 text-green-500" />
            </div>

            <h2 className="text-xl font-semibold text-white mb-2">
              No facilities yet
            </h2>

            <p className="text-sm text-gray-500 mb-6 max-w-sm">
              Start by adding your first sports facility and manage bookings
              easily.
            </p>

            <Link href="/addFacilities">
              <Button className="bg-green-600 hover:bg-green-500 text-white text-sm px-5 py-2 rounded-xl">
                <Plus className="w-4 h-4 mr-1" />
                Add Facility
              </Button>
            </Link>
          </div>
        )}

        {/* Facility Cards */}
        <div className="grid grid-cols-1 gap-6">
          {myFacilities.map((facility) => (
            <div
              key={facility._id}
              className="group overflow-hidden bg-gray-900/80 border border-gray-800 rounded-3xl hover:border-green-500/40 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row">

                {/* Facility Image */}
                <div className="relative lg:w-80 w-full h-80 overflow-hidden bg-gray-800">
                  {facility.imageUrl ? (
                    <Image
                      src={facility.imageUrl}
                      alt={facility.facility_name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">

                  <div>
                    {/* Top */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h2 className="text-xl font-semibold text-white">
                        {facility.facility_name}
                      </h2>

                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                        <BadgeCheck className="w-3 h-3" />
                        Active
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2">
                      {facility.description}
                    </p>

                    {/* Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4 text-green-500" />
                        {facility.location}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4 text-green-500" />
                        ${facility.price_per_hour}/hr
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Tag className="w-4 h-4 text-green-500" />
                        {facility.facility_type}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Building2 className="w-4 h-4 text-green-500" />
                        Capacity: {facility.capacity}
                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className=" gap-3 mt-6">

                    <Link
                      href={`/manageFacilities/${facility._id}`}
                    >
                      <Button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 rounded-xl px-4 py-2 text-sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </Link>

                    <RemoveFacilityDialog
                      id={facility._id}
                      facilityName={facility.facility_name}
                      className="
                        w-full
                        h-10
                        text-xs
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        text-red-400
                        hover:bg-red-500/20
                        transition-all
                        px-3
                      "
                    />

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OwnerFacilitiesPage;