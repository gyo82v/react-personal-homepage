import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import image1 from "../images/project1.jpg"
import image2 from "../images/project2.jpg"
import image3 from "../images/project3.jpg"

// Slides — replace the src strings with your real image paths
const slidesData = [
  { src: image1, title: 'Project 1', desc: 'Description for project 1' },
  { src: image2, title: 'Project 2', desc: 'Description for project 2' },
  { src: image3, title: 'Project 3', desc: 'Description for project 3' },
];

/**
 * ProjectsSlider
 * Automatically selects behaviour based on device capability:
 * - Touch-capable devices => Translate/drag implementation (swipe follow)
 * - Non-touch devices (desktop) => Fade implementation (opacity transition)
 */
export default function ProjectsSlider() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0) || window.matchMedia('(pointer: coarse)').matches);
    setIsTouchDevice(Boolean(hasTouch));
  }, []);

  return isTouchDevice ? <TranslateSlider slides={slidesData} /> : <FadeSlider slides={slidesData} />;
}

/* ------------------ FadeSlider (desktop) ------------------ */
function FadeSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);
  const AUTO_MS = 5000;

  const startInterval = () => {
    clearInterval(intervalRef.current);
    if (isPausedRef.current) return;
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), AUTO_MS);
  };

  const pauseAutoplay = () => {
    isPausedRef.current = true;
    clearInterval(intervalRef.current);
  };
  const resumeAutoplay = () => {
    isPausedRef.current = false;
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function nextSlide() {
    clearInterval(intervalRef.current);
    setCurrent((c) => (c + 1) % slides.length);
    if (!isPausedRef.current) startInterval();
  }
  function prevSlide() {
    clearInterval(intervalRef.current);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    if (!isPausedRef.current) startInterval();
  }
  function goTo(i) {
    clearInterval(intervalRef.current);
    setCurrent(i);
    if (!isPausedRef.current) startInterval();
  }

  return (
    <section  className="w-full">
      <div
        className="relative overflow-hidden h-[400px]"
        onPointerEnter={pauseAutoplay}
        onPointerLeave={resumeAutoplay}
        onFocus={pauseAutoplay}
        onBlur={resumeAutoplay}
        tabIndex={-1}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              i === current ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" />

            <div className="absolute bottom-0 w-full flex flex-col items-center justify-center p-5 bg-[rgba(0,0,0,0.75)] text-white">
              <h2 className="text-2xl font-semibold">{slide.title}</h2>
              <p className="text-sm mt-2 max-w-2xl text-center">{slide.desc}</p>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-30"
        >
          <FaChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-30"
        >
          <FaChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center mt-5">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full mx-1 focus:outline-none ${i === current ? 'bg-gray-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------ TranslateSlider (touch: drag & follow) ------------------ */
function TranslateSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const rafRef = useRef(null);

  const isPausedRef = useRef(false);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const touchDeltaXRef = useRef(0);
  const isSwipingRef = useRef(false);

  const AUTO_MS = 5000;
  const SWIPE_THRESHOLD = 50;

  const startInterval = () => {
    clearInterval(intervalRef.current);
    if (isPausedRef.current) return;
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), AUTO_MS);
  };
  const pauseAutoplay = () => {
    isPausedRef.current = true;
    clearInterval(intervalRef.current);
  };
  const resumeAutoplay = () => {
    isPausedRef.current = false;
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function navigateToSlide(index) {
    clearInterval(intervalRef.current);
    setCurrent(index);
    setDragX(0);
    if (!isPausedRef.current) startInterval();
  }
  function nextSlide() {
    clearInterval(intervalRef.current);
    setCurrent((c) => (c + 1) % slides.length);
    setDragX(0);
    if (!isPausedRef.current) startInterval();
  }
  function prevSlide() {
    clearInterval(intervalRef.current);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setDragX(0);
    if (!isPausedRef.current) startInterval();
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Touch & drag follow logic */
  const scheduleSetDrag = (x) => {
    touchDeltaXRef.current = x;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setDragX(touchDeltaXRef.current);
      rafRef.current = null;
    });
  };

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length > 1) return;
    pauseAutoplay();
    setIsDragging(true);
    isSwipingRef.current = false;
    touchDeltaXRef.current = 0;
    const t = e.touches[0];
    touchStartXRef.current = t.clientX;
    touchStartYRef.current = t.clientY;
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length > 1 || touchStartXRef.current == null) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartXRef.current;
    const dy = t.clientY - touchStartYRef.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
      isSwipingRef.current = true;
      // e.preventDefault(); // optional
    }

    if (isSwipingRef.current) scheduleSetDrag(dx);
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current == null) {
      setIsDragging(false);
      resumeAutoplay();
      return;
    }

    const dx = touchDeltaXRef.current || dragX;

    if (isSwipingRef.current && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx > 0) prevSlide();
      else nextSlide();
    } else {
      setDragX(0);
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchDeltaXRef.current = 0;
    isSwipingRef.current = false;
    setIsDragging(false);

    setTimeout(() => resumeAutoplay(), 50);
  };

  /* helper for wrapping diffs */
  const signedIndexDiff = (i, j, n) => {
    let d = i - j;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <section id="projects" className="section">
      <div
        ref={containerRef}
        className="relative overflow-hidden h-[400px] touch-action-pan-y"
        onPointerEnter={pauseAutoplay}
        onPointerLeave={resumeAutoplay}
        onFocus={pauseAutoplay}
        onBlur={resumeAutoplay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={-1}
      >
        {slides.map((slide, i) => {
          const width = containerRef.current?.clientWidth || 0;
          const diff = signedIndexDiff(i, current, slides.length);
          const baseX = diff * width;
          const translate = baseX + (isDragging ? dragX : 0);
          const style = { transform: `translate3d(${translate}px, 0, 0)` };
          const transitionClass = isDragging ? 'transition-none' : 'transition-transform duration-300 ease-out';

          return (
            <div key={i} className={`absolute inset-0 w-full h-full flex items-stretch ${transitionClass}`} style={style}>
              <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 w-full flex flex-col items-center justify-center p-5 bg-[rgba(0,0,0,0.75)] text-white">
                <h2 className="text-2xl font-semibold">{slide.title}</h2>
                <p className="text-sm mt-2 max-w-2xl text-center">{slide.desc}</p>
              </div>
            </div>
          );
        })}

        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-30"
        >
          <FaChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-30"
        >
          <FaChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center mt-5">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => navigateToSlide(i)}
            className={`w-2.5 h-2.5 rounded-full mx-1 focus:outline-none ${i === current ? 'bg-gray-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
}
