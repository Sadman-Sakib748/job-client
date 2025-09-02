"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const options = ["Web Developer", "Graphic Designer", "Content Writer", "UI/UX Designer"];

export function JobHeader() {
  const [selected, setSelected] = useState("Web Developer");
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-green-900 text-white">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-lg font-semibold">QUANTUMEDGE SOFTWARE</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-green-300">
              <span>Freelancers</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#" className="hover:text-green-300">Services</a>
            <a href="#" className="hover:text-green-300">About</a>
            <a href="#" className="hover:text-green-300">Contact</a>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm hover:text-green-300">BECOME A SELLER</a>
            <a href="#" className="text-sm hover:text-green-300">LOGIN</a>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Registration</Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="pb-4">
          <div className="flex items-center mx-auto" style={{ width: "518px", height: "46px", justifyContent: "space-between" }}>
            
            {/* Input + dropdown + search icon container */}
            <div className="flex flex-1 h-full rounded-md overflow-hidden border border-gray-300 bg-white">
              <Input
                type="text"
                placeholder="What do you need"
                className="flex-1 px-4 py-3 border-0 text-gray-900 placeholder-gray-500 rounded-none"
              />

              {/* Dropdown */}
              <div
                className="flex items-center space-x-1 px-4 cursor-pointer select-none border-l border-gray-300 relative"
                onClick={() => setOpen(!open)}
              >
                <span className="text-sm text-gray-700">{selected}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                />
                <Search className="w-4 h-4 text-gray-700 ml-2" />
                
                {open && (
                  <div className="absolute top-full right-0 mt-1 w-56 rounded-md border border-gray-200 shadow-lg bg-white z-10">
                    {options.map((opt) => (
                      <div
                        key={opt}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelected(opt);
                          setOpen(false);
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
