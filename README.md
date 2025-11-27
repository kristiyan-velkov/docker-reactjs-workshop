# ⚛️ React.js Advanced Workshop - 4 Hours • London

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.5-646CFF.svg)](https://vitejs.dev/)

An intensive **4-hour advanced React.js workshop** designed for developers in London who want to master modern React patterns, performance optimization, and Docker containerization. This hands-on workshop covers advanced React concepts, production-ready patterns, and deployment strategies.

This repository contains all the materials, code examples, and exercises for the **React.js Advanced Workshop** held in London.

## 🚀 Demo

<div align="center">
  <img src="./images/demo.png" alt="React.js Docker Sample Application Demo" width="800" />
</div>

## 🎯 Workshop Objectives

By the end of this 4-hour workshop, you will:

- ⚛️ **Master Advanced React Patterns** - Hooks, Context API, and React 19 features
- 🐳 **Understand Docker Containerization** - Multi-stage builds and Docker Compose
- ⚡ **Optimize Performance** - Code splitting, lazy loading, and memoization
- 🔒 **Implement Security Best Practices** - Secure builds and vulnerability scanning
- 🚀 **Deploy to Production** - CI/CD pipelines and Kubernetes basics
- 📚 **Build Real-World Applications** - Hands-on exercises and practical scenarios

## ✨ Workshop Features

- 🔥 **Modern React 19** with TypeScript
- ⚡ **Vite** for lightning-fast development
- 🎨 **Tailwind CSS** for utility-first styling
- 🐳 **Multi-stage Docker builds** for optimized production images
- 🔧 **Development & Production** Docker configurations
- 🧪 **Testing setup** with Vitest and Testing Library
- 📦 **Docker Compose** for easy orchestration
- ☸️ **Kubernetes deployment** configuration
- 🔒 **Security-focused** with vulnerability scanning
- 📋 **ESLint** for code quality

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes (optional)
- **Web Server**: Nginx (production)

## 📋 Prerequisites

- [Docker](https://www.docker.com/get-started) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Node.js](https://nodejs.org/) (v24+) - for local development
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) - for local development

## 📅 Workshop Schedule (4 Hours)

### Hour 1: Advanced React Fundamentals
- React 19 new features and patterns
- Advanced hooks and custom hooks
- Context API and state management
- Performance optimization basics

### Hour 2: React Performance & Optimization
- Code splitting and lazy loading
- Memoization techniques (useMemo, useCallback)
- React.memo and optimization patterns
- Bundle analysis and optimization

### Hour 3: Docker & Containerization
- Docker fundamentals for React apps
- Multi-stage builds
- Docker Compose setup
- Development vs Production workflows

### Hour 4: Production Deployment
- Security best practices
- CI/CD pipeline basics
- Kubernetes introduction
- Real-world deployment scenarios

## 🚀 Getting Started

### Prerequisites

Before attending the workshop, please ensure you have:

- [Docker](https://www.docker.com/get-started) (v20.10+) installed
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+) installed
- [Node.js](https://nodejs.org/) (v24+) installed
- A code editor (VS Code recommended)
- Git installed

### Workshop Setup

1. **Clone the repository**

   ```bash
   git clone git@github-private.com:kristiyan-velkov/docker-reactjs-workshop.git
   cd docker-reactjs-workshop
   ```

2. **Development with Docker Compose**

   ```bash
   docker compose up react-dev --build
   ```

   Access the app at [http://localhost:5173](http://localhost:5173)

3. **Production build**
   ```bash
   docker compose up react-prod --build
   ```
   Access the app at [http://localhost:8080](http://localhost:8080)

4. **Run tests**
   ```bash
   docker compose up react-test
   ```

5. **Run linter**
   ```bash
   docker compose up react-lint
   ```

### Local Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Run tests**

   ```bash
   npm test
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🐳 Docker Commands

### Development

```bash
# Build development image
docker build -f Dockerfile.dev -t docker-reactjs-sample-dev .

# Run development container
docker run -p 5173:5173 docker-reactjs-sample-dev

# Using Docker Compose (recommended)
docker compose up react-dev --build
```

### Production

```bash
# Build production image (Nginx)
docker build -f Dockerfile -t docker-reactjs-sample .

# Run production container (Nginx on port 8080)
docker run -p 8080:8080 docker-reactjs-sample

# Build alternative production image (Node.js serve)
docker build -f Dockerfile.serve -t docker-reactjs-sample-serve .

# Run production container (serve on port 8080)
docker run -p 8080:8080 docker-reactjs-sample-serve

# Using Docker Compose (recommended)
docker compose up react-prod --build
```

### Testing & Linting

```bash
# Run tests
docker compose up react-test

# Run linter
docker compose up react-lint
```

## 🔧 Docker Services

The `compose.yaml` file defines 4 services:

- **react-prod** - Production build with Nginx (port 8080)
- **react-dev** - Development server with Vite hot reload (port 5173)
- **react-test** - Test runner service
- **react-lint** - Linter service

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/                   # Source code
│   ├── components/        # React components
│   ├── constants/         # Data constants
│   ├── types/             # TypeScript types
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── images/               # Documentation images
├── Dockerfile            # Production Docker configuration (Nginx)
├── Dockerfile.dev        # Development Docker configuration (Vite)
├── Dockerfile.serve       # Alternative production Docker configuration (Node.js serve)
├── compose.yaml          # Docker Compose configuration (4 services)
├── nginx.conf           # Nginx configuration for production
├── .dockerignore        # Docker ignore patterns
└── package.json         # Project dependencies
```

## 🧪 Testing

Run the test suite:

```bash
# Local testing
npm run test

# Testing in Docker
docker compose up react-test

# Or execute tests in running dev container
docker compose exec react-dev npm run test
```

## 🛡️ Security

This Docker image has been thoroughly scanned for vulnerabilities using Docker Scout and other security tools. The image passes all vulnerability assessments and follows security best practices:

- Non-root user execution
- Minimal base images (Alpine Linux)
- Regular dependency updates
- Security-focused Nginx configuration

<div align="center">
  <img src="./images/react-js-security.png" alt="Docker Scout Security Scan Results" width="600" />
</div>

## 🔧 Configuration

### Environment Variables

| Variable   | Description      | Default       |
| ---------- | ---------------- | ------------- |
| `NODE_ENV` | Environment mode | `development` |

**Note:** Ports are configured in Dockerfiles:
- Development: `5173` (Vite default)
- Production: `8080` (Nginx/Node.js serve)

### Docker Compose Override

Create a `compose.override.yaml` file for local customizations:

```yaml
services:
  app:
    ports:
      - "3001:3000" # Use different port
    environment:
      - CUSTOM_VAR=value
```

## 📚 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |
| `npm test`        | Run tests                |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Workshop Instructor

**Kristiyan Velkov**

- LinkedIn: [kristiyan-velkov](https://www.linkedin.com/in/kristiyan-velkov-763130b3/)
- Medium: [@kristiyanvelkov](https://medium.com/@kristiyanvelkov)
- Newsletter: [Front-end World](https://kristiyanvelkov.substack.com)

## 📍 Workshop Location

**London, UK**

This workshop is designed for developers in the London area. All materials and exercises are tailored for a 4-hour intensive learning experience.

## ☕ Support

If you find this project helpful, consider supporting my work:

- [GitHub Sponsors](https://github.com/sponsors/kristiyan-velkov)
- [Buy Me a Coffee](https://www.buymeacoffee.com/kristiyanvelkov)
- [Revolut](https://revolut.me/kristiyanvelkov)

Your support helps me continue creating valuable content for the community! 🚀

## 🔗 Related Resources

- [Docker Documentation](https://docs.docker.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Docker React.js Guide](https://docs.docker.com/guides/reactjs/)
