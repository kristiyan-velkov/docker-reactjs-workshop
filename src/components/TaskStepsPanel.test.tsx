import { render, screen } from "@testing-library/react";
import { TaskStepsPanel } from "./TaskStepsPanel";

describe("TaskStepsPanel", () => {
  const steps = [
    {
      number: 1,
      title: "Install dependencies",
      description: "Run npm install in the project root.",
      tips: ["Use npm ci in CI"],
      code: "npm install",
    },
    {
      number: 2,
      title: "Start dev server",
      description: "Launch Vite for local development.",
    },
  ];

  it("renders step titles and timeline label", () => {
    render(<TaskStepsPanel steps={steps} />);
    expect(screen.getByText(/Step-by-step \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText("Install dependencies")).toBeInTheDocument();
    expect(screen.getByText("Start dev server")).toBeInTheDocument();
  });

  it("renders code block and tips", () => {
    render(<TaskStepsPanel steps={steps} />);
    expect(screen.getByText("npm install")).toBeInTheDocument();
    expect(screen.getByText("Use npm ci in CI")).toBeInTheDocument();
  });
});
