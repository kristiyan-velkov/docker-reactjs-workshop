import { FEATURES } from "../constants/data";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  return (
    <section
      id="objectives"
      className="scroll-mt-24 py-24 px-6 md:px-8 bg-zinc-50 border-y border-zinc-200/80"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="section-eyebrow text-emerald-600">Learning outcomes</p>
            <h2 className="section-title text-zinc-900 mb-4">
              Workshop objectives
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Practical skills from Dockerfile basics to pushing images — aligned
              with how teams ship React apps today.
            </p>
          </div>
          <p className="text-sm font-mono text-zinc-500 lg:text-right">
            React 19 · TypeScript · Docker Compose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
