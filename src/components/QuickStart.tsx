import { useState } from "react";
import { CommandsTab } from "./CommandsTab";
import { DockerCommandsReference } from "./DockerCommandsReference";
import { DockerConcepts } from "./DockerConcepts";
import { OverviewTab } from "./OverviewTab";
import { WorkshopTasks } from "./WorkshopTasks";
import type { TabType } from "../types";

export const QuickStart = () => {
  const [activeTab, setActiveTab] = useState<TabType>("tasks");

  const tabs = [
    { id: "tasks" as TabType, label: "Workshop Tasks" },
    { id: "concepts" as TabType, label: "Docker Concepts" },
    { id: "commands-reference" as TabType, label: "Commands Reference" },
    { id: "overview" as TabType, label: "Project Overview" },
    { id: "commands" as TabType, label: "Quick Commands" },
  ];

  return (
    <section
      id="materials"
      className="scroll-mt-24 py-24 px-6 md:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="section-eyebrow text-emerald-600">Interactive guide</p>
          <h2 className="section-title text-zinc-900 mb-4">Workshop materials</h2>
          <p className="text-lg text-zinc-600">
            Tasks, concepts, and command references in one workspace — optimized
            for presenters and attendees.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[16rem_minmax(0,1fr)]">
          <div
            className="hidden lg:flex flex-col gap-0.5 sticky top-24 self-start"
            role="tablist"
            aria-label="Workshop materials"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === tab.id ? "tab-sidebar-active" : "tab-sidebar-idle"
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-w-0">
            <div
              className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none"
              role="tablist"
              aria-label="Workshop materials"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 ${
                    activeTab === tab.id ? "tab-pill-active" : "tab-pill-idle"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl ring-1 ring-zinc-200 bg-zinc-50/80 p-4 md:p-8 shadow-sm">
              {activeTab === "tasks" && <WorkshopTasks />}
              {activeTab === "concepts" && <DockerConcepts />}
              {activeTab === "commands-reference" && <DockerCommandsReference />}
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "commands" && <CommandsTab />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
