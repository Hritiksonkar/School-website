import { Users, MapPin, FlaskConical } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function About({ topImage }: { topImage?: string }) {
  const sections = [
    {
      icon: Users,
      title: 'Our Staff',
      content:
        'Our dedicated team of highly qualified teachers and administrative staff work tirelessly to provide the best educational experience. With years of experience and a passion for teaching, our faculty members are committed to student success.',
    },
    {
      icon: MapPin,
      title: 'Location',
      content:
        'Munner Ram Inter College is conveniently located in a peaceful environment, easily accessible by road. Our campus is designed to provide a conducive learning atmosphere with ample space for academic and extracurricular activities.',
    },
    {
      icon: FlaskConical,
      title: 'Lab Information',
      content:
        'We take pride in our state-of-the-art laboratory facilities including well-equipped Physics, Chemistry, Biology, and Computer labs. Students have hands-on access to modern equipment and resources for practical learning and experimentation.',
    },
  ];

  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.about-card'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el, i) => {
      el.style.setProperty('--delay', `${i * 90}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* top banner if provided */}
      {topImage && (
        <div className="w-full h-[500px] md:h-[500px] relative">
          <img
            src={"puja3.jpg"}
            alt="About banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl text-white font-bold tracking-tight">
              About Us
            </h1>
          </div>
        </div>
      )}

      <section
        className="py-20 bg-gradient-to-br from-blue-50 to-blue-100 pt-20"
        ref={rootRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover more about our institution, our dedicated staff, our
              facilities, and what makes us unique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 border border-blue-100 about-card reveal"
                  style={{ transitionDelay: 'var(--delay)' }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-900 transition-colors duration-300">
                      <Icon className="text-blue-900 group-hover:text-white transition-colors duration-300" size={40} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-900 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {section.content}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Our Mission & Vision
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  Mission
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  To provide quality education that empowers students with
                  knowledge, skills, and values necessary for their personal and
                  professional growth, while fostering a culture of excellence,
                  innovation, and social responsibility.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  Vision
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  To be a leading educational institution recognized for academic
                  excellence, holistic development, and creating responsible
                  citizens who contribute positively to society and lead with
                  integrity and compassion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
