import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 md:mx-4">
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-28 text-sm">

        {/* ---- Left Side ---- */}
        <div className="flex flex-col items-center sm:items-start">
          <img className="mb-4 h-24 w-24 md:h-32 md:w-36" src={assets.logo} alt="Logo" />
          <p className="text-gray-600 leading-6 text-center sm:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* ---- Center Side ---- */}
        <div className="text-center sm:text-left">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ---- Right Side ---- */}
        <div className="text-center sm:text-left">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 7778889065</li>
            <li>mediconnect@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ---- Copyright Section ---- */}
      <div className="border-t border-gray-200 mt-6">
        <p className="py-5 text-sm text-center text-gray-600">
          &copy; 2024 MediConnect.dev - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
