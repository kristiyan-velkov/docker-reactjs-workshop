import type { DockerCommand } from "../types";

interface CommandCardProps {
  command: DockerCommand;
}

export const CommandCard = ({ command }: CommandCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-surface-200 border-l-4 border-l-brand-600 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{command.title}</h3>
      <p className="text-gray-600 mb-4">{command.description}</p>
      <div className="bg-gray-800 p-6 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <code className="text-[#4facfe] font-mono text-lg flex-1 break-all">
          {command.command}
        </code>
        <button
          onClick={handleCopy}
          className="btn-copy"
          title="Copy to clipboard"
          aria-label="Copy command to clipboard"
        >
          📋
        </button>
      </div>
    </div>
  );
};

