import type { Feature } from "../types";

interface FeatureCardProps {
  feature: Feature;
  index: number;
  featured?: boolean;
}

export const FeatureCard = ({ feature, index, featured = false }: FeatureCardProps) => {
  return (
    <div
      className={`group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5 ${
        featured
          ? "md:col-span-2 lg:col-span-2 bg-zinc-900 text-white ring-1 ring-zinc-800 shadow-xl shadow-zinc-900/10"
          : "bg-white ring-1 ring-zinc-200/80 shadow-sm hover:shadow-md hover:ring-emerald-500/25"
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {featured && (
        <div
          className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/10"
          aria-hidden
        />
      )}

      <div className="relative">
        <span
          className={`inline-flex text-2xl mb-5 h-12 w-12 items-center justify-center rounded-xl ${
            featured
              ? "bg-white/10 ring-1 ring-white/10"
              : "bg-zinc-100 ring-1 ring-zinc-200/80 group-hover:bg-emerald-50"
          }`}
        >
          {feature.icon}
        </span>
        <h3
          className={`text-lg font-semibold tracking-tight mb-2 ${
            featured ? "text-white" : "text-zinc-900"
          }`}
        >
          {feature.title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            featured ? "text-zinc-400 max-w-xl" : "text-zinc-600"
          }`}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
};
