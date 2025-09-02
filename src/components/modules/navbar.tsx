"use client";

import React, { useState, FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "@/components/ModeToggle";

const Navbar: FC = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Optional: returns classes for active link
  const linkClasses = (href: string): string =>
    pathname === href
      ? "text-green-400 font-bold"
      : "hover:text-green-400 transition-colors duration-300";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-green-900/90 text-white border-b border-green-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo + Freelancer */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <span className="text-lg font-semibold">QUANTUMEDGE SOFTWARE</span>
          </Link>

          {/* Freelancer Dropdown */}
          <div className="flex items-center gap-1 cursor-pointer text-sm text-white">
            <span>Freelancer</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Become a Seller Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-900"
          >
            BECOME A SELLER
          </Button>

          {/* Auth Buttons */}
          {status === "loading" ? (
            <div className="w-6 h-6 border-4 border-green-400 border-dashed rounded-full animate-spin" />
          ) : session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm">
                LOGIN
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-xl"
              >
                Registration
              </Link>
            </>
          )}

          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-green-300 focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-green-950 border-t border-green-800 px-6 py-4 space-y-4">
          <div className="flex flex-col gap-3 items-center">
            {/* Freelancer Dropdown */}
            <div className="flex items-center gap-1 cursor-pointer text-sm text-green-300">
              <span>Freelancer</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Auth Buttons */}
            {status === "loading" ? (
              <div className="w-8 h-8 border-4 border-green-400 border-dashed rounded-full animate-spin" />
            ) : session ? (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-3xl font-semibold transition text-center"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-3xl font-semibold text-center"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-3xl font-semibold text-center"
                >
                  Register
                </Link>
              </>
            )}

            {/* Become Seller Button */}
            <Button
              variant="outline"
              size="sm"
              className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-900 w-full"
            >
              BECOME A SELLER
            </Button>

            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
