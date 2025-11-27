import { render, screen } from "@testing-library/react";
import { OverviewTab } from "./index";

describe("OverviewTab Component", () => {
  it("renders without crashing", () => {
    render(<OverviewTab />);
    expect(screen.getByText(/Docker Files/i)).toBeInTheDocument();
  });

  it("renders Docker Files section", () => {
    render(<OverviewTab />);
    expect(screen.getByText(/🎯 Docker Files/i)).toBeInTheDocument();
    expect(screen.getByText(/Dockerfile.dev/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-stage production build with Nginx/i)).toBeInTheDocument();
  });

  it("renders all Docker file items", () => {
    render(<OverviewTab />);
    // Use getAllByText for Dockerfile since it appears multiple times
    const dockerfiles = screen.getAllByText(/Dockerfile/i);
    expect(dockerfiles.length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText(/Dockerfile.dev/i)).toBeInTheDocument();
    expect(screen.getByText(/Dockerfile.serve/i)).toBeInTheDocument();
    expect(screen.getByText(/compose.yaml/i)).toBeInTheDocument();
    // Use getAllByText for nginx.conf since it might appear multiple times
    const nginxConfs = screen.getAllByText(/nginx.conf/i);
    expect(nginxConfs.length).toBeGreaterThan(0);
  });

  it("renders Tech Stack section", () => {
    render(<OverviewTab />);
    expect(screen.getByText(/🔧 Tech Stack/i)).toBeInTheDocument();
  });

  it("renders all tech stack items", () => {
    render(<OverviewTab />);
    expect(screen.getByText(/React 19 with TypeScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Vite for blazing fast builds/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js 24.11.1 Alpine/i)).toBeInTheDocument();
    expect(screen.getByText(/Nginx Unprivileged/i)).toBeInTheDocument();
    expect(screen.getByText(/ESLint & Vitest for quality/i)).toBeInTheDocument();
  });

  it("renders content in grid layout", () => {
    const { container } = render(<OverviewTab />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
  });

  it("applies correct CSS classes to content boxes", () => {
    const { container } = render(<OverviewTab />);
    const contentBoxes = container.querySelectorAll(".bg-gray-50.p-8");
    expect(contentBoxes.length).toBe(2);
    contentBoxes.forEach((box) => {
      expect(box).toHaveClass("rounded-2xl");
      expect(box).toHaveClass("border-l-4");
    });
  });

  it("renders list items with proper styling", () => {
    const { container } = render(<OverviewTab />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBeGreaterThan(0);
    listItems.forEach((item) => {
      expect(item).toHaveClass("text-gray-700");
    });
  });
});

