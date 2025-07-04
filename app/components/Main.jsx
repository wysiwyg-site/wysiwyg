"use client";
import React from "react";
import Botton from "./Botton";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-playfair",
  display: "swap",
});

function Main() {
  return (
    <div className="bg-gradient-to-br from-[#111010] via-[#0f0e0e] to-[#000000]">
      <section className="animate-fadeInSlow max-w-[80vw] mx-auto min-h-[80vh] flex flex-col lg:flex-row gap-5 md:gap-20 lg:gap-5  justify-center   lg:justify-between lg:items-center     text-white ">
        {/* Left section: Headline */}

        <div className="text-left min-w-[50vw]">
          <h1 className="text-[2.8rem] sm:text-[52px] md:text-8xl   2xl:text-[120px] font-medium  md:leading-tight text-white">
            We don’t just <br />
            <span className="font-medium">design</span>, we <br />
            <span className={` text-white`}>
              disrupt <span className={`${playfair.className}`}> norms</span>
            </span>
          </h1>
        </div>

        {/* Right section: Manifesto Summary & CTA */}
        <div className="mt-10 md:mt-0 max-w-[80vw] space-y-4  text-left ">
          <p className="text-gray-300 text-sm 2xl:text-lg md:text-lg lg:text-base leading-relaxed">
            Symmetry is optional. Vibe is everything. We design with
            precision—but we leave room for the unexpected. Because perfect is
            boring.
          </p>
          <p className="uppercase text-xs text-gray-400 tracking-wider">
            Real design. Real impact. No filters.
          </p>
          <Botton value={"SEE MORE ABOUT US"} size={"xl"} />
        </div>
      </section>
    </div>
  );
}

export default Main;
