import { DOCKER_CONCEPTS } from "../constants/data";

export const DockerConcepts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {DOCKER_CONCEPTS.map((concept, index) => (
        <div
          key={index}
          className="bg-gray-100 p-8 rounded-2xl border-l-4 border-[#667eea] shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">{concept.icon}</span>
            <h3 className="text-2xl font-bold text-gray-800">
              {concept.title}
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4 flex-1">
            {concept.description}
          </p>
          {concept.example && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg mb-4">
              <code className="text-green-400 text-sm font-mono whitespace-pre">
                {concept.example}
              </code>
            </div>
          )}
          {concept.docsLink && (
            <a
              href={concept.docsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#667eea] text-white rounded-lg hover:bg-[#764ba2] transition-colors duration-200 font-semibold text-sm mt-auto"
            >
              <span>📚</span>
              <span>Learn More</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};
