import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Welcome to Munner Ram Inter College',
    description: 'Excellence in Education Since Establishment',
    image: '/frontend.jpg',
  },
  {
    id: 2,
    title: 'State-of-the-Art Facilities',
    description: 'Modern Labs and Learning Environments',
    image: '/puja3.jpg',
  },
  {
    id: 3,
    title: 'Shaping Future Leaders',
    description: 'Quality Education for Better Tomorrow',
    image: '/puja2.jpg',
  },
  {
    id: 4,
    title: 'Join Our Community',
    description: 'Admission Open for New Session',
    image: '/felld.jpg',
  },
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({});
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    };
    start();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const pause = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const resume = () => {
    if (!timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  };

  // Inline SVG fallback (data URL)
  const svgPlaceholder = (() => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
        <defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='%23e6eefc'/><stop offset='1' stop-color='%23dbeafe'/></linearGradient></defs>
        <rect width='100%' height='100%' fill='url(#g)'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%234a5568' font-family='Arial, Helvetica, sans-serif' font-size='28'>
          Image not available
        </text>
      </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  })();

  return (
    <div
      className="relative h-[500px] w-full overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-roledescription="carousel"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          aria-hidden={index !== currentSlide}
        >
          {/* placeholder background while loading */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-300" />

          <img
            src={slide.image}
            alt={slide.title}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover img-fade ${loadedMap[index] ? 'visible' : ''
              }`}
            onLoad={() => setLoadedMap((m) => ({ ...m, [index]: true }))}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              // hide broken image and keep placeholder
              img.style.display = 'none';
              setLoadedMap((m) => ({ ...m, [index]: false }));
            }}
          />

          {/* Overlay for darkening the image */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex items-center justify-center h-full">
            <div className="text-center text-white px-4 reveal" data-delay="0ms">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl drop-shadow-lg">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all z-20"
        aria-label="Next Slide"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
