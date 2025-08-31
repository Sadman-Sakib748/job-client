"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#633daf] dark:bg-black border-t border-gray-200 dark:border-black">
      <div className="mx-auto w-11/12 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo & Description */}
          <div className="flex flex-col items-start space-y-4">
            <a href="" className="flex items-center space-x-2">
              <Image
                src="/footer.png" // replace with your logo path
                alt="Your Logo"
                width={80}
                height={40}
              />
              <h1 className="text-3xl font-bold text-white">CIRCLE TEC</h1>
            </a>
            <p className="text-white dark:text-white max-w-xs">
              Building awesome products that make your life easier. Stay connected with us!
            </p>
          </div>

          {/* Links */}
          
            <div>
              <h3 className="text-white dark:text-white font-semibold mb-4 uppercase text-sm">
                Products
              </h3>
              <ul className="text-white  space-y-2 text-sm">
                <li><a href="#" className="hover:underline">App</a></li>
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white dark:text-white font-semibold mb-4 uppercase text-sm">
                Company
              </h3>
              <ul className="text-white  space-y-2 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white dark:text-white font-semibold mb-4 uppercase text-sm">
                Legal
              </h3>
              <ul className="text-white  space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div/>

            <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-white dark:text-white text-sm">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Icons */}
            <a href="#" className="text-white dark:text-white hover:text-gray-900 dark:hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.5.59-2.24.69.81-.48 1.43-1.23 1.72-2.13-.75.44-1.58.76-2.46.93a4.18 4.18 0 0 0-7.14 3.8A11.85 11.85 0 0 1 3.2 4.78a4.17 4.17 0 0 0 1.29 5.57c-.67-.02-1.3-.2-1.85-.5v.05a4.18 4.18 0 0 0 3.36 4.09c-.32.09-.66.13-1 .13-.25 0-.5-.02-.74-.07a4.18 4.18 0 0 0 3.9 2.9A8.37 8.37 0 0 1 2 19.54a11.8 11.8 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.66v-.53A8.36 8.36 0 0 0 24 5.1a8.29 8.29 0 0 1-2.36.65 4.16 4.16 0 0 0 1.82-2.3z" />
              </svg>
            </a>
            <a href="#" className="text-white dark:text-white hover:text-gray-900 dark:hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.87 8.15 6.84 9.48v-6.71H9.06V12h2.78v-2.07c0-2.76 1.64-4.27 4.14-4.27 1.2 0 2.44.22 2.44.22v2.68h-1.37c-1.35 0-1.77.84-1.77 1.7V12h3l-.48 2.77h-2.52v6.71c3.97-1.33 6.84-5.07 6.84-9.48 0-5.5-4.46-9.96-9.96-9.96z"/>
              </svg>
            </a>
          </div>
        </div>
        </div>

        {/* Bottom */}
      
      
    </footer>
  );
}
