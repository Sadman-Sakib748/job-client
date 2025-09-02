"use client";

import { Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";
import hand from '../../../public/hand.jpg'
import logo from '../../../public/logo.png'


export default function Footer() {

  return (
    <footer className="bg-[#071400] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main heading */}
        <div className="flex  flex-col md:flex-row justify-between items-start gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold md:w-1/2">
            Reach Your Requirement Goals Right on Schedule
          </h2>
          <div className="flex-1 md:w-1/2">
            <p className="text-green-100 max-w-2xl text-pretty">
              Sign up, complete your profile, and start browsing projects. Submit
              proposals and connect with clients to get hired.
            </p>
            <button className="mt-6 bg-[#05AF2B] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        {/* Footer content grid */}
        <div className="grid grid-cols-1 h-[300px] md:grid-cols-2 lg:grid-cols-4 pt-12">
          {/* Company Info */}
          <div className="border-t border-white/6 p-6 text-center">
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Image
                    src={logo}
                    alt="Unveils the Best Canadian Cities for Biking"
                    width={100}
                    height={70}
                    className="rounded-lg h-[58px] w-[247px] object-cover"
                  />
              </div>
            </div>
          </div>

          {/* About Links */}
          <div className="border-t border-white/6 p-6 text-center">
            <h4 className="font-semibold text-lg text-white">About</h4>
            <ul className="space-y-2 text-sm mt-4 gap-6">
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Company
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Become Seller
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Registered
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="border border-white/6 p-6 text-center">
            <h4 className="font-semibold text-lg text-white">Categories</h4>
            <ul className="space-y-2 mt-4 text-sm">
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Digital & Creative
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Development & IT
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Music & Audio
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Programming & Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="border-t border-b border-white/6 p-6 text-center">
            <h4 className="font-semibold text-lg text-white">Support</h4>
            <ul className="space-y-2 mt-4 text-sm">
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-green-400 transition-colors">
                  Terms & Services
                </a>
              </li>
            </ul>
          </div>
        </div>







        {/* Popular Posts Section */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Social Icons */}
          <div className="flex-1 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <a
              href="#"
              className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* Popular Posts */}
          <div className="flex-1">
            <div className="">
              <h4 className="font-semibold text-lg mb-6 text-white">Our Popular Post</h4>
            </div>

            {/* Posts Container */}
            <div className="flex   md:gap-[18px] gap-[18px]">
              {/* Post 1 */}
              <div className="flex items-center cursor-pointer group w-[299px] h-[72px] opacity-100 transform rotate-0">
                <div className="flex-shrink-0">
                  <Image
                    src={hand}
                    alt="Unveils the Best Canadian Cities for Biking"
                    width={72}
                    height={50}
                    className="rounded-lg h-[72px] w-[106px] object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 ml-4">
                  <p className="text-xs text-green-200 mb-1">November 7, 2024</p>
                  <h5 className="font-semibold text-sm text-white group-hover:text-green-400 transition-colors">
                    Unveils the Best Canadian Cities for Biking
                  </h5>
                </div>
              </div>

              {/* Post 2 */}
              <div className="flex items-center cursor-pointer group w-[299px] h-[72px] opacity-100 transform rotate-0">
                <div className="flex-shrink-0">
                  <Image
                    src={hand}
                    alt="Unveils the Best Canadian Cities for Biking"
                    width={100}
                    height={70}
                    className="rounded-lg h-[72px] w-[106px] object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 ml-4">
                  <p className="text-xs text-green-200 mb-1">November 7, 2024</p>
                  <h5 className="font-semibold text-sm text-white group-hover:text-green-400 transition-colors">
                    Unveils the Best Canadian Cities for Biking
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom section with social links and copyright */}
        <div className="mt-12 pt-8 border-t 
 border-white/6 text-center items-center space-y-4 md:space-y-0">
          <p className="text-sm text-green-200">
            © QuantumEdge Software Pvt. 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
