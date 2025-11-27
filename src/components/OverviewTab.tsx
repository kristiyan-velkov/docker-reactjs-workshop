export const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#667eea]">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          🎯 Docker Files
        </h3>
        <ul className="space-y-4">
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>Dockerfile</strong> - Multi-stage production build with Nginx
            (port 8080)
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>Dockerfile.dev</strong> - Development environment with Vite
            hot reload (port 5173)
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>Dockerfile.serve</strong> - Alternative production build using
            Node.js serve (port 8080)
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>compose.yaml</strong> - Multi-service orchestration (prod, dev,
            test, lint)
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong>nginx.conf</strong> - Nginx configuration for production
            serving
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#667eea]">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🔧 Tech Stack</h3>
        <ul className="space-y-4">
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            React 19 with TypeScript
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Vite for blazing fast builds (dev port 5173)
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Node.js 24.11.1 Alpine
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Nginx Unprivileged (prod port 8080)
          </li>
          <li className="text-gray-700 leading-relaxed">
            ESLint & Vitest for quality
          </li>
        </ul>
      </div>
    </div>
  );
};
