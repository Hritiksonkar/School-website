import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    // close menu on navigation
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // close on ESC
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const scrolled = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/courses', label: 'Courses' },
    { path: '/services', label: 'Services' },
    { path: '/galleryphoto', label: 'Gallery' },
    { path: '/staffphoto', label: 'Faculty' },
    { path: '/admission', label: 'Admission' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-transparent backdrop-blur shadow-lg">
      {/* progress bar */}
      <div className="progress-wrap">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* brand + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/front.jpg"
                alt="logo"
                className="w-9 h-9 object-cover rounded-md shadow-sm"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <span className="text-xl md:text-2xl font-bold text-blue-900 leading-tight">
                Munnar Ram <span className="hidden sm:inline">Inter College</span>
              </span>
            </Link>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen((s) => !s)}
                aria-label="Toggle menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-3">
              {navLinks.map((item, i) => (
                <Link
                  key={item.path}
                  to={item.path}
                  ref={i === 0 ? firstLinkRef : null}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${location.pathname === item.path
                    ? 'bg-blue-900 text-white shadow'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-900'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href="/admission"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-700 to-blue-900 px-5 py-2 text-sm font-semibold text-white shadow hover:from-blue-900 hover:to-blue-700"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <button className="absolute inset-0 bg-black/40" aria-hidden onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-64 max-w-xs bg-white h-full shadow-2xl p-6 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold text-blue-900">Menu</div>
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-2 rounded-md">
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.path ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-blue-50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href="/admission"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white"
            >
              Start Admission
            </a>
          </div>
          <div className="flex-1" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
}
