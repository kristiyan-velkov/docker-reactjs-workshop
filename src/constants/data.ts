import type {
  Feature,
  DockerCommand,
  DockerConcept,
  DockerCommandCategory,
} from "../types";

export const FEATURES: Feature[] = [
  {
    icon: "⚛️",
    title: "Advanced React Patterns",
    description:
      "Master hooks, context API, performance optimization, and modern React 19 features.",
  },
  {
    icon: "🐳",
    title: "Docker Containerization",
    description:
      "Learn multi-stage builds, Docker Compose, and production deployment strategies.",
  },
  {
    icon: "⚡",
    title: "Performance Optimization",
    description:
      "Code splitting, lazy loading, memoization, and bundle optimization techniques.",
  },
  {
    icon: "🔒",
    title: "Security Best Practices",
    description:
      "Secure container builds, vulnerability scanning, and production security patterns.",
  },
  {
    icon: "🚀",
    title: "Production Deployment",
    description:
      "CI/CD pipelines, Kubernetes basics, and scalable deployment architectures.",
  },
  {
    icon: "📚",
    title: "Hands-On Learning",
    description:
      "Practical exercises and real-world scenarios to reinforce your learning.",
  },
];

export const DOCKER_COMMANDS: DockerCommand[] = [
  {
    title: "Start Development Server",
    command: "docker compose up react-dev",
    description: "Start development server with hot reload on port 5173",
  },
  {
    title: "Start Production Server",
    command: "docker compose up react-prod",
    description: "Start production server with Nginx on port 8080",
  },
  {
    title: "Run Tests",
    command: "docker compose up react-test",
    description: "Run test suite in container",
  },
  {
    title: "Run Linter",
    command: "docker compose up react-lint",
    description: "Run ESLint in container",
  },
  {
    title: "Build Production Image",
    command: "docker build -t docker-reactjs-sample -f Dockerfile .",
    description: "Build optimized production image with Nginx",
  },
  {
    title: "Build Development Image",
    command: "docker build -t docker-reactjs-sample-dev -f Dockerfile.dev .",
    description: "Build development image with Vite",
  },
];

export const DOCKER_CONCEPTS: DockerConcept[] = [
  {
    icon: "📦",
    title: "Docker Image",
    description:
      "A Docker image is a read-only template used to create containers. It contains all the code, runtime, libraries, and dependencies needed to run an application. Images are built from Dockerfiles and can be stored in registries like Docker Hub.",
    example: "docker build -t my-app:latest .",
    docsLink: "https://docs.docker.com/get-started/overview/#docker-images",
  },
  {
    icon: "📝",
    title: "Dockerfile",
    description:
      "A Dockerfile is a text file containing instructions for building a Docker image. It defines the base image, sets up the environment, copies files, installs dependencies, and configures how the container runs. This project uses multi-stage builds for optimized production images.",
    example:
      "FROM node:24.11.1-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build",
    docsLink: "https://docs.docker.com/reference/dockerfile/",
  },
  {
    icon: "🐳",
    title: "Docker Container",
    description:
      "A Docker container is a running instance of a Docker image. Containers are isolated, lightweight, and portable environments that run applications. Multiple containers can run from the same image, each with its own isolated filesystem and network.",
    example: "docker run -d -p 8080:8080 docker-reactjs-sample",
    docsLink: "https://docs.docker.com/get-started/overview/#docker-containers",
  },
  {
    icon: "🎼",
    title: "Docker Compose",
    description:
      "Docker Compose is a tool for defining and running multi-container Docker applications. It uses a YAML file (compose.yaml) to configure services, networks, and volumes, making it easy to orchestrate complex applications.",
    example: "docker compose up -d",
    docsLink: "https://docs.docker.com/compose/",
  },
  {
    icon: "🚫",
    title: ".dockerignore File",
    description:
      "A .dockerignore file specifies which files and directories should be excluded from the Docker build context. Similar to .gitignore, it helps reduce build time, image size, and prevents sensitive files from being included in images.",
    example: "node_modules/\n.git/\n.env\n*.log\n.DS_Store",
    docsLink: "https://docs.docker.com/build/building/context/#dockerignore",
  },
  {
    icon: "⚙️",
    title: "Docker Engine",
    description:
      "Docker Engine is the core runtime that runs containers. It consists of a daemon (dockerd) that manages containers, images, networks, and volumes, and a REST API that allows applications to interact with the daemon.",
    example: "docker version",
    docsLink: "https://docs.docker.com/engine/",
  },
  {
    icon: "💻",
    title: "Docker Client",
    description:
      "The Docker Client (docker CLI) is the command-line interface that allows users to interact with Docker Engine. It sends commands to the Docker daemon via the REST API to build, run, and manage containers.",
    example: "docker ps\ndocker build\ndocker run",
    docsLink: "https://docs.docker.com/engine/reference/commandline/cli/",
  },
  {
    icon: "🌐",
    title: "Docker Network",
    description:
      "Docker networks enable containers to communicate with each other and with the host. Docker provides default networks (bridge, host, none) and allows creating custom networks for better isolation and control.",
    example:
      "docker network create my-network\ndocker run --network my-network my-app",
    docsLink: "https://docs.docker.com/network/",
  },
  {
    icon: "💾",
    title: "Docker Volume",
    description:
      "Docker volumes are the preferred mechanism for persisting data generated by containers. Volumes are managed by Docker and can be shared between containers, providing data persistence independent of container lifecycle.",
    example:
      "docker volume create my-volume\ndocker run -v my-volume:/data my-app",
    docsLink: "https://docs.docker.com/storage/volumes/",
  },
  {
    icon: "☁️",
    title: "Docker Hub",
    description:
      "Docker Hub is the world's largest container registry, providing a cloud-based repository for Docker images. It allows you to store, share, and pull Docker images, making it easy to distribute applications.",
    example: "docker pull nginx:latest\ndocker push username/my-app:latest",
    docsLink: "https://docs.docker.com/docker-hub/",
  },
  {
    icon: "🏗️",
    title: "Multi-Stage Build",
    description:
      "Multi-stage builds allow you to use multiple FROM statements in a Dockerfile, enabling you to build in one stage and copy only necessary artifacts to a smaller final image. This significantly reduces image size and improves security.",
    example:
      "FROM node:alpine AS builder\nWORKDIR /app\nRUN npm build\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html",
    docsLink: "https://docs.docker.com/build/building/multi-stage/",
  },
  {
    icon: "🚀",
    title: "Docker Init",
    description:
      "Docker Init is a command-line tool that helps initialize Docker resources in your project. It automatically generates Dockerfiles, compose.yaml files, and .dockerignore files based on your project type, making it easier to get started with Docker.",
    example: "docker init",
    docsLink: "https://docs.docker.com/reference/cli/docker/init/",
  },
];

