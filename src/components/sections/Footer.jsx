"use client";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";
   const menu = [
                { title: "Home", path: "/" },
                { title: "All Facilities", path: "/allFacilities" },
                { title: "My Bookings", path: "/myBookings" },
                { title: "Add Facility", path: "/addFacilities" },
                { title: "Manage Facilities", path: "/manageFacilities" },
              ]
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="wrapper px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white italic">Sport<span className="text-green-500">Nest</span></h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Your all-in-one platform to book, manage, and enjoy world-class
              sports facilities. Play more, stress less.
            </p>
            <div className="flex gap-4 mt-2">
              <FaFacebook className="w-5 h-5 hover:text-primary cursor-pointer transition" />
              <FaTwitter className="w-5 h-5 hover:text-primary cursor-pointer transition" />
              <FaInstagram className="w-5 h-5 hover:text-primary cursor-pointer transition" />
              <FaYoutube className="w-5 h-5 hover:text-primary cursor-pointer transition" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {menu.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="hover:text-primary transition hover:translate-x-1 inline-block"
                  >
                    → {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Our Sports</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {["Tennis", "Football", "Basketball", "Swimming", "Badminton", "Hockey"].map((sport) => (
                <li key={sport}>
                  <span className="hover:text-primary transition cursor-pointer">
                    → {sport}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>123 Sports Avenue, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@sportsync.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="wrapper px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SportSync. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-primary transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}