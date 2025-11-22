import ImageSlider from './ImageSlider';
import {
  Award,
  Users as UsersIcon,
  BookOpen,
  TrendingUp,
  Newspaper,
  GalleryHorizontal,
  FileText,
  Phone,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export default function Home() {
  const stats = [
    { icon: UsersIcon, label: 'Students', value: 1000, suffix: '+' },
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

  // News / Quick data (non-real placeholders)
  const newsList = [
    'Admissions Open for 2025-26 — Apply Now',
    'Annual Sports Day scheduled on 10th April 2025',
    'Science Exhibition winners announced',
  ];

  // Testimonials
  const testimonials = [
    { name: 'A. Student', role: 'Alumnus', quote: 'Excellent faculty and supportive environment.' },
    { name: 'B. Parent', role: 'Parent', quote: 'Great focus on all-round development.' },
    { name: 'C. Teacher', role: 'Faculty', quote: 'Collaborative and motivated students.' },
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const teamHighlights = [
    { label: 'Integrated Curriculum', description: 'Experiential learning across STEAM, arts, and civic leadership.' },
    { label: 'Mentor Network', description: 'Advisors, wellbeing coaches, and university partners for every learner.' },
    { label: 'Community Impact', description: 'Students lead sustainability drives and outreach programs.' },
  ];

  const teamMembers = [
    { name: 'Anita Yadav', role: 'Principal & Academic Lead', image: '\puja3.jpg' },
    { name: 'Mr.Sunil & Rohit Yadav', role: 'Head of Innovation', image: '\puja2.jpg' },
    { name: 'Ms.Anil ', role: 'Curriculum Director', image: '/servicers.jpg' },
    { name: 'Mr. Manoj ', role: 'Global Programs Coordinator', image: '\image.png' },
  ];

  useEffect(() => {
    const t = setInterval(() => setTestimonialIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handlePrevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const handleNextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);

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
      {/* Notice Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-2 px-4 flex items-center justify-center text-sm md:text-base gap-4">
        <Newspaper size={16} />
        <div className="flex gap-6 items-center">
          {newsList.map((n, i) => (
            <span key={i} className="whitespace-nowrap">
              {n}
            </span>
          ))}
        </div>
      </div>

      <ImageSlider />

      {/* Quick Action Cards */}
      <div className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admission"
            role="button"
            aria-label="Admission - Apply Now"
            className="w-full flex flex-col items-center gap-3 bg-blue-50 hover:bg-blue-100 p-4 sm:p-6 rounded-lg shadow-sm text-center transition touch-manipulation focus:outline-none focus:ring-3 focus:ring-blue-200"
          >
            <FileText className="text-blue-900" size={28} />
            <span className="font-semibold text-blue-900">Admission</span>
            <small className="text-gray-500">Apply Now</small>
          </a>

          <a
            href="/gallery"
            role="button"
            aria-label="Gallery - Campus Photos"
            className="w-full flex flex-col items-center gap-3 bg-blue-50 hover:bg-blue-100 p-4 sm:p-6 rounded-lg shadow-sm text-center transition touch-manipulation focus:outline-none focus:ring-3 focus:ring-blue-200"
          >
            <GalleryHorizontal className="text-blue-900" size={28} />
            <span className="font-semibold text-blue-900">Gallery</span>
            <small className="text-gray-500">Campus Photos</small>
          </a>

          <a
            href="/results"
            role="button"
            aria-label="Results - Check Results"
            className="w-full flex flex-col items-center gap-3 bg-blue-50 hover:bg-blue-100 p-4 sm:p-6 rounded-lg shadow-sm text-center transition touch-manipulation focus:outline-none focus:ring-3 focus:ring-blue-200"
          >
            <Award className="text-blue-900" size={28} />
            <span className="font-semibold text-blue-900">Results</span>
            <small className="text-gray-500">Check Results</small>
          </a>

          <a
            href="/contact"
            role="button"
            aria-label="Contact - Get in touch"
            className="w-full flex flex-col items-center gap-3 bg-blue-50 hover:bg-blue-100 p-4 sm:p-6 rounded-lg shadow-sm text-center transition touch-manipulation focus:outline-none focus:ring-3 focus:ring-blue-200"
          >
            <Phone className="text-blue-900" size={28} />
            <span className="font-semibold text-blue-900">Contact</span>
            <small className="text-gray-500">Get in touch</small>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div id="home-stats" className="py-16 bg-gradient-to-br from-blue-50 to-blue-100 reveal" data-delay="0ms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 border border-blue-100"
                >
                  <div className="flex justify-center mb-3">
                    <div className="bg-blue-100 p-3 sm:p-4 rounded-full group-hover:bg-blue-900 transition-colors duration-300">
                      <Icon className="text-blue-900 group-hover:text-white transition-colors duration-300" size={32} />
                    </div>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-2">
                    {counts[index]}
                    {stat.suffix}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg">{stat.label}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLearnMore}
              className="bg-blue-900 btn-ripple text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-semibold shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-3 focus:ring-blue-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* News & Events */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Latest News & Events</h3>
          <ul className="space-y-2 text-gray-700">
            {newsList.map((n, i) => (
              <li key={i} className="flex items-start gap-3">
                <Newspaper className="text-blue-700 mt-1" size={18} />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Testimonials (stacked on small screens) */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">What People Say</h3>
          <div className="relative bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <p className="text-gray-700 italic mb-4">“{testimonials[testimonialIndex].quote}”</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-blue-900">{testimonials[testimonialIndex].name}</div>
                <div className="text-sm text-gray-500">{testimonials[testimonialIndex].role}</div>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Previous testimonial" onClick={handlePrevTestimonial} className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 touch-manipulation">
                  <ChevronLeft size={18} />
                </button>
                <button aria-label="Next testimonial" onClick={handleNextTestimonial} className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 touch-manipulation">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Mentors */}
      <div className="py-16 bg-slate-950 text-white reveal" data-delay="0ms">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">Our Leadership</p>
            <h3 className="text-3xl sm:text-4xl font-semibold">Guiding every learner with purpose</h3>
            <p className="text-slate-300 max-w-3xl mx-auto">
              Faculty mentors, innovation heads, and wellbeing coaches collaborate with families to craft global learning pathways.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {teamHighlights.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-semibold text-emerald-200">{item.label}</p>
                <p className="text-sm text-slate-200">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-600/20 to-slate-900/60 p-5 shadow-xl">
                <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/team/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-xl font-semibold">{member.name}</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="/staffphoto"
              className="inline-flex items-center rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-100"
            >
              Meet the entire faculty
            </a>
          </div>
        </div>
      </div>

      {/* Welcome */}
      <div ref={welcomeRef} className="py-16 bg-white reveal" data-delay="0ms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              Welcome to Munnar Ram Inter College
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At <span className="font-semibold text-blue-900">Munnar Ram Inter College</span>, we are committed to providing quality
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
