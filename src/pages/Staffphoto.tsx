const staffGallery = [
    { name: 'Dr. Priya Sharma', role: 'Principal', tenure: 'Since 2010', image: '/team/priya.jpg' },
    { name: 'Mr. Raghav Verma', role: 'Head of Innovation', tenure: 'Since 2012', image: '/team/raghav.jpg' },
    { name: 'Ms. Ananya Gupta', role: 'Curriculum Director', tenure: 'Since 2015', image: '/team/ananya.jpg' },
    { name: 'Mr. Arjun Sethi', role: 'Global Programs Coordinator', tenure: 'Since 2016', image: '/team/arjun.jpg' },
    { name: 'Ms. Kavya Menon', role: 'Wellbeing Coach', tenure: 'Since 2018', image: '/team/kavya.jpg' },
    { name: 'Mr. Dev Malhotra', role: 'STEM Mentor', tenure: 'Since 2019', image: '/team/dev.jpg' },
];

export default function Staffphoto() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <section className="px-6 py-20 text-center bg-gradient-to-b from-emerald-500 to-slate-900">
                <div className="mx-auto max-w-4xl space-y-4">
                    <p className="text-sm uppercase tracking-[0.5em] text-emerald-200">Faculty Showcase</p>
                    <h1 className="text-4xl md:text-5xl font-semibold">Faces behind the excellence</h1>
                    <p className="text-lg text-emerald-100/80">Meet the mentor-innovators guiding every learner at Munnar Ram Inter College.</p>
                    <a href="/about" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-emerald-100 transition">
                        Back to About
                    </a>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16 space-y-10">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {staffGallery.map((member) => (
                        <article key={member.name} className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-600/20 to-slate-900/80 p-6 shadow-xl">
                            <div className="relative h-64 overflow-hidden rounded-2xl bg-slate-900">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = '/team/placeholder.jpg';
                                    }}
                                />
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className="text-xl font-semibold text-white">{member.name}</p>
                                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">{member.role}</p>
                                <p className="text-sm text-slate-300">Tenure: {member.tenure}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
