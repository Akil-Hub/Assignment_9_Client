"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Users,
  Mail,
  BarChart2,
  Clock,
  CalendarCheck,
  ArrowLeft,
  Trophy,
  Layers,
} from "lucide-react";
import { DateField, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SPORT_ICONS = {
  Football: "⚽",
  Basketball: "🏀",
  Cricket: "🏏",
  Tennis: "🎾",
  Badminton: "🏸",
};

const SLOT_LABELS = {
  "06:00-08:00": "Early morning",
  "08:00-10:00": "Morning",
  "20:00-22:00": "Night",
};

export default function FacilityDetails({ facility }) {
  const router = useRouter()
  if (!facility) return <p className="mt-30">Loading...</p>;

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDate, setBookingDate] = useState(null);

  const { data: session } = authClient.useSession();
  console.log('this is the user sessioin form navbar',session);
  const {
    _id,
    id,
    facility_name,
    sports_type,
    name,
    facility_type,
    location,
    price_per_hour,
    capacity,
    available_slots,
    description,
    owner_email,
    booking_count,
    imageUrl,
  } = facility;
  const slots = Array.isArray(available_slots)
    ? available_slots
    : typeof available_slots === "string"
      ? available_slots.split(",").map((s) => s.trim())
      : [];
  const toggleSlot = (slot) =>
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );

  const popularityPct = Math.min(100, Math.round((booking_count / 200) * 100));
  const totalCost = selectedSlots.length * price_per_hour;

  const handleBook = async () => {
    console.log('handle book button is clicked')
    const bookingData = {
      userId: session?.user?.id,
      userName: session?.user?.name,

      facility_Id: _id,
      facility_name,
      sports_type,
      facility_type,

      description, 
      owner_email,
      imageUrl,
      location,
      bookingDate: new Date().toLocaleString(),
      selectedSlots
    };

    const res = await fetch("http://localhost:5000/myBookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json()

    if(data){
      toast.success('Facility Booked Successfully.')
      router.push('/myBookings')
    }
  };

  return (
    <div className="min-h-screen bg-background mt-20">
      {/* ── Hero ── */}
      <div className="relative h-64 bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-500 overflow-hidden flex items-end">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={facility_name}
            className="absolute inset-0 w-full h-full object-cover "
          />
        )}

        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white hover:bg-white/20 border border-white/30 z-10"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          Back
        </Button>

        {/* Sport icon */}
        <span
          className="absolute top-4 right-5 text-5xl drop-shadow-xl z-[1]"
          role="img"
          aria-label={sports_type}
        >
          {SPORT_ICONS[sports_type] || "🏟️"}
        </span>

        {/* Title */}
        <div className="relative z-[1] px-6 pb-6 w-full">
          <h1 className="text-4xl font-black tracking-tight text-white leading-none">
            {facility_name}
          </h1>
          <p className="text-white text-lg mt-1.5 font-bold">
            {name} · {id} · {facility_type}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* ── Left: main info ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: <Trophy size={16} />,
                value: `$${price_per_hour}`,
                label: "Per hour",
              },
              {
                icon: <Users size={16} />,
                value: capacity,
                label: "Max players",
              },
              {
                icon: <BarChart2 size={16} />,
                value: booking_count,
                label: "Bookings",
              },
            ].map(({ icon, value, label }) => (
              <Card key={label}>
                <CardContent className="pt-4 pb-3 text-center">
                  <div className="flex justify-center text-emerald-600 mb-1">
                    {icon}
                  </div>
                  <p className="text-2xl font-bold text-emerald-700">{value}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">
                    {label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Facility info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                Facility info
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: <MapPin size={15} />,
                  label: "Location",
                  value: location,
                },
                {
                  icon: <span className="text-sm">⚽</span>,
                  label: "Sport type",
                  value: sports_type,
                },
                {
                  icon: <Layers size={15} />,
                  label: "Facility type",
                  value: facility_type,
                },
                {
                  icon: <Mail size={15} />,
                  label: "Contact",
                  value: owner_email,
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-background rounded-lg px-3 py-2.5 border"
                >
                  <span className="text-emerald-600 shrink-0">{icon}</span>
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-foreground break-all">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </CardContent>
          </Card>

          {/* Popularity */}
          <Card>
            <CardContent className="pt-4 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground uppercase tracking-wider">
                  Popularity
                </span>
                <span>{booking_count} total bookings</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: `${popularityPct}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Slots grid */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                Available time slots ({available_slots.length} open)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {slots.map((slot) => {
                const isSelected = selectedSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => toggleSlot(slot)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150 cursor-pointer w-full ${
                      isSelected
                        ? "bg-emerald-700 border-emerald-700 text-white"
                        : "bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                    }`}
                  >
                    <Clock
                      size={15}
                      className={
                        isSelected ? "text-white/80" : "text-emerald-500"
                      }
                    />
                    <div>
                      <p className="text-sm font-bold leading-none">{slot}</p>
                      <p
                        className={`text-[11px] mt-1 ${isSelected ? "text-white/70" : "text-emerald-500"}`}
                      >
                        {SLOT_LABELS[slot] || "Available"}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="ml-auto bg-white/25 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* ── Right: sticky booking panel ── */}
        <div className="lg:sticky lg:top-5">
          <Card>
            <CardContent className="pt-5 space-y-4">
              {/* Price */}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-emerald-700">
                    ${price_per_hour}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    / hour
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <MapPin size={11} /> {location}
                </p>
              </div>

              <Separator />

              {/* Slot selector in panel */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Select slots
                </p>
                <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto pr-1">
                  {Array.isArray(available_slots) &&
                    slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => toggleSlot(slot)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 cursor-pointer ${
                          selectedSlots.includes(slot)
                            ? "bg-emerald-700 text-white border-emerald-700"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                </div>
              </div>

              {/* Total */}
              {selectedSlots.length > 0 && (
                <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                  <span className="text-sm text-muted-foreground font-medium">
                    {selectedSlots.length} slot
                    {selectedSlots.length > 1 ? "s" : ""} × ${price_per_hour}
                  </span>
                  <span className="text-lg font-black text-emerald-700">
                    ${totalCost}
                  </span>
                </div>
              )}

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Free cancellation up to 24 hours before your slot.
              </p>
            </CardContent>
          </Card>

          <h4 className="text-center py-2 font-semibold">Enter Booking Date</h4>

          <DateField
            className="w-full"
            name="date"
            onChange={(date) => setBookingDate(date)}
          >
            <Label className="text-sm font-medium mb-1 block">Date</Label>

            <DateField.Group
              className="
      flex items-center
      w-full
      rounded-xl
      border border-gray-300
      bg-white
      px-3 py-2
      shadow-sm
      focus-within:ring-2
      focus-within:ring-emerald-500
    "
            >
              <DateField.Input className="flex gap-1 text-black text-sm outline-none">
                {(segment) => (
                  <DateField.Segment
                    segment={segment}
                    className="px-0.5 text-black"
                  />
                )}
              </DateField.Input>
            </DateField.Group>
          </DateField>
          {/* Book button */}
          <Button
            className="w-full bg-emerald-700 h-20 mt-5 text-2xl hover:bg-emerald-800 text-white font-bold"
            disabled={!bookingDate}
            onClick={handleBook}
          >
            <CalendarCheck size={16} className="mr-2" />
            {selectedSlots.length && bookingDate
              ? "Confirm booking →"
              : "Select a slot to book"}
          </Button>
          <Button
            className="w-full bg-emerald-700 h-20 mt-5 text-2xl hover:bg-emerald-800 text-white font-bold"
            disabled={!bookingDate}
            onClick={handleBook}
          >
            <CalendarCheck size={16} className="mr-2" />
            {selectedSlots.length && bookingDate
              ? "Confirm booking →"
              : "Select a slot to book"}
          </Button>
        </div>
      </div>
    </div>
  );
}
