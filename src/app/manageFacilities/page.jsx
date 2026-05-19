import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RemoveFacilityDialog } from "@/components/common/RemoveFacilityDialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Pencil, MapPin, Clock, Tag } from "lucide-react";

const OwnerFacilitiesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id } = session?.user;

  const res = await fetch(`http://localhost:5000/allFacilities`);
  const facilities = await res.json();

  const myFacilities = facilities.filter(
    (facility) => facility.ownerId === id
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">
      <div className="max-w-4xl mx-auto mt-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Facilities
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {myFacilities.length} facilit{myFacilities.length === 1 ? "y" : "ies"} listed
            </p>
          </div>
          <Link href="/addFacilities">
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-2 text-sm font-medium">
              + Add Facility
            </Button>
          </Link>
        </div>

        {/* Empty State */}
        {myFacilities.length === 0 && (
          <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl py-16 px-6 text-center bg-white dark:bg-gray-900">
            <div className="text-4xl mb-4">🏟️</div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
              No facilities yet
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Start by adding your first sports facility.
            </p>
            <Link href="/addFacilities">
              <Button className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-lg">
                Add Facility
              </Button>
            </Link>
          </div>
        )}

        {/* Facility Cards */}
        <div className="flex flex-col gap-4">
          {myFacilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-green-400 dark:hover:border-green-700 transition-colors duration-200"
            >
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-green-50 dark:bg-green-950 flex items-center justify-center shrink-0">
                <span className="text-2xl">🏟️</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                    {facility.facility_name}
                  </h2>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    Active
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-3">
                  {facility.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin size={12} />
                    {facility.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} />
                    ৳{facility.price_per_hour}/hr
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Tag size={12} />
                    {facility.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col gap-2 shrink-0">
                <Link href={`/manageFacilities/${facility._id}`} className="flex-1 sm:flex-none">
                  <Button
                    
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-1.5 h-8 rounded-lg border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Pencil size={13} />
                    See Details
                  </Button>
                </Link>

                <div className="flex-1 sm:flex-none">
                  <RemoveFacilityDialog
                  className={'w-35 h-12 mt-5 bg-red-700 text-white text-xs rounded-2xl '}
                    id={facility._id}
                    facilityName={facility.facility_name}
                    triggerClassName="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-1.5 h-8 rounded-lg border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  />
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