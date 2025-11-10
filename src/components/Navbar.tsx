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

  return (
    <nav className="bg-opacity-0 shadow-md fixed w-full top-0 z-50">
      {/* progress bar */}
      <div className="progress-wrap">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact header: brand + (mobile toggle) on left, desktop nav on right */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: brand + mobile toggle (toggle only visible on small screens) */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              {/* optional small logo */}
              <img
                src="/front.jpg"
                alt="logo"
                className="w-8 h-8 object-cover rounded-sm"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 leading-tight">
                Munner Ram
                <span className="hidden sm:inline"> Inter College</span>
              </span>
            </Link>

            {/* mobile toggle placed directly beside brand for tight layout */}
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

          {/* Right: desktop nav links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/courses', label: 'Courses' },
                { path: '/services', label: 'Services' },
                { path: '/admission', label: 'Admission' },
                { path: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-900'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer overlay + panel */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* backdrop */}
          <button
            className="absolute inset-0 bg-black/40"
            aria-hidden
            onClick={() => setIsMenuOpen(false)}
          />
          {/* side panel */}
          <div className="relative w-64 max-w-xs bg-white h-full shadow-lg p-6 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold text-blue-900">Menu</div>
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-2 rounded-md">
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/courses', label: 'Courses' },
                { path: '/services', label: 'Services' },
                { path: '/admission', label: 'Admission' },
                { path: '/contact', label: 'Contact' },
              ].map((item, i) => (
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
          </div>

          {/* flexible area to close when tapped */}
          <div className="flex-1" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
}
