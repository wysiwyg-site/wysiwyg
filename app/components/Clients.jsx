"use client";

import React, { useEffect, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import Card from "./Cards";

const Clients = ({ direction = "left" }) => {
  const FAST_DURATION = 100;
  const SLOW_DURATION = 150;

  const clients = [
    { name: "Alcove", image: "/images/clients/client-Alcove.png" },
    { name: "Ambuja Neotia", image: "/images/clients/client-Ambuja-Neotia.png" },
    { name: "Anjika", image: "/images/clients/client-Anjika.png" },
    { name: "Avama Jewellers", image: "/images/clients/client-Avama-Jewellers.png" },
    { name: "Birla Academy of Art & Culture", image: "/images/clients/client-BAAC.png" },
    { name: "Belani", image: "/images/clients/client-Belani.png" },
    { name: "Bigo", image: "/images/clients/client-Bigo.png" },
    { name: "Birla Elevators", image: "/images/clients/client-Birla-Elevators.png" },
    { name: "Black Burn", image: "/images/clients/client-Black-Burn.png" },
    { name: "Celica Residency", image: "/images/clients/client-Celica-Residency.png", link:"/celica-residency" },
    { name: "Century Veneers", image: "/images/clients/client-Century-Veneers.png", link:"/century-veneers" },
    { name: "Dentasia", image: "/images/clients/client-Dentasia.png" },
    { name: "Dinshaw's", image: "/images/clients/client-Dinshaws.png" , link :"/dinshaws" }, 
    { name: "Earth Day Network", image: "/images/clients/client-Earth-Day-Network.png" },
    { name: "Electrosteel", image: "/images/clients/client-ElectroSteel.png" },
    { name: "Embee", image: "/images/clients/client-Embee.png" },
    { name: "Exide", image: "/images/clients/client-Exide.png" },
    { name: "Food Station", image: "/images/clients/client-Food-Station.png" },
    { name: "Frank Ross", image: "/images/clients/client-FrankRoss.png" },
    { name: "Gallery Sanskriti", image: "/images/clients/client-Gallery-Sanskriti.png" },
    { name: "Greaves", image: "/images/clients/client-Greaves.png" },
    { name: "IABA Housing", image: "/images/clients/client-IABA-Housing.png" },
    { name: "Idly Go", image: "/images/clients/client-IdlyGo.png" },
    { name: "IFB Agro", image: "/images/clients/client-IFB-Agro.png" },
    { name: "IFB Appliances", image: "/images/clients/client-IFB-Appliances.png" },
    { name: "ITC Hotels", image: "/images/clients/client-ITC-Hotels.png" },
    { name: "ITC", image: "/images/clients/client-ITC.png" },
    { name: "JD Jones", image: "/images/clients/client-JD-Jones.png" },
    { name: "Jindal", image: "/images/clients/client-Jindal.png" },
    { name: "JVL", image: "/images/clients/client-JVL.png" },
    { name: "Kothari", image: "/images/clients/client-Kothari.png" },
    { name: "Limtex", image: "/images/clients/client-Limtex.png" },
    { name: "Magik Cook", image: "/images/clients/client-Magik-Cook.png" },
    { name: "Mani Casadona", image: "/images/clients/client-Mani-Casadona.png" },
    { name: "Mansa Sugar", image: "/images/clients/client-Mansa-Sugar.png" },
    { name: "Mahadevi Birla World Academy", image: "/images/clients/client-MBWA.png" },
    { name: "Multimoney Forex", image: "/images/clients/client-Multimoney-Forex.png" },
    { name: "Manovikas Kendra", image: "/images/clients/client-MVK.png" },
    { name: "Palki", image: "/images/clients/client-Palki.png" },
    { name: "Poddar HMP Group", image: "/images/clients/client-Poddar-HMP-Group.png" },
    { name: "Presidency University Kolkata", image: "/images/clients/client-Presidency-University-Kolkata.png" },
    { name: "Scarlet Splendour", image: "/images/clients/client-Scarlet-Splendour.png" },
    { name: "South City International School", image: "/images/clients/client-SCIS.png" },
    { name: "SHE", image: "/images/clients/client-SHE.png" },
    { name: "Shivom Reality", image: "/images/clients/client-Shivom-Reality.png" },
    { name: "Siddha", image: "/images/clients/client-Siddha.png" },
    { name: "SnoBitee", image: "/images/clients/client-SnoBite.png" },
    { name: "Sofmax", image: "/images/clients/client-Sofmax.png" },
    { name: "Suwalif Tea", image: "/images/clients/client-Suwalif-Tea.png" },
    { name: "client Swarnim International School", image: "/images/clients/client-Swarnim-International-School.png" },
    { name: "Swayam", image: "/images/clients/client-Swayam.png" },
    { name: "Tata Steel", image: "/images/clients/client-Tata-Steel.png" },
    { name: "Teloijan", image: "/images/clients/client-Teloijan.png" },
    { name: "The New Town School", image: "/images/clients/client-The-New-Town-School.png" },
    { name: "The Organic Mandi", image: "/images/clients/client-The-Organic-Mandi.png" },
    { name: "The Vedary", image: "/images/clients/client-The-Vedary.png" },
    { name: "Tycab", image: "/images/clients/client-Tycab.png" },
    { name: "Visa Steel", image: "/images/clients/client-Visa-Steel.png" },
    { name: "Zois", image: "/images/clients/client-Zois.png" },
  
  
  ];

  const [duration, setDuration] = useState(FAST_DURATION);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    const finalPosition =
      direction === "left" ? -width / 2 - 19 : width / 2 + 19;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration:
          duration *
          (1 - Math.abs(xTranslation.get()) / Math.abs(finalPosition)),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return () => controls?.stop?.();
  }, [rerender, xTranslation, duration, width, direction]);

  return (
    <div className="bg-black ">
      {/* Top Line */}
      <div className="animate-fadeInSlow">
        <div className="w-full  h-px bg-gray-500 opacity-40 z-0" />
        <div className=" max-w-[80vw] mx-auto">
          {/* Content Section */}
          <div className="py-8  md:flex justify-between items-center gap-10">
            {/* Left Text */}
            <div className="text-white max-w-md flex-shrink-0 z-20 mb-12 md:mb-2">
              <h2 className="text-md md:text-lg text-gray-200 font-medium mb-2">
                At Wysiwyg, we design with heart, mind, and a bit of madness.
                Because when you’re creating something unforgettable, playing it
                safe isn’t part of the script.<br/>
                 As already successfully implemented by 250+ partners:
              </h2>
              {/* <p className="text-gray-200 text-sm md:text-base">
                As already successfully implemented by 250+ partners:
              </p> */}
            </div>

            {/* Scrolling Clients */}
            <div className="relative h-[12vh] overflow-x-hidden items-center   w-full max-w-full">
              <motion.div
                className="absolute left-0 2xl:top-1/5 flex gap-8 md:gap-10 items-center"
                style={{ x: xTranslation }}
                ref={ref}
                onHoverStart={() => {
                  setMustFinish(true);
                  setDuration(SLOW_DURATION);
                }}
                onHoverEnd={() => {
                  setMustFinish(true);
                  setDuration(FAST_DURATION);
                }}
              >
                {[...clients, ...clients].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <Card image={item.image} name={item.name} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Fade Overlay */}
              <div className="absolute inset-0 z-10 w-full pointer-events-none bg-[linear-gradient(to_right,_black_0%,_rgba(0,0,0,0.45)_15%,_rgba(0,0,0,0)_60%,_rgba(0,0,0,0.45)_85%,_black_100%)]" />
            </div>
          </div>

          {/* Bottom Line */}
        </div>
        <div className="w-full h-px bg-gray-500 opacity-40" />
      </div>
    </div>
  );
};

export default Clients;
