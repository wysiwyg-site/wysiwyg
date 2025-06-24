"use client";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import FadeIn from "./FadeIn";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-playfair",
  display: "swap",
});

export default function ScrollScaleImage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [3.4, 4]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const opacityNew = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 0, 1]);
  const transformY = useTransform(scrollYProgress, [0, 0.5, 1], [500, 500, 0]);

  return (
    <div ref={container} className="Container">
      <div className="sticky">
        {/* Single center image */}
        <motion.div style={{ scale, opacity }} className="el">
          <div className="imageContainer">
            <Image
              src="/images/scrollImage2.jpg"
              fill
              alt="image"
              loading="lazy"
              className="rounded-xs object-contain"
            />
          </div>
        </motion.div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex  w-[80vw] mx-auto   z-10  pt-8">
          <motion.div
            className="text-center"
            style={{ opacity: opacityNew, y: transformY }}
          >
            <div className="flex flex-col w-full  gap-10 items-center  rounded-3xl  md:flex-row">
              <div className=" py-10  text-xl md:text-[36px] 2xl:text-5xl font-semibold text-[#fefdf8]">
                <FadeIn view="-400px">
                  <p className="  text-left my-12 md:my-16 ">
                    Design isn’t mainstream. It’s got character. It grabs
                    attention, spins it around, and leaves a mark. If you want
                    quiet, you’re in the wrong place.
                  </p>
                </FadeIn>
                <FadeIn view="-400px">
                  <p className="  text-left  my-12 md:my-16 ">
                    Colours aren’t curated—they explode. Palettes are for
                    painters; we mix shades with attitude. Bold? Always. Basic?
                    Never.
                  </p>
                </FadeIn>
                <FadeIn view="-400px">
                  <p className="  text-left my-12  md:my-16 ">
                    At Wysiwyg, we don’t just design—we disrupt. Creativity
                    isn’t a box to fit into; it’s a wall to break through. We
                    chase the spark, ride the chaos and craft designs that don’t
                    just sit there—they shout.
                  </p>
                </FadeIn>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
