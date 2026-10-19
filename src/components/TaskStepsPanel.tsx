export interface TaskStepItem {
  number: number;
  title: string;
  description: string;
  tips?: string[];
  code?: string;
}

interface TaskStepsPanelProps {
  steps: TaskStepItem[];
}

export const TaskStepsPanel = ({ steps }: TaskStepsPanelProps) => {
  return (
    <div className="mt-6 pt-6 border-t border-zinc-200/80">
      <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-5">
        Step-by-step ({steps.length})
      </p>

      <ol className="relative space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.number}
              className={`relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-0 ${
                isLast ? "pb-0" : "pb-8"
              }`}
            >
              {!isLast && (
                <span
                  className="absolute left-4 top-9 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-400/60 via-zinc-200 to-zinc-200"
                  aria-hidden
                />
              )}

              <div className="relative z-[1] flex flex-col items-center pt-0.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white shadow-[0_0_0_4px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.08)]">
                  {step.number}
                </span>
              </div>

              <article className="min-w-0 rounded-2xl bg-zinc-50/80 ring-1 ring-inset ring-zinc-200/90 overflow-hidden">
                <div className="px-4 py-4 sm:px-5 sm:py-5">
                  <h4 className="text-base font-semibold text-zinc-900 tracking-tight mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {step.code && (
                  <div className="border-t border-zinc-200/80">
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/95 border-b border-white/5">
                      <span className="h-2 w-2 rounded-full bg-zinc-600" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        Command
                      </span>
                    </div>
                    <pre className="p-4 sm:p-5 overflow-x-auto text-[13px] leading-relaxed font-mono text-zinc-100 bg-zinc-950 m-0">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                )}

                {step.tips && step.tips.length > 0 && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <div className="rounded-xl bg-emerald-500/[0.06] ring-1 ring-inset ring-emerald-500/15 px-4 py-3">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800/90 mb-2">
                        Tips
                      </p>
                      <ul className="space-y-2">
                        {step.tips.map((tip) => (
                          <li
                            key={tip}
                            className="flex gap-2 text-sm text-zinc-700 leading-snug"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500"
                              aria-hidden
                            />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
