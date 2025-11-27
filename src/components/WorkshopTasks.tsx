import { useState, useEffect, useRef } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  steps: TaskStep[];
  icon: string;
}

interface TaskStep {
  number: number;
  title: string;
  description: string;
  tips?: string[];
  code?: string;
}

interface TimerState {
  isRunning: boolean;
  elapsedTime: number;
  completed?: boolean;
  completionTime?: number;
}

const WORKSHOP_TASKS: Task[] = [
  {
    id: 1,
    title: "Get the Sample Application",
    description:
      "Clone the sample React.js project or create a new one from scratch using Vite",
    estimatedTime: "5 minutes",
    icon: "📥",
    steps: [
      {
        number: 1,
        title: "Clone or create the project",
        description:
          "Either clone the sample repository or create a new React.js application using Vite. If creating new, use the React TypeScript template.",
        tips: [
          "Clone: git clone https://github.com/kristiyan-velkov/docker-reactjs-workshop",
          "Move into the project directory: cd docker-reactjs-sample",
        ],
      },
      {
        number: 2,
        title: "Install dependencies",
        description:
          "Install all project dependencies using npm install. This will download all required packages listed in package.json.",
      },
      {
        number: 3,
        title: "Start the development server",
        description:
          "Run npm run dev to start the Vite development server. Open http://localhost:5173 in your browser to verify the app is running correctly.",
        tips: [
          "Vite uses port 5173 by default for development",
          "Verify you see the React application in your browser",
          "This confirms your setup is correct before containerizing",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Build and Test the Application Locally",
    description:
      "Verify that your application can be built successfully before containerizing. Test the production build locally first.",
    estimatedTime: "5 minutes",
    icon: "🔨",
    steps: [
      {
        number: 1,
        title: "Build the project",
        description:
          "Run npm run build to create a production build. This runs Vite's production bundler which optimizes your code (minification, tree-shaking, code splitting, asset hashing). The output will be in the dist/ folder.",
        tips: [
          "Watch for any build errors - fix them before proceeding",
          "The dist/ folder contains your production-ready files",
          "These are the exact files you'll deploy",
        ],
      },
      {
        number: 2,
        title: "Run the preview server",
        description:
          "Run npm run preview to test your production build locally. This launches a lightweight HTTP server serving files from the dist/ folder. Visit http://localhost:4173 to verify everything works.",
        tips: [
          "Vite preview uses port 4173 (different from dev port 5173)",
          "This simulates how your app will behave in production",
          "If it works here, it will work in Docker",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Generate Docker Files with docker init",
    description:
      "Use Docker's built-in interactive tool to automatically scaffold Docker configuration files. This gives you a starting point to build upon.",
    estimatedTime: "5 minutes",
    icon: "🚀",
    steps: [
      {
        number: 1,
        title: "Run docker init",
        description:
          "Navigate to your project root directory and run docker init. This interactive command will guide you through creating Docker files.",
        tips: [
          "Make sure you're in the project root directory",
          "The command will ask you several questions about your app",
        ],
      },
      {
        number: 2,
        title: "Answer the prompts",
        description:
          "When prompted, select: Node as platform, Node.js version 24.11.1 (latest LTS), npm as package manager, yes to run npm run build, dist as build output directory, npm run preview as start command, and 4173 as the port.",
        tips: [
          "Always select the latest LTS Node.js version",
          "Check Node.js official docs for current LTS version",
          "The generated files are a starting point, not final",
        ],
      },
      {
        number: 3,
        title: "Review generated files",
        description:
          "Check what files were created: Dockerfile, .dockerignore, compose.yaml, and README.Docker.md. Open each file to understand what Docker generated. Note that these are generic templates, not optimized for React.js production.",
        tips: [
          "The generated Dockerfile uses npm run preview - not ideal for production",
          "The .dockerignore might be too broad or miss React-specific files",
          "The compose.yaml assumes Node.js server behavior",
          "We'll replace these with optimized versions",
        ],
      },
      {
        number: 4,
        title: "Test the generated setup",
        description:
          "Run docker compose up --build to test Docker's generated configuration. Visit http://localhost:4173. Note: The app likely won't load because Vite preview binds to localhost inside the container, making it inaccessible from your host machine. This is expected - we'll fix it in the next steps by using NGINX or serve instead.",
        tips: [
          "If the app doesn't load, it's because Vite preview binds to localhost (127.0.0.1) by default",
          "Inside a Docker container, 'localhost' refers to the container itself, not your host machine",
          "This means the app is only accessible from inside the container, not from your browser",
          "This is a common issue with docker init and Vite - we'll fix it by using a proper web server (NGINX or serve) in the next steps",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Create Production Dockerfile with Multi-Stage Build",
    description:
      "Replace the generated Dockerfile with a production-ready multi-stage build that uses NGINX to serve your React app efficiently and securely.",
    estimatedTime: "15 minutes",
    icon: "📦",
    steps: [
      {
        number: 1,
        title: "Create the build stage",
        description:
          "Start with ARG declarations for NODE_VERSION (24.11.1-alpine) and NGINX_VERSION (alpine3.22). Create Stage 1 (builder) using node:${NODE_VERSION}. Set WORKDIR to /app. Copy package.json and package-lock.json first, then run npm ci with cache mount. Copy the rest of your source code, then run npm run build.",
        tips: [
          "Use ARG to make versions configurable",
          "Copy package files first for better Docker layer caching",
          "Use --mount=type=cache for npm cache",
          "npm ci ensures clean, reproducible installs",
          "The build outputs to /app/dist",
        ],
      },
      {
        number: 2,
        title: "Create the production stage with NGINX",
        description: "Create Stage 2 (runner) with these steps:",
        tips: [
          "Use nginxinc/nginx-unprivileged:${NGINX_VERSION} as the base image",
          "Copy your custom nginx.conf file to /etc/nginx/nginx.conf",
          "Copy the built files from the builder stage (/app/dist) to /usr/share/nginx/html using --from=builder",
          "Set ownership with --chown=nginx:nginx so NGINX can read the files",
          "Switch to USER nginx for security (non-root user)",
          "EXPOSE port 8080 (non-root users can't bind to port 80)",
          "Set ENTRYPOINT to start nginx with your custom config",
          "Set CMD with daemon off to keep NGINX running in the foreground",
        ],
      },
      {
        number: 3,
        title: "Create nginx.conf file",
        description:
          "Create a new file named nginx.conf in your project root. Copy the following complete configuration:",
        code: `worker_processes auto;                          # Use all available CPU cores for maximum efficiency

# Store PID in /tmp (this directory is always writable in containers)
pid /tmp/nginx.pid;                             # Prevent permission issues inside Docker containers

events {
    worker_connections 1024;                    # Max concurrent connections per worker
}

http {
    include       /etc/nginx/mime.types;        # Load standard MIME types for correct content handling
    default_type  application/octet-stream;     # Fallback MIME type for unknown file types

    # Disable access logs to avoid permission issues and reduce output noise
    access_log off;                             # Turn off access logs completely
    error_log  /dev/stderr warn;                # Send error logs to stderr for visibility in Docker

    # Optimize static file delivery
    sendfile        on;                         # Enable efficient file transfers using kernel mechanisms
    tcp_nopush      on;                         # Optimize packet sizes when sending large files
    tcp_nodelay     on;                         # Disable buffering for low-latency responses
    keepalive_timeout  65;                      # Time to keep connections open for reuse
    keepalive_requests 1000;                    # Allow many requests per connection before closing

    # Enable gzip compression for faster load times
    gzip on;                                     # Turn on gzip compression
    gzip_types                                     # Specify which file types should be compressed
        text/plain
        text/css
        application/json
        application/javascript
        text/xml
        application/xml
        application/xml+rss
        text/javascript
        image/svg+xml;
    gzip_min_length 256;                         # Only compress responses larger than 256 bytes
    gzip_vary on;                                # Add Vary: Accept-Encoding header for proxies/CDNs

    server {
        listen       8080;                      # Expose the app on port 8080
        server_name  localhost;                 # Default server name for local setups

        # Root directory where the React build artifacts (index.html, static folder, etc.) are placed
        root /usr/share/nginx/html;             # Serve files from this directory
        index index.html;                       # Default file served on directory access

        # Main route handler — supports client-side routing in React
        location / {
            try_files $uri /index.html;         # If file is missing, fall back to index.html for SPA routing
        }

        # Cache static assets aggressively for better performance
        location ~* \\.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|map)$ {
            expires 1y;                          # Cache for 1 year (safe for hashed filenames)
            access_log off;                      # Disable logs for static files
            add_header Cache-Control "public, immutable";  # Tell browsers that files won't change
        }

        # Additional static assets path (React's /static/ directory)
        location /static/ {
            expires 1y;                          # Cache assets from /static for 1 year
            add_header Cache-Control "public, immutable";  # Ensure long-term caching
        }
    }
}`,
      },
      {
        number: 4,
        title: "Build your production image",
        description:
          "Run docker build -t docker-reactjs-sample:prod . to build your image. Watch for any errors. Once complete, verify the image was created with docker images.",
        tips: [
          "The build might take a few minutes the first time",
          "Use --progress=plain to see detailed output",
          "Check the final image size - should be much smaller than Node.js image",
          "Make sure nginx.conf exists before building",
        ],
      },
      {
        number: 5,
        title: "Create Docker Compose service for production",
        description:
          "Add a react-prod service to your compose.yaml file. Use the production Dockerfile, map port 8080:8080, and set the image name. Then test it with docker compose up react-prod --build.",
        tips: [
          "Add react-prod service to compose.yaml",
          "Set dockerfile: Dockerfile (production Dockerfile)",
          "Map port 8080:8080 for NGINX",
          "Run: docker compose up react-prod --build",
          "Visit http://localhost:8080 to verify the production build works",
          "Test that routes work correctly and static assets are served",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Create .dockerignore File",
    description:
      "Optimize your Docker builds by excluding unnecessary files from the build context. This speeds up builds and prevents sensitive files from being included.",
    estimatedTime: "10 minutes",
    icon: "🚫",
    steps: [
      {
        number: 1,
        title: "Create .dockerignore file",
        description:
          "Create a .dockerignore file in your project root (similar to .gitignore). This tells Docker what files to exclude from the build context.",
      },
      {
        number: 2,
        title: "Add ignore patterns",
        description:
          "Add patterns to exclude: node_modules, .npm, .yarn, dist, .vite, .env files, IDE files (.vscode, .idea), .git, documentation (*.md), test files, and optionally Docker files themselves. Be specific - don't use overly broad patterns.",
        tips: [
          "Exclude build outputs (dist, .vite)",
          "Exclude dependencies (node_modules)",
          "Exclude environment files (.env*)",
          "Exclude IDE and Git files",
          "Smaller build context = faster builds",
          "Prevents sensitive files from being included",
        ],
      },
      {
        number: 3,
        title: "Verify it works",
        description:
          "Rebuild your image and notice faster build times. Compare build context size before and after. Use docker build --progress=plain to see what's being sent to Docker.",
        tips: [
          "Compare build times before and after",
          "Check that sensitive files aren't included",
          "Smaller images deploy faster",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Create Development Dockerfile",
    description:
      "Set up a separate Dockerfile.dev for development with hot reload. This allows you to develop inside Docker while maintaining fast iteration.",
    estimatedTime: "10 minutes",
    icon: "⚡",
    steps: [
      {
        number: 1,
        title: "Create Dockerfile.dev",
        description:
          "Create a new file named Dockerfile.dev in your project root. This will be separate from your production Dockerfile.",
      },
      {
        number: 2,
        title: "Configure for development",
        description:
          "Use Node.js 24.11.1-alpine. Set WORKDIR to /app. Copy package files first, then install dependencies with npm install (not npm ci - dev dependencies needed). Copy source code. Create non-root user (nodejs, UID 1001) with addgroup and adduser. Change ownership of /app to nodejs. Switch to USER nodejs. EXPOSE port 5173. Set CMD to npm run dev.",
        tips: [
          "Use npm install (not npm ci) for dev dependencies",
          "Create user before switching to it",
          "Use chown to set proper ownership",
          "Expose Vite's default dev port (5173)",
        ],
      },
      {
        number: 3,
        title: "Build and test development image",
        description:
          "Create a react-dev service in your compose.yaml file. Use Dockerfile.dev as the dockerfile, map port 5173:5173, and configure watch mode for hot reload. Then run docker compose up react-dev --build to start the development server. Verify hot reload works by making a change to your code.",
        tips: [
          "Add react-dev service to compose.yaml with dockerfile: Dockerfile.dev",
          "Map port 5173:5173 for Vite dev server",
          "Use develop.watch configuration for automatic code sync",
          "Run: docker compose up react-dev --build",
          "Visit http://localhost:5173 to see your app",
          "Make a code change and watch it reload automatically",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Create Dockerfile with Serve",
    description:
      "Create an alternative production Dockerfile using Node.js serve package instead of NGINX. This gives you another deployment option.",
    estimatedTime: "10 minutes",
    icon: "🌐",
    steps: [
      {
        number: 1,
        title: "Create Dockerfile.serve",
        description:
          "Create a new file named Dockerfile.serve in your project root.",
      },
      {
        number: 2,
        title: "Add build and serve stages",
        description:
          "Create build stage with Node.js 24.11.1-alpine. Copy package files, run npm ci with cache. Copy source and build. Create final stage with Node.js. Set NODE_ENV=production. Install serve@14.2.5 globally. Copy built files from build stage to /app/dist with --chown=node:node. Switch to USER node. EXPOSE 8080. Set CMD to serve -s dist -l 8080.",
        tips: [
          "Multi-stage keeps final image small",
          "Install serve globally in final stage",
          "Use -s flag for SPA routing support",
          "Set NODE_ENV=production",
        ],
      },
      {
        number: 3,
        title: "Build and test serve image",
        description:
          "Build with docker build -f Dockerfile.serve -t docker-reactjs-sample-serve . Run and test at http://localhost:8080.",
      },
      {
        number: 4,
        title: "Add Docker Compose service for serve",
        description:
          "Add a react-serve service to your compose.yaml file. Use Dockerfile.serve as the dockerfile, map port 8080:8080, and set the image name. Then test it with docker compose up react-serve --build.",
        tips: [
          "Add react-serve service to compose.yaml",
          "Set dockerfile: Dockerfile.serve",
          "Map port 8080:8080 (same as production NGINX)",
          "Run: docker compose up react-serve --build",
          "Visit http://localhost:8080 to verify it works",
          "Note: You can't run react-prod and react-serve simultaneously on the same port",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Scan Image for Vulnerabilities with Docker Scout",
    description:
      "Before pushing your image to Docker Hub, scan it for security vulnerabilities using Docker Scout. This helps ensure your production image is secure and follows best practices.",
    estimatedTime: "5 minutes",
    icon: "🔒",
    steps: [
      {
        number: 1,
        title: "Enable Docker Scout",
        description:
          "Docker Scout is built into Docker Desktop. If you're using Docker Desktop, Scout is already available. For Linux, ensure you have Docker Engine 24.0+ or install Docker Scout CLI separately.",
        tips: [
          "Docker Scout is included in Docker Desktop",
          "For Linux: Install Docker Scout CLI if needed",
          "Verify installation: docker scout --version",
          "Docker Scout helps identify security vulnerabilities",
        ],
      },
      {
        number: 2,
        title: "Scan your production image",
        description:
          "Run docker scout cves docker-reactjs-sample:prod to scan your production image for Common Vulnerabilities and Exposures (CVEs). This will analyze all layers and dependencies.",
        tips: [
          "Use: docker scout cves docker-reactjs-sample:prod",
          "Replace 'docker-reactjs-sample:prod' with your actual image name",
          "The scan analyzes all layers and packages",
          "Review the output for any critical or high-severity vulnerabilities",
        ],
      },
      {
        number: 3,
        title: "Review scan results",
        description:
          "Docker Scout will display a summary of vulnerabilities found, categorized by severity (Critical, High, Medium, Low). Review the results and check if any vulnerabilities need immediate attention.",
        tips: [
          "Critical and High vulnerabilities should be addressed before pushing",
          "Medium and Low vulnerabilities can often be addressed later",
          "Docker Scout provides recommendations for fixing vulnerabilities",
          "Check if vulnerabilities are in your code or dependencies",
        ],
      },
      {
        number: 4,
        title: "Get detailed recommendations",
        description:
          "Run docker scout recommendations docker-reactjs-sample:prod to get specific recommendations on how to fix vulnerabilities. This might include updating base images or dependencies.",
        tips: [
          "Use: docker scout recommendations docker-reactjs-sample:prod",
          "This shows actionable steps to fix vulnerabilities",
          "May suggest updating base images (e.g., newer Alpine version)",
          "May suggest updating npm packages",
          "Follow recommendations to improve security",
        ],
      },
      {
        number: 5,
        title: "Fix critical vulnerabilities (if any)",
        description:
          "If critical or high-severity vulnerabilities are found, update your Dockerfile to use newer base images or update dependencies. Rebuild the image and scan again to verify fixes.",
        tips: [
          "Update base images to latest stable versions",
          "Run npm audit fix in your project",
          "Rebuild image: docker build -f Dockerfile -t docker-reactjs-sample:prod .",
          "Rescan: docker scout cves docker-reactjs-sample:prod",
          "Repeat until critical vulnerabilities are resolved",
        ],
      },
      {
        number: 6,
        title: "Verify image is ready",
        description:
          "Once you've addressed critical vulnerabilities (or confirmed none exist), your image is ready to push to Docker Hub. Docker Scout helps ensure you're deploying secure containers.",
        tips: [
          "A clean scan doesn't mean zero vulnerabilities, but critical ones should be fixed",
          "Docker Scout provides ongoing security monitoring",
          "You can set up automated scanning in CI/CD pipelines",
          "Security is an ongoing process, not a one-time check",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Push Image to Docker Hub",
    description:
      "Share your containerized React.js application with the world by pushing it to Docker Hub. This allows you to deploy it anywhere and share it with your team.",
    estimatedTime: "10 minutes",
    icon: "🚀",
    steps: [
      {
        number: 1,
        title: "Create Docker Hub account",
        description:
          "Visit https://hub.docker.com and sign up for a free account. Choose a username (this will be part of your image name). Verify your email address.",
        tips: [
          "Docker Hub accounts are free",
          "Choose a username that represents you or your organization",
          "You'll use this username to tag your images",
        ],
      },
      {
        number: 2,
        title: "Login to Docker Hub",
        description:
          "Open your terminal and run docker login. Enter your Docker Hub username and password when prompted. This authenticates your Docker CLI with Docker Hub.",
        tips: [
          "Use: docker login",
          "Enter your Docker Hub username and password",
          "You can also use: docker login -u <your-docker-hub-username>",
          "Replace <your-docker-hub-username> with your actual Docker Hub username",
        ],
      },
      {
        number: 3,
        title: "Tag your image for Docker Hub",
        description:
          "Tag your production image with your Docker Hub username. Format: docker tag SOURCE_IMAGE <your-docker-hub-username>/docker-reactjs-workshop:TAG. For example: docker tag docker-reactjs-sample:prod <your-docker-hub-username>/docker-reactjs-workshop:latest",
        tips: [
          "Format: docker tag LOCAL_IMAGE <your-docker-hub-username>/docker-reactjs-workshop:TAG",
          "Replace '<your-docker-hub-username>' with your actual Docker Hub username",
          "Use :latest tag for your main version",
          "You can tag multiple versions (v1.0, v1.1, etc.)",
        ],
      },
      {
        number: 4,
        title: "Push your image",
        description:
          "Push your tagged image to Docker Hub using docker push <your-docker-hub-username>/docker-reactjs-workshop:TAG. Wait for the upload to complete. You can monitor progress in the terminal.",
        tips: [
          "Use: docker push <your-docker-hub-username>/docker-reactjs-workshop:latest",
          "Replace '<your-docker-hub-username>' with your actual Docker Hub username",
          "The first push might take a few minutes",
          "Subsequent pushes are faster due to layer caching",
          "Check Docker Hub website to see your pushed image",
        ],
      },
      {
        number: 5,
        title: "Verify on Docker Hub",
        description:
          "Visit https://hub.docker.com/r/<your-docker-hub-username>/docker-reactjs-workshop to see your pushed image. You should see the image details, tags, and pull commands.",
        tips: [
          "Your image is now publicly available (unless you set it to private)",
          "Others can pull it using: docker pull <your-docker-hub-username>/docker-reactjs-workshop:latest",
          "Replace '<your-docker-hub-username>' with your actual Docker Hub username",
          "You can add descriptions and documentation on Docker Hub",
        ],
      },
      {
        number: 6,
        title: "Test pulling your image",
        description:
          "On another machine or after removing local image, test pulling your image: docker pull <your-docker-hub-username>/docker-reactjs-workshop:latest. Then run it to verify it works.",
        tips: [
          "Remove local image first: docker rmi <your-docker-hub-username>/docker-reactjs-workshop:latest",
          "Pull it: docker pull <your-docker-hub-username>/docker-reactjs-workshop:latest",
          "Run it: docker run -p 8080:8080 <your-docker-hub-username>/docker-reactjs-workshop:latest",
          "Replace '<your-docker-hub-username>' with your actual Docker Hub username",
          "This proves your image works anywhere Docker is installed",
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Set Up GitHub Actions for Automated CI/CD (Optional)",
    description:
      "Automate your Docker image builds and pushes to Docker Hub using GitHub Actions. This optional task sets up a CI/CD pipeline that automatically builds and pushes your image whenever you push code to GitHub.",
    estimatedTime: "15 minutes",
    icon: "⚙️",
    steps: [
      {
        number: 1,
        title: "Locate the workflow file",
        description:
          "The GitHub Actions workflow file already exists in your repository at `.github/workflows/main.yml`. It's currently commented out and ready to be activated.",
        tips: [
          "The file is located at: .github/workflows/main.yml",
          "All lines are currently commented with #",
          "The workflow includes linting, testing, and Docker image building",
          "It's configured for Node.js 24.11.1 (matching the workshop)",
        ],
      },
      {
        number: 2,
        title: "Uncomment the workflow file",
        description:
          "Open `.github/workflows/main.yml` in your editor and remove all the `#` comment characters from the beginning of each line. The file contains a complete CI/CD pipeline with three jobs: lint (code quality), test (run tests), and build-and-deploy (build and push Docker image).",
        tips: [
          "Remove all `#` characters from the beginning of each line",
          "You can use Find & Replace in your editor: Find `# ` and replace with empty string",
          "Or use sed command: sed -i '' 's/^# //' .github/workflows/main.yml (macOS/Linux)",
          "The workflow uses Docker Buildx for multi-platform builds",
          "It builds for both linux/amd64 and linux/arm64 platforms",
          "Images are tagged with :latest, :short_sha, and :date",
        ],
      },
      {
        number: 3,
        title: "Verify the workflow file",
        description:
          "After uncommenting, verify that the YAML syntax is correct. The file should start with `name: Docker CI/CD Pipeline` and contain three jobs: lint, test, and build-and-deploy.",
        tips: [
          "Check that the file starts with `name: Docker CI/CD Pipeline`",
          "Verify there are no remaining `#` characters",
          "The workflow should have three jobs: lint, test, build-and-deploy",
          "You can validate YAML syntax using online tools if needed",
        ],
      },
      {
        number: 4,
        title: "Update Docker Hub repository name",
        description:
          "The workflow uses DOCKERHUB_PROJECT_NAME secret. You'll need to set this in GitHub Secrets.",
        tips: [
          "The workflow uses: DOCKERHUB_REPO: ${{ secrets.DOCKER_USERNAME }}/${{ secrets.DOCKERHUB_PROJECT_NAME }}",
          "You'll configure these secrets in GitHub repository settings",
          "DOCKERHUB_PROJECT_NAME should match your Docker Hub repository name",
          "DOCKERHUB_PROJECT_NAME should be created in Docker Hub Settings -> Repositories -> Create Repository",
          "Set DOCKERHUB_PROJECT_NAME to 'docker-reactjs-workshop'",
        ],
      },
      {
        number: 5,
        title: "Configure GitHub Secrets",
        description:
          "Go to your GitHub repository Settings → Secrets and variables → Actions. Add three secrets: DOCKER_USERNAME (your Docker Hub username), DOCKERHUB_TOKEN (your Docker Hub access token), and DOCKERHUB_PROJECT_NAME (your repository name, e.g., 'docker-reactjs-workshop').",
        tips: [
          "DOCKER_USERNAME: Your Docker Hub username",
          "DOCKERHUB_TOKEN: Create an access token at https://hub.docker.com/settings/security",
          "DOCKERHUB_PROJECT_NAME: Your repository name (e.g., 'docker-reactjs-workshop')",
          "Never commit secrets to your repository",
          "GitHub Secrets are encrypted and only accessible to workflows",
        ],
      },
      {
        number: 6,
        title: "Create Docker Hub access token",
        description:
          "If you don't have a Docker Hub access token, create one: Go to Docker Hub → Account Settings → Security → New Access Token. Give it a name (e.g., 'github-actions') and permissions (Read & Write). Copy the token and add it to GitHub Secrets as DOCKERHUB_TOKEN.",
        tips: [
          "Visit: https://hub.docker.com/settings/security",
          "Click 'New Access Token'",
          "Name it (e.g., 'github-actions')",
          "Set permissions to 'Read & Write'",
          "Copy the token immediately (you won't see it again)",
          "Add it to GitHub Secrets as DOCKERHUB_TOKEN",
        ],
      },

      {
        number: 7,
        title: "Commit and push workflow file",
        description:
          "Commit the `.github/workflows/main.yml` file to your repository and push it to GitHub. The workflow will automatically run on the next push or pull request.",
        tips: [
          "Commit: git add .github/workflows/main.yml",
          "Commit: git commit -m 'Add GitHub Actions CI/CD workflow'",
          "Push: git push origin main",
          "The workflow will trigger automatically",
        ],
      },
      {
        number: 9,
        title: "Monitor workflow execution",
        description:
          "Go to your GitHub repository → Actions tab to see the workflow running. Watch the lint, test, and build-and-deploy jobs execute. Once complete, check Docker Hub to see your automatically pushed image.",
        tips: [
          "View workflow runs: GitHub → Actions tab",
          "Click on a workflow run to see detailed logs",
          "Green checkmark means success, red X means failure",
          "Check Docker Hub after successful build-and-deploy job",
          "Images are tagged with :latest, :short_sha, and :date",
        ],
      },
      {
        number: 10,
        title: "Verify automated push",
        description:
          "Visit Docker Hub and check your repository. You should see new images with tags matching the commit SHA and date. The workflow will now automatically build and push your image on every push to main or develop branches.",
        tips: [
          "Check: https://hub.docker.com/r/<your-docker-hub-username>/docker-reactjs-workshop",
          "You should see :latest, :short_sha, and :date tags",
          "Future pushes will automatically trigger builds",
          "Pull requests will run lint and test (but not deploy)",
          "Only pushes to main/develop branches deploy to Docker Hub",
        ],
      },
    ],
  },
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// Calculate total estimated time from all tasks
const calculateTotalEstimatedTime = (): string => {
  const totalMinutes = WORKSHOP_TASKS.reduce((sum, task) => {
    // Parse estimatedTime string (e.g., "5 minutes", "10 minutes", "20 minutes")
    const match = task.estimatedTime.match(/(\d+)/);
    if (match) {
      return sum + parseInt(match[1], 10);
    }
    return sum;
  }, 0);

  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} ${
    minutes === 1 ? "minute" : "minutes"
  }`;
};

const STORAGE_KEY = "workshop-timers";

// Load timers from localStorage synchronously for initial state
const loadTimersFromStorage = (): Record<number, TimerState> => {
  try {
    const savedTimers = localStorage.getItem(STORAGE_KEY);
    if (savedTimers) {
      const parsedTimers = JSON.parse(savedTimers);
      const restoredTimers: Record<number, TimerState> = {};
      Object.keys(parsedTimers).forEach((key) => {
        const taskId = parseInt(key, 10);
        restoredTimers[taskId] = {
          ...parsedTimers[taskId],
          isRunning: false, // Don't auto-start timers after refresh
        };
      });
      return restoredTimers;
    }
  } catch (error) {
    console.error("Failed to load timers from localStorage:", error);
  }
  return {};
};

export const WorkshopTasks = () => {
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [timers, setTimers] = useState<Record<number, TimerState>>(() =>
    loadTimersFromStorage()
  );
  const intervalRefs = useRef<Record<number, NodeJS.Timeout>>({});
  const isInitialMount = useRef(true);

  // Mark initial mount as complete after first render
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  // Save timers to localStorage whenever they change (but not on initial mount)
  useEffect(() => {
    if (!isInitialMount.current) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
      } catch (error) {
        console.error("Failed to save timers to localStorage:", error);
      }
    }
  }, [timers]);

  useEffect(() => {
    // Cleanup intervals on unmount
    const currentIntervals = intervalRefs.current;
    return () => {
      Object.values(currentIntervals).forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  const toggleTask = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const startTimer = (taskId: number) => {
    if (intervalRefs.current[taskId]) {
      clearInterval(intervalRefs.current[taskId]);
    }

    const interval = setInterval(() => {
      setTimers((prev) => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          elapsedTime: (prev[taskId]?.elapsedTime || 0) + 1,
        },
      }));
    }, 1000);

    intervalRefs.current[taskId] = interval;

    setTimers((prev) => ({
      ...prev,
      [taskId]: {
        isRunning: true,
        elapsedTime: prev[taskId]?.elapsedTime || 0,
        completed: prev[taskId]?.completed || false,
        completionTime: prev[taskId]?.completionTime,
      },
    }));
  };

  const stopTimer = (taskId: number) => {
    if (intervalRefs.current[taskId]) {
      clearInterval(intervalRefs.current[taskId]);
      delete intervalRefs.current[taskId];
    }

    setTimers((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        isRunning: false,
        completed: prev[taskId]?.completed || false,
        elapsedTime: prev[taskId]?.elapsedTime || 0,
      },
    }));
  };

  const completeTask = (taskId: number) => {
    // Stop the timer if it's running
    if (intervalRefs.current[taskId]) {
      clearInterval(intervalRefs.current[taskId]);
      delete intervalRefs.current[taskId];
    }

    setTimers((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        isRunning: false,
        completed: true,
        completionTime: prev[taskId]?.elapsedTime || 0,
      },
    }));
  };

  const editTask = (taskId: number) => {
    // Uncomplete the task, keep elapsed time but reset completion time
    setTimers((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        completed: false,
        completionTime: undefined,
        isRunning: false, // Ensure timer is not running when editing
      },
    }));
  };

  const resetAllProgress = () => {
    // Stop all running timers
    Object.values(intervalRefs.current).forEach((interval) => {
      if (interval) clearInterval(interval);
    });
    intervalRefs.current = {};

    // Clear all timers state
    setTimers({});

    // Clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  };

  const totalTime = Object.values(timers).reduce((sum, timer) => {
    // Use completion time if task is completed, otherwise use current elapsed time
    const taskTime =
      timer.completed && timer.completionTime
        ? timer.completionTime
        : timer.elapsedTime;
    return sum + taskTime;
  }, 0);

  const completedTasksCount = Object.keys(timers).filter((taskIdStr) => {
    const taskId = parseInt(taskIdStr, 10);
    return (
      WORKSHOP_TASKS.some((task) => task.id === taskId) &&
      timers[taskId]?.completed
    );
  }).length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-l-4 border-[#667eea] mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              🎯 Workshop Challenge
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Follow these step-by-step tasks to containerize your React.js
              application from scratch. Start with a project without Docker
              files and build everything step by step! Use the timer to track
              how long each task takes you.
            </p>
          </div>
          <div className="shrink-0 bg-white px-4 py-2 rounded-lg border-2 border-[#667eea] shadow-sm">
            <p className="text-xs font-semibold text-gray-600 mb-1">
              ⏱️ Expected Time
            </p>
            <p className="text-lg font-bold text-[#667eea]">
              {calculateTotalEstimatedTime()}
            </p>
          </div>
        </div>
        {(totalTime > 0 || completedTasksCount > 0) && (
          <div className="mt-4 p-3 bg-white rounded-lg border-2 border-[#667eea]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-sm font-semibold text-gray-700">
                  ⏱️ Total Workshop Time:{" "}
                  <span className="text-lg font-mono font-bold text-[#667eea]">
                    {formatTime(totalTime)}
                  </span>
                </p>
                {completedTasksCount > 0 && (
                  <p className="text-sm font-semibold text-green-700">
                    ✅ Completed Tasks:{" "}
                    <span className="text-lg font-bold text-green-600">
                      {completedTasksCount} / {WORKSHOP_TASKS.length}
                    </span>
                  </p>
                )}
              </div>
              <button
                onClick={resetAllProgress}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold text-sm flex items-center gap-2"
              >
                🔄 Reset All Progress
              </button>
            </div>
          </div>
        )}
      </div>

      {WORKSHOP_TASKS.map((task) => {
        const timer: TimerState = timers[task.id] || {
          isRunning: false,
          elapsedTime: 0,
          completed: false,
        };
        const elapsedTimeFormatted = formatTime(timer.elapsedTime);
        const completionTimeFormatted = timer.completionTime
          ? formatTime(timer.completionTime)
          : null;

        return (
          <div
            key={task.id}
            className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
              timer.completed
                ? "border-green-500 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-4xl">{task.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Task {task.id}: {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        ⏱️ Estimated: {task.estimatedTime}
                      </span>
                      {timer.completed && completionTimeFormatted ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-green-700">
                            ✅ Completed in:
                          </span>
                          <span className="text-lg font-mono font-bold text-green-600">
                            {completionTimeFormatted}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-500">
                            ⏱️ Your time:
                          </span>
                          <span
                            className={`text-lg font-mono font-bold ${
                              timer.isRunning
                                ? "text-green-600 animate-pulse"
                                : timer.elapsedTime > 0
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          >
                            {elapsedTimeFormatted}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {!timer.completed ? (
                  <>
                    {!timer.isRunning ? (
                      <button
                        onClick={() => startTimer(task.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold text-sm flex items-center gap-2"
                      >
                        ▶️ Start Timer
                      </button>
                    ) : (
                      <button
                        onClick={() => stopTimer(task.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold text-sm flex items-center gap-2"
                      >
                        ⏸️ Stop Timer
                      </button>
                    )}
                    {timer.elapsedTime > 0 && (
                      <button
                        onClick={() => completeTask(task.id)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 font-semibold text-sm flex items-center gap-2"
                      >
                        ✅ Complete Task
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold text-sm flex items-center gap-2">
                      ✅ Task Completed
                    </div>
                    <button
                      onClick={() => editTask(task.id)}
                      className="px-4 py-2 bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-semibold text-sm flex items-center gap-2 shadow-sm"
                    >
                      ✏️ Edit Task
                    </button>
                  </>
                )}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="ml-auto px-4 py-2 bg-[#667eea] text-white rounded-lg hover:bg-[#764ba2] transition-colors duration-200 font-semibold text-sm flex items-center gap-2"
                >
                  {expandedTask === task.id ? "▼ Hide Steps" : "▶ Show Steps"}
                </button>
              </div>

              {expandedTask === task.id && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="space-y-4">
                    {task.steps.map((step) => (
                      <div
                        key={step.number}
                        className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-500 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              {step.title}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              {step.description}
                            </p>

                            {step.code && (
                              <div className="mt-3 p-4 bg-gray-900 rounded-lg border border-gray-700 overflow-x-auto">
                                <pre className="text-sm text-gray-100 font-mono whitespace-pre">
                                  <code>{step.code}</code>
                                </pre>
                              </div>
                            )}
                            {step.tips && step.tips.length > 0 && (
                              <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                                <p className="text-xs font-semibold text-yellow-800 mb-2">
                                  💡 Tips:
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {step.tips.map((tip, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-yellow-700"
                                    >
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {completedTasksCount === WORKSHOP_TASKS.length && (
        <>
          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-800 mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-green-700 mb-3">
              You&apos;ve successfully containerized your React.js application!
              You now have:
            </p>
            <ul className="list-disc list-inside space-y-1 text-green-700 mb-4">
              <li>Multi-stage production Dockerfile with NGINX</li>
              <li>Development Dockerfile with hot reload</li>
              <li>Alternative production Dockerfile with serve</li>
              <li>Optimized .dockerignore file</li>
              <li>Docker Compose configuration with multiple services</li>
              <li>Custom NGINX configuration for production</li>
              <li>Your image pushed to Docker Hub</li>
            </ul>
            {totalTime > 0 && (
              <p className="text-sm text-green-600 font-semibold mb-4">
                ⏱️ Your total workshop time:{" "}
                <span className="text-lg font-mono">
                  {formatTime(totalTime)}
                </span>{" "}
                - Great job! 🚀
              </p>
            )}
          </div>

          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-500 p-8 rounded-2xl shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-800 mb-3">
                🎁 Special Reward for Completing the Workshop!
              </h3>
              <p className="text-gray-700 mb-4 text-lg">
                You&apos;ve completed all {WORKSHOP_TASKS.length} tasks! As a
                reward for your dedication, get an exclusive discount on the
                comprehensive book:
              </p>
              <div className="bg-white p-6 rounded-xl mb-4 border-2 border-purple-300">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                  <div className="shrink-0">
                    <img
                      src="/src/assets/docker-for-react-js-developers.png"
                      alt="React.js Security Book Cover"
                      className="w-48 h-auto rounded-lg shadow-lg border-2 border-purple-200"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      📚 Docker for React.js Developers
                    </h4>
                    <p className="text-gray-600">
                      Master Docker fundamentals, build production-ready
                      React.js applications, deploy with confidence, and learn
                      from a Docker Captain and official Docker guide author.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {totalTime <= 120 * 60 ? (
                    <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg">
                      <p className="text-lg font-bold text-green-800 mb-2">
                        ⚡ On Time Completion Bonus!
                      </p>
                      <p className="text-gray-700 mb-3">
                        You completed the workshop on time! Get{" "}
                        <span className="text-2xl font-bold text-green-600">
                          50% OFF
                        </span>
                      </p>
                      <div className="bg-white p-4 rounded border border-green-300">
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 line-through mb-1">
                            Original Price: £42
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            Now: £20.00
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Promo Code:
                        </p>
                        <p className="text-2xl font-mono font-bold text-green-600 mb-3">
                          PROMO50
                        </p>
                        <a
                          href="https://kristiyanvelkov.com/b/docker-for-reactjs-developers"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
                        >
                          Get 50% Discount →
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded-lg">
                      <p className="text-lg font-bold text-blue-800 mb-2">
                        🎯 Great Effort!
                      </p>
                      <p className="text-gray-700 mb-3">
                        You completed the workshop! Get{" "}
                        <span className="text-2xl font-bold text-blue-600">
                          30% OFF
                        </span>
                      </p>
                      <div className="bg-white p-4 rounded border border-blue-300">
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 line-through mb-1">
                            Original Price: £42
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            Now: £30.00
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Promo Code:
                        </p>
                        <p className="text-2xl font-mono font-bold text-blue-600 mb-3">
                          PROMO30
                        </p>
                        <a
                          href="https://kristiyanvelkov.com/b/docker-for-reactjs-developers"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                        >
                          Get 30% Discount →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Use the promo code at checkout to apply your discount. Learn
                advanced Docker techniques, deployment strategies, and
                production best practices!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
