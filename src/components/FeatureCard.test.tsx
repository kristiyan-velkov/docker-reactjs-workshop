import { render, screen } from "@testing-library/react";
import { FeatureCard } from "./index";
import type { Feature } from "../types";

describe("FeatureCard Component", () => {
  const mockFeature: Feature = {
    icon: "🐳",
    title: "Docker Containerization",
    description: "Seamlessly package your React app with Docker",
  };

  it("renders without crashing", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.getByText(mockFeature.title)).toBeInTheDocument();
  });

  it("renders the feature icon", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.getByText(mockFeature.icon)).toBeInTheDocument();
  });

  it("renders the feature title", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    const title = screen.getByText(mockFeature.title);
    expect(title.tagName).toBe("H3");
  });

  it("renders the feature description", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.getByText(mockFeature.description)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(
      <FeatureCard feature={mockFeature} index={0} />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("rounded-2xl");
    expect(card).toHaveClass("p-6");
  });

  it("applies featured styling when featured is true", () => {
    const { container } = render(
      <FeatureCard feature={mockFeature} index={0} featured />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("bg-zinc-900");
  });

  it("renders with different feature data", () => {
    const anotherFeature: Feature = {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built with Vite for instant HMR",
    };
    render(<FeatureCard feature={anotherFeature} index={1} />);
    expect(screen.getByText(anotherFeature.title)).toBeInTheDocument();
  });
});
