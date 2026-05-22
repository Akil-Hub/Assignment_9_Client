import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Trash2 } from "lucide-react";
import DeleteBookingBtn from "@/components/common/DeleteBookingBtn";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
const demoImage = '/badminton2.jpg'
const MyBookingsPage = async () => {

const session = await auth.api.getSession({
    headers: await headers() 
})
const {token} = await auth.api.getToken({
  headers: await headers()
})

const res = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/myBookings`,
  {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
)

  const bookingList = await res.json();
  // console.log(allBooking)
  // const bookingList = allBooking.filter(list=>list.userId===session?.user?.id)
  // console.log(bookingList)
  // console.log(bookingList.length)

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="wrapper mt-20 max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Manage your booked facilities
          </p>
        </div>

        {/* Empty */}
        {bookingList?.length === 0 && (
          <div className="border border-border rounded-xl p-8 text-center">
            No bookings found
          </div>
        )}

        {/* List */}
        <div className="space-y-4">
          {bookingList?.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col md:flex-row gap-4 border border-border rounded-xl overflow-hidden bg-card"
            >
              {/* Image */}
              <div className="relative w-full md:w-56 h-40">
                <Image
                  src={booking.imageUrl?.trim() || demoImage}
                  alt={booking.facility_name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-between gap-3">

                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">
                    {booking.facility_name}
                  </h2>

                  <Badge variant="secondary">Booked</Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {booking.description}
                </p>

                {/* Info */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>{booking.bookingDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{booking.location}</span>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="p-4 flex md:flex-col gap-2 justify-end">
               <DeleteBookingBtn id={booking._id} facilityName={booking.facility_name} />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;