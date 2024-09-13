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

  useEffect(() => {
    const flipBox = document.querySelector(`.${styles.flipCardInner}`);
    flipBox.addEventListener("mouseenter", () => {
      gsap.to(flipBox, {
        duration: 0.5,
        rotationY: 180,
        ease: "power2.out",
      });
    });
    flipBox.addEventListener("mouseleave", () => {
      gsap.to(flipBox, {
        duration: 0.5,
        rotationY: 0,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <div
    // classNameName="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white"


    >
      <header
        ref={headerRef}
        className="relative border-2 border-[red] text-white py-4 h-auto "
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
            <Link href="#" className="hover:text-[#15BFFD]">
              Marketplace{" "}
              <span className="bg-blue-500 text-white px-2 py-1 text-sm rounded">
                PRO
              </span>
            </Link>
            <Link href="#" className="hover:text-[#15BFFD]">
              How it Works
            </Link>
          </nav>

          {/* Buttons for Larger Screens */}
          <div className="hidden lg:flex items-center space-x-4 mt-4 lg:mt-0 border-2 border-yellow-300">
            <button className="text-white">
              <CiSearch className="w-6 h-6 text-white" />
            </button>
            <button className="border border-[#15BFFD] text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">
              Connect Wallet
            </button>
            <button className="bg-[#15BFFD] p-2 rounded-full animate-bounce">
              <HiOutlineDownload className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 py-32 w-[80%]  mx-auto relative z-10">
          <div className="bg--gray-200 p--6 text-start border border-gray-300 rounded-lg shadow-md">
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
          </div>




          <div className="bg-gray-200  text-center border-2 border-red-600 rounded-lg shadow-md">
            <div className="relative bg-[#0a143b] flex justify-start items-center overflow-hidden h-full">

              {/* <div className="relative w-full max-w-[20rem] h-[0] pb-[56.25%] md:max-w-[20rem] md:pb-[70%] bg-cover bg-center rounded-lg shadow-lg transform z-10" style={{ backgroundImage: "url('./card02.png')" }}></div> */}
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



              {/* <div className="absolute top--[-1.5rem] right-[-1.5rem] sm:top-[-2rem] sm:right-[-2rem] md:top--[-2rem] md:right-[-2rem] lg:top--[-2.5rem] lg:right--[-2.5rem] w-20 h-20 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                <img src="spintag.png" alt="Kin Rare & Exclusive" className="w-full h-full animate-spin" />
              </div> */}

            </div>
          </div>



        </div>

      </header >






      <main>
        <section className="relative border-2 border-[red] text-white py-4 h-auto "

          style={{
            backgroundImage: "url('./2bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div class="border-2 border-yellow-500 bg-gradient-to-r text-white  py-10 lg:py-20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between space-y-8 lg:space-y-0"

            style={{
              background: 'rgba(255, 255, 255, 0.04 )',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(2.4px)',
              WebkitBackdropFilter: 'blur(2.4px)',

            }}
          >

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

            <div className="border-2 border-yellow-500 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 justify-between">

              <div className=" relative w-full max-w-xs lg:max-w-md mx-auto lg:ml-auto lg:mr--0">
                <div className="relative h-[300px] lg:h-[400px]">
                  <img
                    src="vector2.png"
                    alt="Why Choose Us Image 1"
                    class=" rotate-6  absolute top-0 left-1/2 transform -translate-x-1/2"
                  />
                  <img
                    src="why_choose.png"
                    alt="Why Choose Us Image 2"
                    class="rounded-lg  -rotate-6 hover:rotate-0 transition duration-300 absolute top-0 left-1/2 transform -translate-x-2/4"
                  />
                </div>
              </div>


              <div className="text-center lg:text-left max-sm:pt-10 max-md:pt-10 max-lg:pt-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Why choose us?
                </h2>
                <p className="text-white text--opacity-75 mb-6">
                  Lorem ipsum dolor sit amet consectetur. Congue eu arcu neque um semper.
                  Eros suspendisse varius enim ultrices...
                  Lorem ipsum dolor sit amet consectetur. Congue eu arcu neque um semper.
                  Eros suspendisse varius enim ultrices...
                </p>
                <p className="text-white text--opacity-75 mb-6">
                  Lorem ipsum dolor sit amet consectetur. Congue eu arcu neque um semper.
                  Eros suspendisse varius enim ultrices...
                </p>
                <button
                  className="bg-[#00b4d8] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0077b6] transition duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>





        </section>
        <section>
          <div className=" py-12 px-6">


            <h2 className="text-center text-white text-3xl mb-8">Live Auction</h2>
            <p className="text-center text-white mb-12">
              The largest and unique Super rare NFT marketplace for crypto-collectibles
            </p>

            <div className="flex flex-wrap justify-center">
              {/* Flip Card 1 */}
              <div className={styles.flipCard}>
                <div className={styles.flipCardInner}>
                  <div className={styles.flipCardFront}>
                    <img
                      src="card01.png" // Update with the correct path to your image
                      alt="Artwork"
                      className={styles.cardImage}
                    />
                    <div className={styles.overlayInfo}>
                      <p>Current bid</p>
                      <h4>3.2 ETH</h4>
                    </div>
                  </div>
                  <div className={styles.flipCardBack}>
                    <h2>Bid on Artwork</h2>
                    <button className={styles.bidButton}>Place bid</button>
                  </div>
                </div>
              </div>

              {/* Flip Card 2 */}
              <div className={`${styles.flipBox} ${styles.alternative}`}>
                <div className={styles.object}>
                  <div className={styles.front}>
                    <div className={styles.flipContent}>
                      <div className={styles.frontBox}>
                        <h1>Your Must Haves</h1>
                        <h4>APARTMENT FEATURES</h4>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.back} ${styles.flipBack}`}>
                    <div className={styles.backOpacity}>
                      <div className={styles.flipContent}>
                        <div className={styles.backBox}>
                          <h6>Your Must Haves</h6>
                          <h2>APARTMENT FEATURES</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                          </p>
                          <div className={styles.fpButtonPad}>
                            <a
                              className={styles.miniOButton}
                              href="/apartment-features/"
                            >
                              Features
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.flank}></div>
                  </div>
                </div>
              </div>

              {/* Flip Card 3 */}
              <div className={`${styles.flipBox} ${styles.alternative}`}>
                <div className={styles.object}>
                  <div className={styles.front}>
                    <div className={styles.flipContent}>
                      <div className={styles.frontBox}>
                        <h1>Studios to Townhomes</h1>
                        <h4>CHOOSE YOUR FLOORPLAN</h4>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.back} ${styles.flipBack}`}>
                    <div className={styles.backOpacity}>
                      <div className={styles.flipContent}>
                        <div className={styles.backBox}>
                          <h6>Studios to Townhomes</h6>
                          <h2>CHOOSE YOUR FLOORPLAN</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                          </p>
                          <div className={styles.fpButtonPad}>
                            <a className={styles.miniOButton} href="/floorplans/">
                              Floorplans
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.flank}></div>
                  </div>
                </div>
              </div>


            </div>
          </div>

        </section>

      </main>




    </div >
  );
}
