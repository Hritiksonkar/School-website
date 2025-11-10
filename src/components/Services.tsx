import { Bus, Leaf, Camera, Laptop } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Services({ topImage }: { topImage?: string }) {
  const services = [
    {
      icon: Bus,
      title: 'Bus Service',
      description:
        'Safe and reliable transportation facility covering multiple routes with trained drivers and attendants for student safety.',
    },
    {
      icon: Leaf,
      title: 'Clean Environment',
      description:
        'Well-maintained, green campus with regular cleaning and waste management. Dedicated to providing a healthy learning atmosphere.',
    },
    {
      icon: Camera,
      title: 'CCTV Surveillance',
      description:
        '24/7 CCTV monitoring throughout the campus ensuring complete safety and security of all students and staff members.',
    },
    {
      icon: Laptop,
      title: 'Computer Lab',
      description:
        'Modern computer lab with latest hardware and software. Internet access and digital learning resources for students.',
    },
  ];

  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.service-card'));
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
      { threshold: 0.2 }
    );
    cards.forEach((card, i) => {
      card.style.setProperty('--delay', `${i * 80}ms`);
      io.observe(card);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* top banner if provided */}
      {topImage && (
        <div className="w-full h-[500px] md:h-[500px] relative">
          <img
            src={"servicers.jpg"}
            alt="Services banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl text-white font-bold tracking-tight">
              Our Services & Facilities
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
              Our Services & Facilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide world-class facilities and services to ensure a safe,
              comfortable, and enriching learning environment for all students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 border border-blue-100 service-card reveal"
                  style={{ transitionDelay: `var(--delay)` }}
                  tabIndex={0}
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-900 transition-colors duration-300">
                      <Icon className="text-blue-900 group-hover:text-white transition-colors duration-300" size={36} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Additional Amenities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Medical Facilities
                  </h4>
                  <p className="text-gray-600">
                    First aid and basic medical assistance available on campus
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Cafeteria
                  </h4>
                  <p className="text-gray-600">
                    Hygienic cafeteria serving nutritious meals and snacks
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Counseling Services
                  </h4>
                  <p className="text-gray-600">
                    Professional guidance for academic and personal development
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Smart Classrooms
                  </h4>
                  <p className="text-gray-600">
                    Digital boards and projectors for interactive learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
