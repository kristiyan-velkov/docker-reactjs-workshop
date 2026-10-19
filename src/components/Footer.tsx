import { SOCIAL_LINKS } from "../constants/data";

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-semibold text-zinc-900 tracking-tight">
            React.js Advanced Workshop
          </p>
          <p className="text-sm text-zinc-500 mt-1">
            Docker & React.js · MIT License
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-zinc-600">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-700 transition-colors"
          >
            Kristiyan Velkov
          </a>
          <a
            href={SOCIAL_LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-700 transition-colors"
          >
            @krisvelkov
          </a>
          <a
            href={SOCIAL_LINKS.newsletter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-700 transition-colors"
          >
            Newsletter
          </a>
          <a
            href={SOCIAL_LINKS.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-700 transition-colors"
          >
            Medium
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-700 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
