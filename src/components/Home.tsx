import ImageSlider from './ImageSlider';
import { Award, Users, BookOpen, TrendingUp } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export default function Home() {
  const stats = [
    { icon: Users, label: 'Students', value: 1000, suffix: '+' },
    { icon: BookOpen, label: 'Courses', value: 15, suffix: '+' },
    { icon: Award, label: 'Awards', value: 50, suffix: '+' },
    { icon: TrendingUp, label: 'Success Rate', value: 98, suffix: '%' },
  ];
  const welcomeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // count-up state
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const countsRef = useRef<number[]>(stats.map(() => 0));
  const countingRef = useRef<boolean>(false);

  const handleLearnMore = () => {
    welcomeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const elems = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('revealed');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18 }
    );
    elems.forEach((el, i) => {
      el.style.setProperty('--delay', `${i * 80}ms`);
      io.observe(el);
    });

    // observe stats block to start counting
    const statsEl = root.querySelector('#home-stats');
    if (statsEl) {
      const sIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !countingRef.current) {
              countingRef.current = true;
              // animate counts
              stats.forEach((s, idx) => {
                const target = s.value;
                const duration = 1200;
                const start = performance.now();
                const step = (now: number) => {
                  const t = Math.min(1, (now - start) / duration);
                  const value = Math.floor(t * target);
                  countsRef.current[idx] = value;
                  setCounts([...countsRef.current]);
                  if (t < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
              });
              sIo.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );
      sIo.observe(statsEl);
    }

    return () => io.disconnect();
  }, []);

  return (
    <section className="pt-20" ref={containerRef}>
      <ImageSlider />

      <div id="home-stats" className="py-16 bg-gradient-to-br from-blue-50 to-blue-100 reveal" data-delay="0ms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 border border-blue-100"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-900 transition-colors duration-300">
                      <Icon className="text-blue-900 group-hover:text-white transition-colors duration-300" size={36} />
                    </div>
                  </div>
                  <h3 className="text-4xl font-extrabold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {counts[index]}
                    {stat.suffix}
                  </h3>
                  <p className="text-gray-600 text-lg">{stat.label}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLearnMore}
              className="bg-blue-900 btn-ripple text-white px-8 py-3 rounded-md font-semibold shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div ref={welcomeRef} className="py-16 bg-white reveal" data-delay="0ms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              Welcome to Munner Ram Inter College
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At <span className="font-semibold text-blue-900">Munner Ram Inter College</span>, we are committed to providing quality
              education and nurturing young minds. Our institution offers a
              comprehensive learning environment with modern facilities,
              experienced faculty, and a focus on holistic development. We
              prepare students for both academic excellence and real-world
              challenges.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/about"
                className="inline-block bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-900 hover:to-blue-700 transition-all"
              >
                About Our College
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
