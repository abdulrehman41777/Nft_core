'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { CiSearch } from "react-icons/ci";
import { CgMenuGridR } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar } from 'react-icons/ai'; // Example icon
import { GiStarShuriken } from "react-icons/gi";

import { HiOutlineDownload } from "react-icons/hi";



export default function Home() {

  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef(null);
  const starsRef = useRef([]);
  const svgRef = useRef(null);
  useEffect(() => {
    // Create GSAP timeline for the stars animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Animate each star with infinite scaling
    starsRef.current.forEach(star => {
      gsap.fromTo(
        star,
        { scale: 1, opacity: 0.7 },
        {
          scale: 2,
          opacity: 1,
          duration: 2, // Duration of one cycle
          ease: 'sine.inOut',
          repeat: -1, // Repeat infinitely
          yoyo: true // Bounce back to original size
        }
      );
    });
  }, []);

  useEffect(() => {
    const svgElement = svgRef.current;

    gsap.fromTo(
      svgElement.querySelector('#heartbeat'),
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: 0,
        repeat: -1,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true
      }
    );
  }, []);

  return (
    <div
    // classNameName="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white"


    >
      <header
        ref={headerRef}
        className="relative border-2 border-[red] text-white py-4 h-screen"
        style={{
          backgroundImage: "url('./herobannerbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center"
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
              ref={el => starsRef.current[i] = el}
            >
              <GiStarShuriken className="text-[#98c8ff] text-3xl" />
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto flex flex-wrap justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="logo.png"
              alt="Logo"
              className="w-[150px] h-auto md:w-[200px] lg:w-[250px]"
            />
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none flex justify-start items-center"
            >
              <CgMenuGridR className="w-10 h-10 animate-bounce" />
            </button>
          </div>

          {/* Mobile Menu with Animation */}
          <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-800 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-500 ease-in-out z-50`}
          >
            {/* Close Button */}
            <div className="p-4 flex justify-end">
              <button onClick={() => setIsOpen(false)} className="text-white">
                <RxCross1 className="w-6 h-6 animate-pulse text-white" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col space-y-4 ml-6 mt-10">
              <Link href="#" className="hover:text-blue-500 text-white text-xl">
                Discover
              </Link>
              <Link href="#" className="hover:text-blue-500 text-white text-xl">
                Marketplace{" "}
                <span className="bg-blue-500 text-white px-2 py-1 text-sm rounded">
                  PRO
                </span>
              </Link>
              <Link href="#" className="hover:text-blue-500 text-white text-xl">
                How it Works
              </Link>
            </nav>

            {/* Buttons */}
            <div className="flex flex-col items-start space-y-4 mt-8 ml-6 border-2 border-white">
              <button className="text-white">
                <CiSearch className="w-6 h-6 text-white" />
              </button>
              <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
                Connect Wallet
              </button>
              <button className="bg-blue-500 p-2 rounded-full animate-bounce">
                <HiOutlineDownload className="w-6 h-6 text-white " />
              </button>
            </div>
          </div>

          {/* Regular Navigation for Larger Screens */}
          <nav className="hidden lg:flex space-x-6 mt-4 lg:mt-0">
            <Link href="#" className="hover:text-blue-500">
              Discover
            </Link>
            <Link href="#" className="hover:text-blue-500">
              Marketplace{" "}
              <span className="bg-blue-500 text-white px-2 py-1 text-sm rounded">
                PRO
              </span>
            </Link>
            <Link href="#" className="hover:text-blue-500">
              How it Works
            </Link>
          </nav>

          {/* Buttons for Larger Screens */}
          <div className="hidden lg:flex items-center space-x-4 mt-4 lg:mt-0 border-2 border-yellow-300">
            <button className="text-white">
              <CiSearch className="w-6 h-6 text-white" />
            </button>
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
              Connect Wallet
            </button>
            <button className="bg-blue-500 p-2 rounded-full animate-bounce">
              <HiOutlineDownload className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 py-32 w-[80%] mx-auto relative z-10">
          <div className="bg--gray-200 p-6 text-center border border-gray-300 rounded-lg shadow-md">
            <div class="bg--[#0B0E19] text-white px-6 py-8 md:px-12 lg:px-20">
              <span class="text-6xl max-md:text-7xl font-bold mb-4 text-start md:text-start text-white">
                Super NFT Marketplace
              </span>
              <p class="text-sm md:text-base text-center md:text-left max-w-md mx-auto md:mx-0">
                The largest and unique Super rare NFT marketplace for crypto-collectibles
              </p>

              <div class="flex flex-col md:flex-row items-center gap-4 mt-6 justify-center md:justify-start ">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                  Connect Wallet
                </button>
                <a href="#" class="text-blue-400 hover:text-blue-500 flex items-center">
                  Create NFTs <span class="ml-2">→</span>
                </a>
              </div>
              <div className="pt-5">
                <svg
                  ref={svgRef}
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="150px"
                  height="73px"
                  viewBox="0 0 150 63"
                  enableBackground="new 0 0 350 73"
                  xmlSpace="preserve"
                >
                  <polyline
                    id="heartbeat"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,
          63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                  />
                </svg>
              </div>
              <div class="mt-8">
                <h2 class="text-lg font-semibold mb-4 text-center md:text-left">
                  Last 7 days popular search
                </h2>
                <div class="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    All
                  </button>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    Music
                  </button>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    3D Abstract
                  </button>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    Game
                  </button>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    Sports
                  </button>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    Cartoon
                  </button>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    Virtual World
                  </button>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    Classic
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div className="bg-gray-200 p-6 text-center border border-gray-300 rounded-lg shadow-md">
            Item 2
          </div>
        </div>
      </header>






      <main>
        <section className="bg-white py-20 "></section>
      </main>




    </div >
  );
}