export const DOCKER_COMMANDS_REFERENCE: DockerCommandCategory[] = [
  {
    icon: "📦",
    category: "Image Commands",
    commands: [
      {
        title: "Build an image",
        command: "docker build -t <image-name>:<tag> .",
        description:
          "Build a Docker image from a Dockerfile in the current directory",
        examples: [
          "docker build -t docker-reactjs-sample .",
          "docker build -t docker-reactjs-sample-dev -f Dockerfile.dev .",
          "docker build -t docker-reactjs-sample-serve -f Dockerfile.serve .",
        ],
      },
      {
        title: "List images",
        command: "docker images",
        description: "List all Docker images on your system",
        examples: ["docker images", "docker images | grep react"],
      },
      {
        title: "Remove an image",
        command: "docker rmi <image-name>",
        description: "Remove one or more Docker images",
        examples: [
          "docker rmi my-app:latest",
          "docker rmi $(docker images -q)",
        ],
      },
      {
        title: "Pull an image",
        command: "docker pull <image-name>:<tag>",
        description: "Download an image from a registry",
        examples: [
          "docker pull node:24.11.1-alpine",
          "docker pull nginxinc/nginx-unprivileged:alpine3.22",
        ],
      },
      {
        title: "Push an image",
        command: "docker push <image-name>:<tag>",
        description: "Upload an image to a registry",
        examples: [
          "docker push my-username/my-app:latest",
          "docker push my-registry.com/app:v1.0",
        ],
      },
      {
        title: "Tag an image",
        command: "docker tag <source> <target>",
        description: "Create a tag for an image",
        examples: [
          "docker tag my-app:latest my-app:v1.0",
          "docker tag my-app:latest registry.com/my-app:latest",
        ],
      },
    ],
  },
  {
    icon: "🐳",
    category: "Container Commands",
    commands: [
      {
        title: "Run a container",
        command: "docker run [options] <image-name>",
        description: "Create and start a container from an image",
        examples: [
          "docker run -d -p 8080:8080 docker-reactjs-sample",
          "docker run -d -p 5173:5173 docker-reactjs-sample-dev",
          "docker run --name react-dev -it docker-reactjs-sample-dev sh",
        ],
      },
      {
        title: "List containers",
        command: "docker ps [options]",
        description: "List running containers (use -a for all containers)",
        examples: [
          "docker ps",
          "docker ps -a",
          "docker ps --filter status=exited",
        ],
      },
      {
        title: "Stop a container",
        command: "docker stop <container-id/name>",
        description: "Stop one or more running containers",
        examples: ["docker stop my-container", "docker stop $(docker ps -q)"],
      },
      {
        title: "Start a container",
        command: "docker start <container-id/name>",
        description: "Start one or more stopped containers",
        examples: ["docker start my-container", "docker start -a my-container"],
      },
      {
        title: "Remove a container",
        command: "docker rm <container-id/name>",
        description: "Remove one or more containers",
        examples: [
          "docker rm my-container",
          "docker rm -f my-container",
          "docker rm $(docker ps -aq)",
        ],
      },
      {
        title: "Execute command in container",
        command: "docker exec [options] <container> <command>",
        description: "Run a command in a running container",
        examples: [
          "docker exec -it my-container sh",
          "docker exec my-container npm test",
          "docker exec -u root my-container ls -la",
        ],
      },
      {
        title: "View container logs",
        command: "docker logs [options] <container>",
        description: "Fetch logs from a container",
        examples: [
          "docker logs my-container",
          "docker logs -f my-container",
          "docker logs --tail 100 my-container",
        ],
      },
      {
        title: "Inspect a container",
        command: "docker inspect <container>",
        description: "Return low-level information about a container",
        examples: [
          "docker inspect my-container",
          "docker inspect --format='{{.NetworkSettings.IPAddress}}' my-container",
        ],
      },
    ],
  },
  {
    icon: "💾",
    category: "Volume Commands",
    commands: [
      {
        title: "List volumes",
        command: "docker volume ls",
        description: "List all Docker volumes",
        examples: ["docker volume ls"],
      },
      {
        title: "Create a volume",
        command: "docker volume create <volume-name>",
        description: "Create a new volume",
        examples: [
          "docker volume create my-data",
          "docker volume create --driver local my-volume",
        ],
      },
      {
        title: "Inspect a volume",
        command: "docker volume inspect <volume-name>",
        description: "Display detailed information about a volume",
        examples: ["docker volume inspect my-data"],
      },
      {
        title: "Remove a volume",
        command: "docker volume rm <volume-name>",
        description: "Remove one or more volumes",
        examples: [
          "docker volume rm my-data",
          "docker volume rm $(docker volume ls -q)",
        ],
      },
      {
        title: "Remove unused volumes",
        command: "docker volume prune",
        description: "Remove all unused volumes",
        examples: ["docker volume prune", "docker volume prune -f"],
      },
    ],
  },
  {
    icon: "🎼",
    category: "Docker Compose Commands",
    commands: [
      {
        title: "Start services",
        command: "docker compose up [options] [service]",
        description: "Create and start containers",
        examples: [
          "docker compose up react-dev",
          "docker compose up react-prod -d",
          "docker compose up react-dev --build",
          "docker compose up react-test",
          "docker compose up react-lint",
        ],
      },
      {
        title: "Stop services",
        command: "docker compose down [options]",
        description: "Stop and remove containers, networks",
        examples: [
          "docker compose down",
          "docker compose down -v",
          "docker compose down --remove-orphans",
        ],
      },
      {
        title: "View logs",
        command: "docker compose logs [options] [service]",
        description: "View output from containers",
        examples: [
          "docker compose logs",
          "docker compose logs -f react-dev",
          "docker compose logs react-prod",
          "docker compose logs react-test",
        ],
      },
      {
        title: "Execute command",
        command: "docker compose exec <service> <command>",
        description: "Execute a command in a running service",
        examples: [
          "docker compose exec react-dev npm test",
          "docker compose exec react-dev sh",
          "docker compose exec react-dev npm run lint",
        ],
      },
      {
        title: "Build services",
        command: "docker compose build [options] [service]",
        description: "Build or rebuild services",
        examples: [
          "docker compose build react-dev",
          "docker compose build react-prod --no-cache",
          "docker compose build react-test",
        ],
      },
      {
        title: "List services",
        command: "docker compose ps",
        description: "List containers for services",
        examples: ["docker compose ps"],
      },
    ],
  },
];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/kristiyan-velkov-763130b3/",
  medium: "https://medium.com/@kristiyanvelkov",
  newsletter: "https://frontendworld.substack.com/",
  github: "https://github.com/kristiyan-velkov/docker-reactjs-workshop",
  githubSponsors: "https://github.com/sponsors/kristiyan-velkov",
  donate: "https://donate.stripe.com/eVq4gz9dKex71ZW68L3F600",
  documentation: "https://docs.docker.com/guides/reactjs/",
} as const;
