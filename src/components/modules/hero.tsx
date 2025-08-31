"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import { useRouter } from "next/navigation";

// Replace with your computer product images
import slider1 from "../../../public/tk3.jpg";
import slider2 from "../../../public/tk2.jpg";
import slider3 from "../../../public/tk3.jpg";
import slider4 from "../../../public/slider4.jpg";

const Slider = () => {
  const router = useRouter();

  const slides = [
    {
      image: slider1,
      title: "High-Performance Laptops",
      description: "Discover laptops designed for productivity and creativity.",
      cta: "Shop Laptops",
      path: "/products",
    },
    {
      image: slider2,
      title: "Powerful Desktops",
      description: "Custom desktops for gaming, design, and everyday work.",
      cta: "Shop Desktops",
      path: "/products",
    },
    {
      image: slider3,
      title: "Gaming Gear",
      description: "Level up your gaming setup with our latest peripherals.",
      cta: "Shop Gaming",
      path: "/products",
    },
    {
      image: slider4,
      title: "Accessories & More",
      description: "Upgrade your setup with keyboards, mice, monitors, and more.",
      cta: "Shop Accessories",
      path: "/products",
    },
  ];

  return (
    <div className="w-full h-[70vh] max-h-[800px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
              <div className="max-w-2xl mx-auto text-white">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200">
                  {slide.description}
                </p>
                <button
                  onClick={() => router.push(slide.path)}
                  className="w-full md:w-48 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
