import { Users, MapPin, FlaskConical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const staffProfiles = [
  { name: 'Dr. Priya Sharma', role: 'Principal', focus: 'Academic leadership & community partnerships.', image: '/team/priya.jpg' },
  { name: 'Mr. Raghav Verma', role: 'Head of Innovation', focus: 'STEAM labs and olympiad mentoring.', image: '/team/raghav.jpg' },
  { name: 'Ms. Ananya Gupta', role: 'Curriculum Director', focus: 'Global literacy & creative studios.', image: '/team/ananya.jpg' },
  { name: 'Mr. Arjun Sethi', role: 'Student Success Coach', focus: 'Career guidance and wellbeing.', image: '/team/arjun.jpg' },
];

export default function About({ topImage }: { topImage?: string }) {
  const sections = [
    {
      icon: Users,
      title: 'Our Staff',
      content:
        'Our dedicated team of highly qualified teachers and administrative staff work tirelessly to provide the best educational experience. With years of experience and a passion for teaching, our faculty members are committed to student success.',
      details: staffProfiles,
    },
    {
      icon: MapPin,
      title: 'Location',
      content:
        'Munnar Ram Inter College is conveniently located in a peaceful environment, easily accessible by road. Our campus is designed to provide a conducive learning atmosphere with ample space for academic and extracurricular activities.',
    },
    {
      icon: FlaskConical,
      title: 'Lab Information',
      content:
        'We take pride in our state-of-the-art laboratory facilities including well-equipped Physics, Chemistry, Biology, and Computer labs. Students have hands-on access to modern equipment and resources for practical learning and experimentation.',
    },
  ];

  const [activeSection, setActiveSection] = useState<string | null>(null);
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
        <div className="w-full h-[500px] relative">
          <img
            src={topImage}
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
              const expandable = Boolean((section as any).details);
              const isActive = activeSection === section.title;
              const toggleSection = () => {
                if (!expandable) return;
                setActiveSection((prev) => (prev === section.title ? null : section.title));
              };

              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 border border-blue-100 about-card reveal"
                  style={{ transitionDelay: 'var(--delay)' }}
                  role={expandable ? 'button' : undefined}
                  tabIndex={expandable ? 0 : undefined}
                  aria-expanded={expandable ? isActive : undefined}
                  onClick={toggleSection}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSection()}
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

                  {expandable && (
                    <div className={`mt-6 overflow-hidden transition-all duration-300 ${isActive ? 'max-h-[900px]' : 'max-h-0'}`}>
                      <div className="grid gap-4 pt-4 border-t border-blue-100 sm:grid-cols-2">
                        {(section as any).details.map((profile: typeof staffProfiles[number]) => (
                          <article key={profile.name} className="flex gap-4 rounded-xl bg-blue-50/70 p-4">
                            <img
                              src={profile.image}
                              alt={profile.name}
                              className="h-16 w-16 flex-shrink-0 rounded-full object-cover ring-2 ring-blue-200"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = '/team/placeholder.jpg';
                              }}
                            />
                            <div>
                              <p className="text-base font-semibold text-blue-900">{profile.name}</p>
                              <p className="text-sm text-gray-600">{profile.role}</p>
                              <p className="text-sm text-gray-500">{profile.focus}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                      <a
                        href="/staffphoto"
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                      >
                        Meet the entire faculty
                      </a>
                    </div>
                  )}
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
                  initiative, and social responsibility.
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
