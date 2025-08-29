import { useEffect, useRef, useState } from 'react';
import image1 from "../images/project1.jpg"
import image2 from "../images/project2.jpg"
import image3 from "../images/project3.jpg"


// Simple slides array — replace the src strings with your real image paths
const slidesData = [
  { src: image1, title: 'Project 1', desc: 'Description for project 1' },
  { src: image2, title: 'Project 2', desc: 'Description for project 2' },
  { src: image3, title: 'Project 3', desc: 'Description for project 3' },
];

export default function ProjectsSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const AUTO_MS = 5000; // milliseconds between auto slides

  // Start the auto-advance interval
  const startInterval = () => {
    // clear previous if any
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slidesData.length);
    }, AUTO_MS);
  };

  // Navigate to a specific slide (mimics your original JS behaviour)
  function navigateToSlide(index) {
    clearInterval(intervalRef.current); // stop auto
    setCurrent(index); // show the chosen slide
    startInterval(); // restart auto
  }

  // Initialize interval on mount and clean up on unmount
  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="projects" className="section w-full">
      {/* Slider container */}
      <div className="relative overflow-hidden h-[400px]">
        {/* Slides (absolutely positioned, fading using opacity) */}
        {slidesData.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay content */}
            <div className="absolute bottom-0 w-full flex flex-col items-center justify-center p-5 bg-[rgba(0,0,0,0.75)] text-white">
              <h2 className="text-2xl font-semibold">{slide.title}</h2>
              <p className="text-sm mt-2 max-w-2xl text-center">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center mt-5">
        {slidesData.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => navigateToSlide(i)}
            className={`w-2.5 h-2.5 rounded-full mx-1 focus:outline-none ${
              i === current ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}





































/*

import { useEffect, useState, useRef } from "react"
import image1 from "../images/project1.jpg"
import image2 from "../images/project2.jpg"
import image3 from "../images/project3.jpg"

const slideData = [
    {src : image1, title : "Project 1", desc : "description for project 1"},
    {src : image2, title : "Project 2", desc : "description for project 2"},
    {src : image3, title : "Project 3", desc : "description for project 3"}
]


export default function Slider(){
    const [current, setCurrent] = useState(0)
    const intervalRef = useRef(null)
    const AUTO_MS = 5000 //time between slides

    //start the auto-advanced interval
    const startInterval = () => {
        //clear if there are previous
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setCurrent(c => (c + 1) % slideData.length)
        }, AUTO_MS)
    }

    // navigate to a specific slide
    function navigateToSlide(index){
        clearInterval(intervalRef.current) //stop auto
        setCurrent(index) // show the chosen slide
        startInterval() // restart auto
    }

    // initialize interval on mount and clean up on unmount.
    useEffect(() => {
        startInterval()
        return () => clearInterval(intervalRef.current)
    }, [])


    return(
        <section id="projects" className="section">
            {/*Slider container }
            <div className="relative overflow-hidden h-[400px]">
                {/*Slides(absolutely positioned, opacity fading) }
                {slideData.map((slide, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out
                                  ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    >
                        <img 
                          src={slide.rsc}
                          alt={slide.title}
                          className="w-full h-full object-cover"       
                        />
                        {/* overlay content }
                        <div className="absolute bottom-0 w-full flex flex-col items-center justify-center p-5 text-white bg-[rgba(0,0,0,0.75)]">
                            <h2 className="text-2xl font-semibold">{slide.title}</h2>
                            <p className="text-sm mt-2  max-w-2xl text-center">{slide.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* dot navigation }
            <div className="flex justify-center mt-5">
                {slideData.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => navigateToSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full mx-1 focus:outline-none 
                                  ${i === current ? "bg-gray-600" : "bg-gray-300"}`}      
                    />
                ))}

            </div>
        </section>
    )
}*/