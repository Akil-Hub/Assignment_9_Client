import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";
import { RemoveFacilityDialog } from "@/components/common/RemoveFacilityDialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UpdateForm } from "@/components/common/UpdateForm";

const OwnerFacilitiesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const {id} = session?.user


  const res = await fetch(`http://localhost:5000/allFacilities`);

  const facilities = await res.json();
  console.log(facilities)

  const myFacilities = facilities.filter(facility=> facility.ownerId === id)
  console.log(myFacilities)

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="wrapper max-w-5xl mx-auto mt-20">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Facilities
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Manage your facilities — update or remove anytime
          </p>
        </div>

        {/* Empty */}
        {facilities?.length === 0 && (
          <div className="border border-border rounded-xl p-8 text-center">
            No facilities found
          </div>
        )}

        {/* List */}
        <div className="space-y-4">
          {myFacilities?.map((facility) => (
            <div
              key={facility._id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-border bg-card rounded-xl p-4"
            >

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {facility.facility_name}
                </h2>

                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {facility.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">

                {/* Update Button */}
                <UpdateForm/>

                {/* Remove Button */}
                <RemoveFacilityDialog
                  id={facility._id}
                  facilityName={facility.facility_name}
               />
               

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
   
  );
};

export default OwnerFacilitiesPage;