import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
	{
		id: 1,
		title: 'Welcome to Munnar Ram Inter College',
		description: 'Excellence in Education Since Establishment',
		image: '/frontend.jpg',
	},
	{
		id: 2,
		title: 'Principal Event',
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
	const containerRef = useRef<HTMLDivElement | null>(null);
	const imgRefs = useRef<Array<HTMLImageElement | null>>([]);
	const isInteracting = useRef(false);

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
		isInteracting.current = true;
		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}
	};
	const resume = () => {
		isInteracting.current = false;
		if (!timerRef.current) {
			timerRef.current = window.setInterval(() => {
				setCurrentSlide((prev) => (prev + 1) % slides.length);
			}, 5000);
		}
	};

	// mouse parallax handler
	const handleMouseMove = (e: React.MouseEvent) => {
		const container = containerRef.current;
		if (!container) return;
		const rect = container.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		const maxTranslate = 30; // px
		const tx = -x * maxTranslate;
		const ty = -y * (maxTranslate * 0.6);
		const img = imgRefs.current[currentSlide];
		if (img) {
			img.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.03)`;
			img.classList.add('parallax-smooth');
		}
	};

	const handleMouseLeave = () => {
		const img = imgRefs.current[currentSlide];
		if (img) {
			img.style.transform = '';
		}
		resume();
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
			ref={containerRef}
			className="relative h-[500px] w-full overflow-hidden"
			onMouseEnter={pause}
			onFocus={pause}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onBlur={resume}
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
						ref={(el) => (imgRefs.current[index] = el)}
						src={slide.image}
						alt={slide.title}
						loading="lazy"
						className={`absolute inset-0 w-full h-full object-cover img-fade ${loadedMap[index] ? 'visible' : ''
							}`}
						onLoad={() => setLoadedMap((m) => ({ ...m, [index]: true }))}
						onError={(e) => {
							const img = e.currentTarget as HTMLImageElement;
							// replace broken image with SVG placeholder
							(img as any).onerror = null;
							img.src = svgPlaceholder;
							setLoadedMap((m) => ({ ...m, [index]: true }));
						}}
					/>

					{/* Overlay for darkening the image */}
					<div className="absolute inset-0 bg-black/60" />
					<div className="relative flex items-center justify-center h-full">
						<div className="text-center text-white px-4 reveal" data-delay="0ms">
							<span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em]">
								Inspired Learning
							</span>
							<h2 className="mt-4 text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
							<p className="text-lg md:text-2xl text-white/80 drop-shadow-md">{slide.description}</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
								<a
									href="/galleryphoto"
									className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
								>
									Explore Campus
								</a>
								<a
									href="/admission"
									className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
								>
									Begin Admission
								</a>
							</div>
						</div>
					</div>
				</div>
			))}

			<button
				onClick={() => { pause(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all z-20"
				aria-label="Previous Slide"
			>
				<ChevronLeft size={32} />
			</button>

			<button
				onClick={() => { pause(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all z-20"
				aria-label="Next Slide"
			>
				<ChevronRight size={32} />
			</button>

			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => { pause(); setCurrentSlide(index); }}
						className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
