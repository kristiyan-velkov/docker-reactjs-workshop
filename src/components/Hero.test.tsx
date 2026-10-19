import { render, screen } from "@testing-library/react";
import { Hero } from "./index";

describe("Hero Component", () => {
  it("renders without crashing", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: /Containerize React.js/i })
    ).toBeInTheDocument();
  });

  it("renders the React logo in the preview", () => {
    const { container } = render(<Hero />);
    const reactLogo = container.querySelector('img[src*="react"]');
    expect(reactLogo).toBeInTheDocument();
  });

  it("renders the Docker emoji", () => {
    render(<Hero />);
    expect(screen.getByText("🐳")).toBeInTheDocument();
  });

  it("renders the main heading with gradient emphasis", () => {
    render(<Hero />);
    expect(screen.getByText(/from zero to production/i)).toBeInTheDocument();
  });

  it("renders the description paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Step-by-step tasks, timers, and Docker references/i)
    ).toBeInTheDocument();
  });

  it("renders the Docker guide link with correct href", () => {
    render(<Hero />);
    const docButton = screen.getByText("Docker React guide");
    expect(docButton.closest("a")).toHaveAttribute(
      "href",
      "https://docs.docker.com/guides/reactjs/"
    );
    expect(docButton.closest("a")).toHaveAttribute("target", "_blank");
    expect(docButton.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the start workshop anchor", () => {
    render(<Hero />);
    const startButton = screen.getByText("Start workshop");
    expect(startButton.closest("a")).toHaveAttribute("href", "#materials");
  });

  it("applies correct CSS classes to the hero section", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("min-h-[90vh]");
    expect(section).toHaveClass("bg-zinc-950");
  });

  it("renders workshop stats", () => {
    render(<Hero />);
    expect(screen.getByText("Interactive tasks")).toBeInTheDocument();
    expect(screen.getByText("Deploy ready")).toBeInTheDocument();
  });
});
