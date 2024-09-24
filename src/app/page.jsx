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
import styles from "./FlipCard.module.css";
import { HiOutlineDownload } from "react-icons/hi";
import { FaEthereum } from "react-icons/fa";
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, useInView } from 'framer-motion';



export default function Home() {


  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef(null);
  const starsRef = useRef([]);
  const svgRef = useRef(null);
  const imageRef = useRef(null);
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);
  const ref = useRef(null);

  const inView = useInView(ref, { once: true });
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Stop observing after it has become visible
      }
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, []);



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




  useEffect(() => {
    // Apply GSAP rotation animation to the image
    gsap.to(imageRef.current, {
      duration: 5,   // 5 seconds for one full rotation
      repeat: -1,    // Infinite loop
      ease: 'linear', // Constant speed
      rotate: 360    // Rotate by 360 degrees
    });
  }, []);

  useEffect(() => {
    // GSAP animation for the left div (fading in from left)
    gsap.from(leftDivRef.current, {
      x: -100, // Start 100px to the left
      opacity: 0, // Start fully transparent
      duration: 1.5, // Animation duration
      ease: 'power2.out', // Easing function
    });

    // GSAP animation for the right div (fading in from right)
    gsap.from(rightDivRef.current, {
      x: 100, // Start 100px to the right
      opacity: 0, // Start fully transparent
      duration: 1.5, // Animation duration
      ease: 'power2.out', // Easing function
    });
  }, []);



  return (
    <div


    >
      <header
        ref={headerRef}
        className="relative border--2 border-[red] text-white py-4 h-auto "
        style={{
          backgroundImage: "url('./herobannerbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
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
          <motion.div
            className="flex items-center space-x-2"
            initial={{ scale: 0 }}  // Start from scale 0
            animate={{ scale: 1 }}   // Scale to 1
            transition={{ duration: 0.8, ease: "easeInOut" }}  // Adjust duration and easing
          >
            <img
              src="logo.png"
              alt="Logo"
              className="w-[150px] h-auto md:w-[200px] lg:w-[250px]"
            />
          </motion.div>

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
            <div className="flex flex-col items-start space-y-4 mt-8 ml-6 border-2 border--white">
              <button className="text-white">
                <CiSearch className="w-6 h-6 text-white" />
              </button>
              <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
                Connect Wallet
              </button>
              <button className="bg-blue-500 p-2 rounded-full">
                <HiOutlineDownload className="w-6 h-6 text-white animate--bounce" />
              </button>
            </div>
          </div>

          {/* Regular Navigation for Larger Screens */}
          <nav className="hidden lg:flex space-x-6 mt-4 lg:mt-0">
            {["Discover", "Marketplace", "How it Works"].map((link, index) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: -20 }} // Start off invisible and slightly above
                animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
                transition={{ duration: 0.3, delay: index * 0.1 }} // Delay for a staggered effect
              >
                <Link href="#" className="hover:text-[#15BFFD]">
                  {link}
                  {link === "Marketplace" && (
                    <span className="bg-blue-500 text-white px-2 py-1 text-sm rounded">
                      PRO
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Buttons for Larger Screens */}
          <div className="hidden lg:flex items-center space-x-4 mt-4 lg:mt-0 border--2 border-yellow-300">
            {[
              {
                icon: <CiSearch className="w-6 h-6 text-white" />,
                onClick: () => console.log('Search clicked'),
              },
              {
                label: 'Connect Wallet',
                onClick: () => console.log('Connect Wallet clicked'),
                style: 'border border-[#15BFFD] text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition',
              },
              {
                icon: <HiOutlineDownload className="w-6 h-6 text-white animate-bounce" />,
                onClick: () => console.log('Download clicked'),
                style: 'bg-[#15BFFD] p-2 rounded-full',
              },
            ].map((button, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }} // Start off invisible and slightly above
                animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
                transition={{ duration: 0.3, delay: index * 0.1 }} // Delay for a staggered effect
              >
                <button className={button.style} onClick={button.onClick}>
                  {button.icon || button.label}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 py-32 w-[80%]  mx-auto relative z-10">
          {/* <div className="bg--gray-200 p--6 text-start border border-gray-300 rounded-lg shadow-md">
            <div className="bg--[#0B0E19] text-white px--6 py-8 md:px-8 lg:px--20 max-sm:text-center max-md:text-center">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-left sm:text-center md:text-start lg:text-start xl:text-start">
                Super NFT Marketplace
              </span>

              <p className="text-xs sm:text-sm md:text-base text-center md:text-left max-w-md mx-auto md:mx-0 pt-3">
                The largest and unique Super rare NFT marketplace for crypto-collectibles
              </p>

              <div className="flex flex-col md:flex-row items-center gap-4 mt-6 justify-start md:justify-start">
                <button className="bg-[#15BFFD] hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                  Connect Wallet
                </button>
                <Link href="#" className="text-[#15BFFD] hover:text-blue-500 flex items-center">
                  Create NFTs <span className="ml-2">→</span>
                </Link>
              </div>
              <div className=" pt-5 flex justify-center items-center">
                <svg
                  ref={svgRef}
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="100%"
                  height="auto"
                  viewBox="0 0 500 63"
                  enableBackground="new 0 0 500 73"
                  xmlSpace="preserve"
                >
                  <polyline
                    id="heartbeat"
                    fill="none"
                    stroke="#15BFFD"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067, 63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                  />
                </svg>
              </div>


              <div className="mt-8">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-start md:text-left px-4 text-white capitalize">
                  Last 7 days popular search
                </h3>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button className="bg-[#15BFFD] hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    All
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Music
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    3D Abstract
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Game
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Sports
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Cartoon
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Virtual World
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Classic
                  </button>
                </div>
              </div>
            </div>
          </div> */}


          <motion.div
            initial={{ opacity: 0, x: -100 }} // Start from left with opacity 0
            animate={{ opacity: 1, x: 0 }} // Fade-in and move to original position
            transition={{ duration: 1 }} // Set the duration of the animation
            className="bg--gray-200 p--6 text-start  border--gray-300 rounded-lg shadow--md"
          >
            <div className="bg--[#0B0E19] text-white px--6 py-8 md:px-8 lg:px--20 max-sm:text-center max-md:text-center">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-left sm:text-center md:text-start lg:text-start xl:text-start">
                Super NFT Marketplace
              </span>

              <p className="text-xs sm:text-sm md:text-base text-center md:text-left max-w-md mx-auto md:mx-0 pt-3">
                The largest and unique Super rare NFT marketplace for crypto-collectibles
              </p>

              <div className="flex flex-col md:flex-row items-center gap-4 mt-6 justify-start md:justify-start">
                <button className="bg-[#15BFFD] hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                  Connect Wallet
                </button>
                <Link href="#" className="text-[#15BFFD] hover:text-blue-500 flex items-center">
                  Create NFTs <span className="ml-2">→</span>
                </Link>
              </div>

              <div className=" pt-5 flex justify-center items-center">
                <svg
                  ref={svgRef}
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="100%"
                  height="auto"
                  viewBox="0 0 500 63"
                  enableBackground="new 0 0 500 73"
                  xmlSpace="preserve"
                >
                  <polyline
                    id="heartbeat"
                    fill="none"
                    stroke="#15BFFD"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                  />
                </svg>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-start md:text-left px-4 text-white capitalize">
                  Last 7 days popular search
                </h3>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button className="bg-[#15BFFD] hover:bg-gray-700 text-white px-4 py-1 rounded-full">
                    All
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Music
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    3D Abstract
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Game
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Sports
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Cartoon
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Virtual World
                  </button>
                  <button className="hover:bg-[#15BFFD] text-white px-4 py-1 rounded-full border">
                    Classic
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* <div className="bg-gray-200  text-center border-2 border-red-600 rounded-lg shadow-md">
            <div className="relative bg-[#0a143b] flex justify-start items-center overflow-hidden h-full">


              <div className="relative w-full max-w-xs h--[20rem] md:w-[30rem] md:h--[35rem] bg--black rounded-lg shadow-lg z-10 flex justify-center items-center">
                <img src="card02.png" alt="Digital Artwork" className="border-2 border-yellow-400 w-full h-auto rounded-lg mt-4 " />
              </div>


              <div className="border-4 border-yellow-400 absolute bottom-4 right-[2rem] flex items-center justify-start p-2">
                <img src="Vector.png" alt="Kin Rare & Exclusive" className="w-[15rem] h-[10rem] md:w-[25rem] md:h-[25rem] animate--spin" />
              </div>

              <div className="relative w-full max-w-xs h--[20rem] md:w-[30rem] md:h--[35rem] bg--black  rounded-lg shadow-lg z-0 flex justify-center items-center mt--[10rem] mb--10">
                <img src="card01.png" alt="Digital Artwork" className="border-2 border-[olive] w-full h-auto  rounded-lg mt-4 rotate-12 -ml-28" />
              </div>

              <div className="absolute top-[-0.5rem] right-[1rem] w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
                <img src="spintag.png" alt="Kin Rare & Exclusive" className="w-full h-full animate-spin" />
              </div>





            </div>
          </div> */}
          <motion.div
            initial={{ opacity: 0, x: 100 }} // Start from right with opacity 0
            animate={{ opacity: 1, x: 0 }} // Fade-in and move to original position
            transition={{ duration: 1 }} // Set the duration of the animation
            className="bg--gray-200 text-center border--2 border--red-600 rounded-lg shadow--md"
          >
            <div className="relative bg--[#0a143b] flex justify-start items-center overflow-hidden h-full">

              {/* <div className="relative w-full max-w-xs h-[20rem] md:w-[30rem] md:h-[35rem] bg--black rounded-lg shadow-lg z-10 flex justify-center items-center">
                <img src="card02.png" alt="Digital Artwork" className="border-2 border-yellow-400 w-full h-auto rounded-lg mt-4" />
              </div> */}

              <motion.div
                className="relative w-full max-w-xs h-[20rem] md:w-[30rem] md:h-[35rem] bg--black rounded-lg shadow--lg z-10 flex justify-center items-center"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 0.8 }} // Change opacity on hover
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="card02.png"
                  alt="Digital Artwork"
                  className="border--2 border-yellow-400 w-full h-auto rounded-lg mt-4"
                />
              </motion.div>
              <div className="border--4 border-yellow-400 absolute bottom-4 right-[2rem] flex items-center justify-start p-2">
                <div className="relative flex items-center justify-center">
                  <img
                    src="Vector.png"
                    alt="Kin Rare & Exclusive"
                    className="w-[15rem] h-[10rem] md:w-[25rem] md:h-[25rem] rounded-lg"

                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* <div className="relative w-full max-w-xs h-[20rem] md:w-[30rem] md:h-[35rem] bg--black rounded-lg shadow-lg z-0 flex justify-center items-center mt-[-10rem] mb-10">
                <img src="card01.png" alt="Digital Artwork" className="border-2 border-[olive] w-full h-auto rounded-lg mt-4 rotate-12 -ml-28" />
              </div> */}

              <motion.div
                className="relative w-full max-w-xs h-[20rem] md:w-[30rem] md:h-[35rem] bg--black rounded-lg shadow-lg z-0 flex justify-center items-center mt-[-10rem] mb-10"
                initial={{ x: 0 }}
                whileHover={{ x: -10 }} // Move slightly to the left on hover
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="card01.png"
                  alt="Digital Artwork"
                  className="border--2 border-[olive] w-full h--auto rounded-lg mt-14 rotate-12 -ml-28"
                />
              </motion.div>

              <div className="absolute top-[-0.9rem] right-[1rem] w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
                <img src="spintag.png" alt="Kin Rare & Exclusive" className="w-full h-full animate-spin" />
              </div>

            </div>
          </motion.div>


        </div>


      </header >






      <main>
        <section className="relative border--2 border-[red] text-white py--4 h--screen "

          style={{
            backgroundImage: "url('./2bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="border--2 border-yellow-500 bg-gradient-to-r text-white  py-10 lg:py-20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between space-y-8 lg:space-y-0"

            style={{
              background: 'rgba(255, 255, 255, 0.04 )',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(2.4px)',
              WebkitBackdropFilter: 'blur(2.4px)',

            }}
          >

            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
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

            <div

              className="border--2 border-yellow-500 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 justify-between">

              <div className=" relative w-full max-w-xs lg:max-w-md mx-auto lg:ml-auto lg:mr--0">
                <div className="relative h-[300px] lg:h-[400px]">
                  <img
                    ref={imageRef}
                    src="vector2.png"
                    alt="Why Choose Us Image 1"
                    className="rotate-6 absolute top-0 left-1/2 transform -translate-x-1/2"
                  />
                  <img
                    src="why_choose.png"
                    alt="Why Choose Us Image 2"
                    className="rounded-lg  -rotate-6 hover:rotate-0 transition duration-300 absolute top-0 left-1/2 transform -translate-x-2/4"
                  />
                </div>
              </div>


              <motion.div
                ref={ref} // Reference to the div for inView detection
                className="text-center lg:text-left max-sm:pt-10 max-md:pt-10 max-lg:pt-10"
                initial={{ opacity: 0, x: -50 }} // Start with opacity 0 and translate -50px on the x-axis
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }} // Animate based on inView state
                transition={{ duration: 0.8, ease: "easeInOut" }} // Duration and easing for the animation
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Why choose us?
                </h2>
                <p className="text-white opacity-75 mb-6">
                  Lorem ipsum dolor sit amet consectetur. Congue eu arcu neque um semper.
                  Eros suspendisse varius enim ultrices...
                  Lorem ipsum dolor sit amet consectetur. Congue eu arcu neque um semper.
                  Eros suspendisse varius enim ultrices...
                </p>
                <p className="text-white opacity-75 mb-6">
                  Lorem ipsum dolor sit amet consectetur. Congue eu arcu neque um semper.
                  Eros suspendisse varius enim ultrices...
                </p>
                <button
                  className="bg-[#00b4d8] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0077b6] transition duration-300"
                >
                  Connect Wallet
                </button>
              </motion.div>
            </div>
          </div>





        </section>
        <section
          ref={sectionRef}
          className="relative border--2 border-[red] text-white py-4 h--screen "

          style={{
            backgroundImage: "url('./flipbg.png')",
            backgroundSize: "cover",
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
          }}
        >


          <div className=" py-12 px-6">

            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
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
            <motion.div
              initial={{ opacity: 0, y: -50 }} // Initial state: invisible and positioned above
              animate={{ opacity: isVisible ? 3 : 10, y: isVisible ? 0 : -50 }} // Animate to visible when in view
              exit={{ opacity: 0 }} // Exit animation: fade out
              transition={{ duration: 0.5 }} // Duration of the animation
              className="bg--blue-500 text-white p-5 rounded-md" // Tailwind CSS classes
            >
              <h2 className="text-center text-white text-3xl mb-8">Live Auction</h2>
              <p className="text-center text-white mb-12">
                The largest and unique Super rare NFT marketplace<br /> for crypto-collectibles
              </p>
            </motion.div>
            <div className=" flex justify-center items-center bg--gray-100 p-6 ">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6  ">

                {/* Card 1 */}
                <div className="border--2 border-[red] flex justify-center items-center">
                  <div className="flip-box">
                    <div className="flip-box-inner">
                      {/* Front Side */}
                      <div className="border--2 border-[blue] flip-box-front h-full">
                        <img
                          src="flip01.png"
                          alt="Digital Artwork"
                          className="object-cover border--2 border-[olive] w-full h-full"
                        />
                      </div>
                      {/* Back Side */}
                      <div className="border--2 border-[orange] flip-box-back flex flex-col justify-center items-center p-4 h-full">
                        <h2 className="text-xl font-bold">Current bid</h2>
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="text-blue-500">
                            <FaEthereum className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <p className="text-white">3.2 ETH</p>
                          </div>
                        </div>
                        <button className="hover:bg-[#080B2A] text-white px-4 py-1 rounded-full border mt-4">
                          Music
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex justify-center items-center">
                  <div className="flip-box">
                    <div className="flip-box-inner">
                      {/* Front Side */}
                      <div className="flip-box-front">
                        <img
                          src="flip02.png"
                          alt="Digital Artwork 2"
                          className="h-full w-full object-cover border--2 border-[olive]"
                        />
                      </div>
                      {/* Back Side */}
                      <div className="flip-box-back flex flex-col justify-center items-center p-4">
                        <h2 className="text-lg font-bold">Current bid</h2>
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="text-blue-500">
                            <FaEthereum className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <p className="text-white">2.5 ETH</p>
                          </div>
                        </div>
                        <button className="hover:bg-[#080B2A] text-white px-4 py-1 rounded-full border mt-4">
                          Art
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex justify-center items-center">
                  <div className="flip-box">
                    <div className="flip-box-inner">
                      {/* Front Side */}
                      <div className="flip-box-front">
                        <img
                          src="flip03.png"
                          alt="Digital Artwork 3"
                          className="h-full w-full object-cover border--2 border-[olive]"
                        />
                      </div>
                      {/* Back Side */}
                      <div className="flip-box-back flex flex-col justify-center items-center p-4">
                        <h2 className="text-xl font-bold">Current bid</h2>
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="text-blue-500">
                            <FaEthereum className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <p className="text-white">4.1 ETH</p>
                          </div>
                        </div>
                        <button className="hover:bg-[#080B2A] text-white px-4 py-1 rounded-full border mt-4">
                          Photography
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card 4 */}


              </div>
            </div>


          </div>

        </section>
        <section
          className="relative border--2 border-red-500 text-white py-14 h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./timelinebg01.png')",
          }}
        >

          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
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
          <h2 className="text-center text-white text-3xl mb-8">Road Map 2024</h2>
          <p className="text-center text-white mb-12">
            The largest and unique Super rare NFT marketplace<br /> for crypto-collectibles
          </p>
          <div className="container mx-auto py-12 relative w-[90%] lg:w-[80%]">
            {/* Vertical Line in the Middle */}
            <div className="absolute border-2 border-blue-500 h-full w-px left-1/2 transform -translate-x-1/2 max-sm:hidden max-sm:hidden"></div>

            {/* Right Aligned Item (Box 1) */}
            <div className="relative w-full mb-8 flex justify-between flex-row-reverse items-center">
              <div className="order-1 w-5/12 hidden lg:block"></div>
              <div
                className="order-1 w-full lg:w-5/12 p-3 bg-transparent rounded-xl my-4 mr-auto relative z-10"
                style={{
                  backgroundImage: "url('./Vectorbg.png')",
                  backgroundSize: "140px",
                  backgroundPosition: "right",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="border border-indigo-500/100 px-6 sm:px-10 lg:px-20 py-6 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(2.4px)',
                    WebkitBackdropFilter: 'blur(2.4px)',
                  }}
                >
                  <h3 className="text-base sm:text-lg pb-2 text-gray-300 text-center font-light">January</h3>
                  <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">Brief</h3>
                  <span className="text-sm sm:text-base leading-tight text-justify text-gray-300">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</span>
                </div>
              </div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500 border-2 border-white max-sm:hidden"></div>
            </div>

            {/* Left Aligned Item (Box 2) */}
            <div className="relative w-full mb-8 flex justify-between items-center">
              <div className="order-1 w-5/12 hidden lg:block "></div>
              <div
                className="order-1 w-full lg:w-5/12 p-3 bg-transparent rounded-xl my-4 ml-auto relative z-10"
                style={{
                  backgroundImage: "url('./Vectorright.png')",
                  backgroundSize: "140px",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="border border-indigo-500/100 px-6 sm:px-10 lg:px-20 py-6 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(2.4px)',
                    WebkitBackdropFilter: 'blur(2.4px)',
                  }}
                >
                  <h3 className="text-base sm:text-lg pb-2 text-gray-300 text-center font-light">February</h3>
                  <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">Brief</h3>
                  <span className="text-sm sm:text-base leading-tight text-justify text-gray-300">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</span>
                </div>
              </div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500 border-2 border-white max-sm:hidden"></div>
            </div>

            {/* Right Aligned Item (Box 3) */}
            <div className="relative w-full mb-8 flex justify-between flex-row-reverse items-center">
              <div className="order-1 w-5/12 hidden lg:block"></div>
              <div
                className="order-1 w-full lg:w-5/12 p-3 bg-transparent rounded-xl my-4 mr-auto relative z-10"
                style={{
                  backgroundImage: "url('./Vectorbg.png')",
                  backgroundSize: "140px",
                  backgroundPosition: "right",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="border border-indigo-500/100 px-6 sm:px-10 lg:px-20 py-6 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(2.4px)',
                    WebkitBackdropFilter: 'blur(2.4px)',
                  }}
                >
                  <h3 className="text-base sm:text-lg pb-2 text-gray-300 text-center font-light">March</h3>
                  <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">Brief</h3>
                  <span className="text-sm sm:text-base leading-tight text-justify text-gray-300">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</span>
                </div>
              </div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500 border-2 border-white max-sm:hidden"></div>
            </div>

            {/* Left Aligned Item (Box 4) */}
            <div className="relative w-full mb-8 flex justify-between items-center">
              <div className="order-1 w-5/12 hidden lg:block"></div>
              <div
                className="order-1 w-full lg:w-5/12 p-3 bg-transparent rounded-xl my-4 ml-auto relative z-10"
                style={{
                  backgroundImage: "url('./Vectorright.png')",
                  backgroundSize: "140px",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="border border-indigo-500/100 px-6 sm:px-10 lg:px-20 py-6 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(2.4px)',
                    WebkitBackdropFilter: 'blur(2.4px)',
                  }}
                >
                  <h3 className="text-base sm:text-lg pb-2 text-gray-300 text-center font-light">April</h3>
                  <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">Brief</h3>
                  <span className="text-sm sm:text-base leading-tight text-justify text-gray-300">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</span>
                </div>
              </div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500 border-2 border-white max-sm:hidden"></div>
            </div>

            {/* Right Aligned Item (Box 5) */}
            <div className="relative w-full mb-8 flex justify-between flex-row-reverse items-center">
              <div className="order-1 w-5/12 hidden lg:block"></div>
              <div
                className="order-1 w-full lg:w-5/12 p-3 bg-transparent rounded-xl my-4 mr-auto relative z-10"
                style={{
                  backgroundImage: "url('./Vectorbg.png')",
                  backgroundSize: "140px",
                  backgroundPosition: "right",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="border border-indigo-500/100 px-6 sm:px-10 lg:px-20 py-6 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(2.4px)',
                    WebkitBackdropFilter: 'blur(2.4px)',
                  }}
                >
                  <h3 className="text-base sm:text-lg pb-2 text-gray-300 text-center font-light">May</h3>
                  <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">Brief</h3>
                  <span className="text-sm sm:text-base leading-tight text-justify text-gray-300">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</span>
                </div>
              </div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500 border-2 border-white max-sm:hidden"></div>
            </div>

            {/* Left Aligned Item (Box 6) */}
            <div className="relative w-full mb-8 flex justify-between items-center">
              <div className="order-1 w-5/12 hidden lg:block"></div>
              <div
                className="order-1 w-full lg:w-5/12 p-3 bg-transparent rounded-xl my-4 ml-auto relative z-10"
                style={{
                  backgroundImage: "url('./Vectorright.png')",
                  backgroundSize: "140px",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="border border-indigo-500/100 px-6 sm:px-10 lg:px-20 py-6 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(2.4px)',
                    WebkitBackdropFilter: 'blur(2.4px)',
                  }}
                >
                  <h3 className="text-base sm:text-lg pb-2 text-gray-300 text-center font-light">June</h3>
                  <h3 className="font-semibold text-lg sm:text-xl text-white mb-1">Brief</h3>
                  <span className="text-sm sm:text-base leading-tight text-justify text-gray-300">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</span>
                </div>
              </div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-blue-500 border-2 border-white max-sm:hidden"></div>
            </div>
          </div>

        </section>
        <section
          className="relative border--2 border-red-500 text-white py-14 h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./collectionbg.png')",
          }}
        >


          <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-center text-white text-3xl mb-8">Top Collection</h2>
            <p className="text-center text-white mb-12">
              The largest and unique Super rare NFT marketplace<br /> for crypto-collectibles
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg--[#3B82F6] hover:hover:bg-[#080B2A]   p-4 rounded-lg shadow--lg flex flex-col items-start  text-start  transition duration-300 ease-in-out border hover:text-white"

              >
                <img src="./collection01.png" alt="Art Image 1" className="w-full h-80 object-cover rounded-md mb-4 transition-transform duration-300 ease-in-out hover:scale-90" />

                <h3 className="text-white text-xl font-semibold text-start">Punk Art Collection</h3>
                <p className="text-[gray-400]">Curated by <span className="underline hover:text-white ">Jenna Watson</span></p>
              </div>

              <div className="bg--[#3B82F6] hover:hover:bg-[#080B2A]   p-4 rounded-lg shadow--lg flex flex-col items-start  text-start  transition duration-300 ease-in-out border hover:text-white">
                <img src="./collection03.png" alt="Art Image 1" className="w-full h-80 object-cover rounded-md mb-4 transition-transform duration-300 ease-in-out hover:scale-90" />

                <h3 className="text-white text-xl font-semibold text-start">Punk Art Collection</h3>
                <p className="text-[gray-400]">Curated by <span className="underline hover:text-white ">Jenna Watson</span></p>
              </div>
              <div className="bg--[#3B82F6] hover:hover:bg-[#080B2A]   p-4 rounded-lg shadow--lg flex flex-col items-start  text-start  transition duration-300 ease-in-out border hover:text-white">
                <img src="./collection02.png" alt="Art Image 1" className="w-full h-80 object-cover rounded-md mb-4 transition-transform duration-300 ease-in-out hover:scale-90" />

                <h3 className="text-white text-xl font-semibold text-start">Punk Art Collection</h3>
                <p className="text-[gray-400]">Curated by <span className="underline hover:text-white ">Jenna Watson</span></p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button className="hover:bg-[#15BFFD] hover:text-white text-[#15BFFD] px-10 py-3 rounded-full border border-[#15BFFD]">
                Explore More
              </button>
            </div>
          </div>
        </section>
        <section
          className="relative border--2 border-red-500 text-white py-14 h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./collectionbg.png')",
          }}
        >
          <h2 className="text-center text-white text-3xl mb-8">Top Collection</h2>
          <p className="text-center text-white mb-12">
            The largest and unique Super rare NFT marketplace<br /> for crypto-collectibles
          </p>
          <div className="bg--[#0e112a]  flex justify-center items-center p-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* <div
                className="relative border-2 border-red-400 overflow-hidden p-4 rounded-lg flex items-center polygon0--border justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0% 0%, 100% 0, 100% 57%, 70% 100%, 0% 100%);",
                  border:"polygon(0% 0%, 100% 0, 100% 57%, 70% 100%, 0% 100%);"
                }}
              >
                <div className="absolute inset-0 border-4 border-transparent rounded-lg border-gradient" />
                <div className="flex items-center space-x-4">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div> */}


              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%)",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow--lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>



              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%)",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow--lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%);",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%)",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%);",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%)",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%)",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%)",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(2.4px)',
                  WebkitBackdropFilter: 'blur(2.4px)',
                  clipPath: "polygon(0 0, 100% 1%, 100% 69%, 75% 100%, 0 100%, 0% 50%)",
                  border: "linear-gradient(90deg, #00b5ff, #9747ff);"
                }}
                className="relative p-4 rounded-lg flex items-center justify-between shadow--lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 -z-10 bg-transparent rounded-lg clip-path-border" />
                <div className="flex items-center space-x-4 relative">
                  <img src="/our-creators.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <h4 className="text-white font-semibold text-lg">Emerson Phillips</h4>
                    <div className="flex flex-row items-center gap-2">
                      <FaEthereum className="text-[#3B82F6]" /> 3.2 ETH
                    </div>
                  </div>
                </div>
                <button className="bg-transparent underline text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
                  Follow
                </button>
              </div>

            </div>
          </div>


        </section>

        <footer
          className="relative text-white py--14 h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./footerbg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="py-10 md:py-10"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(2.4px)',
              WebkitBackdropFilter: 'blur(2.4px)',
            }}
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center md:text-left">
                {/* Logo and Description */}
                <div className="col-span-1 lg:col-span-2">
                  <img
                    src="logo.png"
                    alt="Logo"
                    className="w-[150px] h-auto mx-auto md:mx-0 md:w-[200px] lg:w-[250px]"
                  />
                  <p className="text-sm leading-relaxed mt-4 md:pr-10 lg:pr-20">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna ultrices amet tellus ornare. Faucibus id posuere massa.
                  </p>
                </div>

                {/* Site Map */}
                <div className="md:col-span-1">
                  <h3 className="font-semibold text-lg mb-4">Site Map</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:text-blue-400">Home</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">About</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">NFT</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">Road map</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">Blog</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">Contact</Link></li>
                  </ul>
                </div>

                {/* Company */}
                <div className="md:col-span-1">
                  <h3 className="font-semibold text-lg mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:text-blue-400">Help & Support</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">Terms & Conditions</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">Privacy Policy</Link></li>
                  </ul>
                </div>

                {/* Resource */}
                <div className="md:col-span-1">
                  <h3 className="font-semibold text-lg mb-4">Resource</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="hover:text-blue-400">Partner</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">Blog</Link></li>
                    <li><Link href="#" className="hover:text-blue-400">Newsletter</Link></li>
                  </ul>
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-12 text-center md:text-start text-sm border-t border-gray-700 pt-6">
                <p>
                  Copyright <span className="text-blue-400">NFT core</span> 2022 All rights reserved
                </p>
              </div>
            </div>
          </div>
        </footer>


      </main>




    </div >
  );
}
