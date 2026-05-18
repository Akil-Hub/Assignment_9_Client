'use client'
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users, Mail, BarChart2, CalendarPlus, Info } from "lucide-react";
import Link from "next/link";

const SPORT_ICONS = {
    Football: "⚽",
    Basketball: "🏀",
    Cricket: "🏏",
    Tennis: "🎾",
    Badminton: "🏸",
};

function PitchLines() {
    return (
        <svg
            className="absolute inset-0 w-full h-full opacity-10"
            viewBox="0 0 400 180"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect x="10" y="10" width="380" height="160" fill="none" stroke="white" strokeWidth="1.5" />
            <line x1="200" y1="10" x2="200" y2="170" stroke="white" strokeWidth="1" />
            <circle cx="200" cy="90" r="35" fill="none" stroke="white" strokeWidth="1" />
            <rect x="10" y="55" width="50" height="70" fill="none" stroke="white" strokeWidth="1" />
            <rect x="340" y="55" width="50" height="70" fill="none" stroke="white" strokeWidth="1" />
        </svg>
    );
}

export default function FacilityCard({ facility }) {
    const [selectedSlots, setSelectedSlots] = useState([]);

    const {
        _id,
        id,
        name,
        facility_name,
        facility_type,
        sports_type,
        location,
        price_per_hour,
        capacity,
        available_slots,
        owner_email,
        booking_count,
        image,
    } = facility;

    const toggleSlot = (slot) =>
        setSelectedSlots((prev) =>
            prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
        );

    const popularityPct = Math.min(100, Math.round((booking_count / 200) * 100));

    return (
        <Link href={`/allFacilities/${_id}`}> <Card className="w-full max-w-sm overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* ── Hero image ── */}
            <div className="relative h-44 bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-400 overflow-hidden flex items-center justify-center">
                {image && (
                    <img
                        src={image}
                        alt={facility_name}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                )}
                <PitchLines />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-emerald-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <span className="bg-white text-emerald-700 font-bold text-sm px-6 py-2 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Quick Book
                    </span>
                </div>

                <span className="text-5xl z-[1] relative drop-shadow-lg" role="img" aria-label={sports_type}>
                    {SPORT_ICONS[sports_type] || "🏟️"}
                </span>

                <Badge className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white border-white/30 text-[10px] uppercase tracking-widest z-[1]">
                    {sports_type}
                </Badge>

                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-medium px-2 py-1 rounded-md z-[1]">
                    <BarChart2 size={12} />
                    {booking_count} bookings
                </div>
            </div>

            <CardContent className="p-4 space-y-3">
                {/* ID */}
                <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {id}
                </span>

                {/* Name + Price */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="font-bold text-lg leading-tight">{name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {facility_type} · {location}
                        </p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-xl font-bold text-emerald-600">${price_per_hour}</p>
                        <p className="text-[10px] text-muted-foreground">per hour</p>
                    </div>
                </div>

                {/* Meta info */}
                <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-emerald-500 shrink-0" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={13} className="text-emerald-500 shrink-0" />
                        <span>Capacity: {capacity} players</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={13} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{owner_email}</span>
                    </div>
                </div>

                <Separator />

                {/* Popularity */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-muted-foreground uppercase tracking-wider">Popularity</span>
                        <span>{booking_count} bookings</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                            style={{ width: `${popularityPct}%` }}
                        />
                    </div>
                </div>

                {/* Slots */}
                <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Available slots — tap to select
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(available_slots) &&
                            available_slots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => toggleSlot(slot)}
                                    className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 cursor-pointer ${selectedSlots.includes(slot)
                                            ? "bg-emerald-700 text-white border-emerald-700"
                                            : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"

                    >
                        <Info size={14} className="mr-1.5" />
                        See details
                    </Button>
                    <Button
                        size="sm"
                        className="flex-[2] bg-emerald-700 hover:bg-emerald-800 text-white"

                    >
                        <CalendarPlus size={14} className="mr-1.5" />
                        Book now
                    </Button>
                </div>
            </CardContent>
        </Card></Link>
    );
}