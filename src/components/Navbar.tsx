import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
		<nav className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur shadow-lg">
			{/* progress bar */}
			<div className="progress-wrap">
				<div className="progress" style={{ width: `${progress}%` }} />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 md:h-20">
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

					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => setIsMenuOpen((s) => !s)}
							aria-label="Toggle menu"
							aria-expanded={isMenuOpen}
							className="md:hidden inline-flex items-center justify-center rounded-full border border-blue-900/30 bg-white/90 p-2 text-blue-900 shadow-sm"
						>
							{isMenuOpen ? <X size={22} /> : <Menu size={22} />}
						</button>

						<div className="hidden md:flex items-center gap-4">
							<nav className="flex items-center gap-3">
								{navLinks.map((item, i) => (
									<Link
										key={item.path}
										to={item.path}
										ref={i === 0 ? firstLinkRef : null}
										className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
											location.pathname === item.path ? 'bg-blue-900 text-white shadow' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-900'
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
			</div>

			{isMenuOpen && (
				<div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 text-white">
					<div className="flex items-center justify-between px-6 pt-6">
						<span className="text-lg font-semibold tracking-wide">Navigation</span>
						<button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="rounded-full border border-white/40 p-2">
							<X size={20} />
						</button>
					</div>
					<nav className="flex-1 flex flex-col items-center justify-center gap-3 text-2xl font-semibold tracking-wide">
						{navLinks.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								onClick={() => setIsMenuOpen(false)}
								className={`px-6 py-2 rounded-full ${
									location.pathname === item.path ? 'bg-white text-slate-900' : 'text-white hover:bg-white/10'
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>
					<a
						href="/admission"
						className="mx-auto mb-10 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-100"
					>
						{/* Start Admission */}
					</a>
				</div>
			)}
		</nav>
	);
}
