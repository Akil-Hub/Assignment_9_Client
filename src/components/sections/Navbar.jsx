"use client";
import { ThemeToggler } from "@/components/common/ThemeToggler";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div>Logo</div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
        </ul>
       <div className="rightNav">
           <ThemeToggler />

        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          variant="ghost"
          className={"md:hidden"}
        >
          {isMenuOpen ? <X /> : <FaBars />}
        </Button>
       </div>
      </header>

      {/* mobile menu items */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="#" className="block py-2">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2">
                Pricing
              </Link>
            </li>
            <ThemeToggler />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
