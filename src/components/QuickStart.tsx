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
    <section className="py-24 px-8 bg-white max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
        Workshop Materials
      </h2>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-base font-semibold rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-xl"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-[fadeIn_0.5s_ease]">
        {activeTab === "tasks" && <WorkshopTasks />}
        {activeTab === "concepts" && <DockerConcepts />}
        {activeTab === "commands-reference" && <DockerCommandsReference />}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "commands" && <CommandsTab />}
      </div>
    </section>
  );
};
