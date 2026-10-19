import { SOCIAL_LINKS } from "../constants/data";

const NAV = [{ href: "#materials", label: "Materials" }];

export const SiteHeader = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-6">
        <a
          href="/"
          className="flex items-center gap-2.5 text-white font-semibold tracking-tight shrink-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-xs font-bold text-zinc-950">
            R
          </span>
          <span className="hidden sm:inline">React × Docker</span>
        </a>

        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400"
          aria-label="Page sections"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={SOCIAL_LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-header-ghost hidden sm:inline-flex"
          >
            @krisvelkov
          </a>
          <a
            href={SOCIAL_LINKS.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-header-ghost hidden md:inline-flex"
          >
            Docs
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-header-cta"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
};
