const galleryShowcase = [
    { title: 'Campus Life', description: 'Assemblies, clubs, and vibrant corridors.', image: '/gallery/campus-1.jpg' },
    { title: 'Innovation Labs', description: 'Design thinking, robotics, and STEAM explorations.', image: '/gallery/lab-1.jpg' },
    { title: 'Sports Arena', description: 'Inter-school tournaments and training sessions.', image: '/gallery/sports-1.jpg' },
    { title: 'Cultural Fest', description: 'Performances, art installations, and showcases.', image: '/gallery/culture-1.jpg' },
    { title: 'Community Outreach', description: 'Service learning and sustainability drives.', image: '/gallery/community-1.jpg' },
    { title: 'Classroom Moments', description: 'Collaborative projects and mentorship circles.', image: '/gallery/class-1.jpg' },
];

export default function Galleryphoto() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <section className="px-6 py-20 text-center bg-gradient-to-b from-blue-600 to-slate-900">
                <div className="mx-auto max-w-4xl space-y-4">
                    <p className="text-sm uppercase tracking-[0.5em] text-blue-200">Campus Gallery</p>
                    <h1 className="text-4xl md:text-5xl font-semibold">Moments that define us</h1>
                    <p className="text-lg text-blue-100/80">
                        A glimpse into the energy, creativity, and community spirit at Munnar Ram Inter College.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-blue-100 transition">
                        Plan a visit
                    </a>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {galleryShowcase.map((item) => (
                        <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur shadow-2xl">
                            <div className="relative h-60 overflow-hidden rounded-3xl rounded-b-none">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = '/gallery/placeholder.jpg';
                                    }}
                                />
                            </div>
                            <div className="p-6 space-y-2">
                                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                                <p className="text-sm text-slate-300">{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
