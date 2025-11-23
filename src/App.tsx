import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import ServicesPage from './pages/ServicesPage';
import AdmissionPage from './pages/AdmissionPage';
import ContactPage from './pages/ContactPage';
import Galleryphoto from './pages/Galleryphoto';
import Staffphoto from './pages/Staffphoto';

function RouteWatcher({ onRouteChange }: { onRouteChange: () => void }) {
  const loc = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    onRouteChange();
  }, [loc]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<number | null>(null);
  const initialTimer = useRef<number | null>(null);
  const routeTimer = useRef<number | null>(null);

  // finish loader helper
  const finishLoading = () => {
    setProgress(100);
    // small delay so progress bar can reach end visually
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 300);
  };

  // initial page load: hide loader when window 'load' fires or fallback quickly
  useEffect(() => {
    if (document.readyState === 'complete') {
      finishLoading();
      return;
    }
    const onLoad = () => finishLoading();
    window.addEventListener('load', onLoad, { once: true });
    // fallback to ensure loader never blocks
    initialTimer.current = window.setTimeout(() => finishLoading(), 3500);
    return () => {
      window.removeEventListener('load', onLoad);
      if (initialTimer.current) window.clearTimeout(initialTimer.current);
    };
  }, []);

  // animate progress while loading
  useEffect(() => {
    if (!isLoading) {
      if (progressTimer.current) {
        window.clearInterval(progressTimer.current);
        progressTimer.current = null;
      }
      return;
    }
    setProgress(6);
    progressTimer.current = window.setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 6 + 2;
        return Math.min(90, Math.round(next));
      });
    }, 300);
    return () => {
      if (progressTimer.current) {
        window.clearInterval(progressTimer.current);
        progressTimer.current = null;
      }
    };
  }, [isLoading]);

  // called on client-side navigation
  const handleRouteChange = () => {
    // show loader briefly
    setIsLoading(true);
    setProgress(8);
    if (routeTimer.current) window.clearTimeout(routeTimer.current);
    routeTimer.current = window.setTimeout(() => {
      // ensure we always hide after a short time
      finishLoading();
    }, 700);
  };

  // allow click to dismiss loader if it ever hangs
  const dismissLoader = () => {
    setIsLoading(false);
    setProgress(0);
    if (progressTimer.current) {
      window.clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
    if (initialTimer.current) {
      window.clearTimeout(initialTimer.current);
      initialTimer.current = null;
    }
    if (routeTimer.current) {
      window.clearTimeout(routeTimer.current);
      routeTimer.current = null;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-white overflow-x-hidden w-full" aria-busy={isLoading}>
        <Navbar />

        {/* top progress bar */}
        <div className="progress-wrap pointer-events-none">
          <div
            className="progress"
            style={{
              width: `${progress}%`,
              transition: isLoading ? 'width 220ms linear' : 'width 380ms ease-out',
            }}
            aria-hidden
          />
        </div>

        {/* full-screen loader overlay (click to dismiss if needed) */}
        {isLoading && (
          <div
            className="site-loader fixed inset-0 z-[60] flex items-center justify-center bg-white/95"
            role="status"
            aria-live="polite"
            aria-label="Loading"
            onClick={dismissLoader}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="loader-logo w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-700 to-blue-900 shadow-xl">
                <svg viewBox="0 0 48 48" className="w-16 h-16 text-white animate-logo-rotate" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="24" cy="24" r="10" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
                  <path d="M24 14v10l6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="text-center">
                <div className="text-xl font-semibold text-gray-800">Munner Ram Inter College</div>
                <div className="text-sm text-gray-500 mt-1">Preparing students for a brighter future — click to continue</div>
              </div>
            </div>
          </div>
        )}

        <main>
          {/* ensure RouteWatcher is inside Router */}
          <RouteWatcher onRouteChange={handleRouteChange} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/galleryphoto" element={<Galleryphoto />} />
            <Route path="/staffphoto" element={<Staffphoto />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
