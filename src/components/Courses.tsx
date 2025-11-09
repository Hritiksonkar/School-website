import { BookOpen, GraduationCap } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Courses() {
  const courses = [
    {
      level: 'High School (Class 10)',
      icon: BookOpen,
      streams: [
        {
          name: 'Science Stream',
          subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Art']
        },
      ],
    },
    {
      level: 'Intermediate (Class 12)',
      icon: GraduationCap,
      streams: [
        {
          name: 'Science Stream',
          subjects: [
            'Physics',
            'Chemistry',
            'Mathematics/Biology',
            'English',
            'Physical Education',
          ],
        },
      ],
    },
  ];

  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('.course-card'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    items.forEach((el, i) => {
      el.style.setProperty('--delay', `${i * 90}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100 pt-20" ref={rootRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive courses for High School and Intermediate
            levels with multiple streams to suit different interests and career
            paths.
          </p>
        </div>

        <div className="space-y-12">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 course-card reveal" style={{ transitionDelay: 'var(--delay)' }}>
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-blue-100 p-4 rounded-full mr-4">
                    <Icon className="text-blue-900" size={40} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {course.level}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {course.streams.map((stream, streamIndex) => (
                    <div
                      key={streamIndex}
                      className="bg-blue-50 p-6 rounded-lg shadow-md hover:bg-blue-100 transition"
                    >
                      <h4 className="text-xl font-bold text-blue-900 mb-4">
                        {stream.name}
                      </h4>
                      <ul className="space-y-2">
                        {stream.subjects.map((subject, subjectIndex) => (
                          <li
                            key={subjectIndex}
                            className="flex items-center text-gray-700"
                          >
                            <span className="w-2 h-2 bg-blue-900 rounded-full mr-3"></span>
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-900 text-white p-8 rounded-lg text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4">
            Special Features of Our Curriculum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <p className="font-semibold mb-2">Interactive Learning</p>
              <p className="text-blue-100">
                Modern teaching methods with practical applications
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Experienced Faculty</p>
              <p className="text-blue-100">
                Highly qualified teachers with years of experience
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Regular Assessments</p>
              <p className="text-blue-100">
                Continuous evaluation to track student progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
