import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-sky-100 flex-wrap rounded-lg px-6 md:px-10 lg:px-20">
      {/* ----------left side-------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-7 md:py-[8vw]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-600  leading-tight">
        Find Your Perfect Healthcare Partner <br /> With Our Expert Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-gray-500 text-sm font-light mt-5">
          <img className="w-28" src={assets.group_profiles} alt="Group Profiles" />
          <p>
            Explore a range of highly skilled doctors and book your 
            <br className="hidden sm:block" /> appointments effortlessly. Your health, our priority.

          </p>
        </div>
        <div className="flex gap-4 mt-7">
          {/* Book Appointment Button */}
          <a
            href="#speciality"
            className="flex items-center gap-2 bg-primary px-10 py-5 rounded-full text-white text-sm font-semibold hover:scale-105 transition-all duration-300"
          >
            Book Appointment <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
          </a>
          {/* MedicoAI Button */}
          <a
            href="/chatbot"
            className="flex items-center gap-2 bg-primary px-8 py-3 rounded-full text-white font-semibold text-sm hover:scale-105 transition-all duration-300"
          >
            MedicoAI <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
          </a>
 
          {/* nearby hospitals */}
          <a
            href="/nearby-hospital"
            className="flex items-center gap-2 bg-primary px-8 py-3 rounded-full text-white text-sm font-semibold hover:scale-105 transition-all duration-300"
          >
            Nearby-Hospitals <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
          </a>
        </div>
      </div>

      {/* ------------right side----------- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full ml-20 h-[100%] object-cover"
          src={assets.header_img}
          alt="Header"
        />
      </div>
    </div>
  );
};

export default Header;
