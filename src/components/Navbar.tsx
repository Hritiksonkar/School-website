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

					<div className="relative flex items-center gap-3">
						<button
							type="button"
							onClick={() => setIsMenuOpen((s) => !s)}
							aria-label="Toggle menu"
							aria-expanded={isMenuOpen}
							className="md:hidden inline-flex items-center justify-center rounded-full border border-blue-900/30 bg-white/90 p-2 text-blue-900 shadow-sm"
						>
							{isMenuOpen ? <X size={22} /> : <Menu size={22} />}
						</button>

						{isMenuOpen && (
							<div className="absolute top-full right-0 mt-2 w-48 origin-top-right rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5 focus:outline-none z-50 animate-dropdown">
								<div className="flex flex-col gap-1">
									{navLinks.map((item) => (
										<Link
											key={item.path}
											to={item.path}
											onClick={() => setIsMenuOpen(false)}
											className={`block px-4 py-2 text-sm rounded-lg transition-colors ${location.pathname === item.path
												? 'bg-blue-50 text-blue-900 font-medium'
												: 'text-gray-700 hover:bg-gray-50 hover:text-blue-900'
												}`}
										>
											{item.label}
										</Link>
									))}
									<hr className="my-1 border-gray-100" />
									<a
										href="/admission"
										className="block px-4 py-2 text-sm font-semibold text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
									>
										Apply Now
									</a>
								</div>
							</div>
						)}

						<div className="hidden md:flex items-center gap-4">
							<nav className="flex items-center gap-3">
								{navLinks.map((item, i) => (
									<Link
										key={item.path}
										to={item.path}
										ref={i === 0 ? firstLinkRef : null}
										className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${location.pathname === item.path ? 'bg-blue-900 text-white shadow' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-900'
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
		</nav>
	);
}
