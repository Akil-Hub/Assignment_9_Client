"use client";
import NavLinks from "@/components/common/NabLinks";
import { ThemeToggler } from "@/components/common/ThemeToggler";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session  } = authClient.useSession();
  console.log(session)

  return (

    <section className="fixed top-0 left-0 z-50 w-full  border-separator bg-white/10 backdrop-blur-lg ">
      <nav className=" wrapper">
        <header className="flex h-14 items-center justify-between px-6 font-semibold ">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold italic">
              Sport<span className="text-green-500 ">Nest</span>
            </div>
          </div>
          <NavLinks className={"hidden md:flex"} />

          <div className="rightNav flex items-center gap-2">
            <ThemeToggler className={"hidden md:flex text-white]:"} />

            {session ? (
              <div className="flex items-center gap-2">
                <Image src={session?.user?.image} height={50} width={50} alt="profile image" className="rounded-full"/>
                <span className="text-sm font-medium hidden md:block">
                  {session.user.name}
                </span>
                <Button variant="outline" onClick={() => authClient.signOut()}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button>
                  <Link href="/signIn">Login</Link>
                </Button>
                <Button>
                  <Link href="/signUp">Sign Up</Link>
                </Button>
              </div>
            )}

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
          <div className="border-t border-separator md:hidden  py-5">
            <NavLinks isMenuOpen={isMenuOpen} />
          </div>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
