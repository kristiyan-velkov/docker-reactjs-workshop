import { DOCKER_COMMANDS_REFERENCE } from "../constants/data";

export const DockerCommandsReference = () => {
  return (
    <div className="space-y-8">
      {DOCKER_COMMANDS_REFERENCE.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#667eea] shadow-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{category.icon}</span>
            <h3 className="text-2xl font-bold text-gray-800">{category.category}</h3>
          </div>
          <div className="space-y-4">
            {category.commands.map((cmd, cmdIndex) => (
              <div
                key={cmdIndex}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#667eea] transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {cmd.title}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">{cmd.description}</p>
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">
                    {cmd.command}
                  </code>
                </div>
                {cmd.examples && cmd.examples.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Examples:</p>
                    {cmd.examples.map((example, exIndex) => (
                      <div key={exIndex} className="bg-gray-800 p-3 rounded">
                        <code className="text-green-400 text-xs font-mono">
                          {example}
                        </code>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

