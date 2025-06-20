"use client";

import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional: lucide icons

const Carousel = ({ images }) => {
  const autoplay = useRef(
    Autoplay(
      { delay: 3000, stopOnInteraction: false },
      (root) => root.parentElement
    )
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // initial check
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images?.map((src, index) => (
            <div className="min-w-full relative" key={index}>
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${src}`}
                alt={`Slide ${index + 1}`}
                className="w-[80vw] mx-auto h-[80vh] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-[10vw] top-1/2 -translate-y-1/2 z-10  text-gray-100 rounded-full hover:scale-130 hover:cursor-pointer transition-all duration-500"
        aria-label="Previous"
        disabled={!canScrollPrev}
      >
        <ChevronLeft size={50} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-[10vw] top-1/2 -translate-y-1/2 z-10  text-gray-100 rounded-full hover:scale-130 hover:cursor-pointer transition-all duration-500"
        aria-label="Next"
        disabled={!canScrollNext}
      >
        <ChevronRight size={50} />
      </button>
    </div>
  );
};

export default Carousel;
