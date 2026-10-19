import reactLogo from "../assets/react.svg";
import { SOCIAL_LINKS } from "../constants/data";

const HeroPreview = () => (
  <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
    <div
      className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent blur-2xl"
      aria-hidden
    />
    <div className="relative rounded-2xl border border-white/10 bg-zinc-900/90 shadow-2xl shadow-black/40 overflow-hidden backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-950/80">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        <span className="ml-2 text-[11px] font-mono text-zinc-500">
          workshop-app · containerize
        </span>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={reactLogo} alt="" className="h-10 w-10" aria-hidden />
            <span className="text-2xl" aria-hidden>
              🐳
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400/90 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
            Task 4 / 10
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Workshop progress</span>
            <span className="font-mono text-zinc-400">40%</span>
          </div>
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-3 font-mono text-[11px] leading-relaxed text-zinc-400">
          <p className="text-emerald-400/90">$ docker build -t my-react-app .</p>
          <p className="text-zinc-500 mt-1">=&gt; exporting layers</p>
          <p className="text-cyan-400/80">=&gt; naming to docker.io/library/my-react-app</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
            <p className="text-lg font-semibold text-white">10</p>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
              Tasks
            </p>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
            <p className="text-lg font-semibold text-white">Multi</p>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
              Stage builds
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-zinc-950 pt-16">
      <div className="hero-spotlight absolute inset-0 pointer-events-none" aria-hidden />
      <div className="hero-grid-dark absolute inset-0 opacity-[0.35] pointer-events-none" aria-hidden />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Hands-on workshop
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] tracking-tight text-balance mb-6">
              Containerize React.js{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-200">
                from zero to production
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 text-pretty">
              Step-by-step tasks, timers, and Docker references — built for live
              workshops and self-paced learning. No location lock-in, reusable
              everywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#materials"
                className="btn-hero-primary"
              >
                Start workshop
              </a>
              <a
                href={SOCIAL_LINKS.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
              >
                Docker React guide
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              {[
                { value: "10+", label: "Interactive tasks" },
                { value: "Vite", label: "React 19 stack" },
                { value: "Hub", label: "Deploy ready" },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-white/10 pl-4">
                  <dt className="text-lg font-semibold text-white">{stat.value}</dt>
                  <dd className="text-xs text-zinc-500 mt-0.5">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroPreview />
        </div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden
      />
    </section>
  );
};
