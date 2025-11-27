import { render, screen, fireEvent } from "@testing-library/react";
import { QuickStart } from "./index";

describe("QuickStart Component", () => {
  it("renders without crashing", () => {
    render(<QuickStart />);
    expect(screen.getByText(/Workshop Materials/i)).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<QuickStart />);
    const heading = screen.getByText(/Workshop Materials/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("renders all tab buttons", () => {
    render(<QuickStart />);
    expect(screen.getByText("Workshop Tasks")).toBeInTheDocument();
    expect(screen.getByText("Docker Concepts")).toBeInTheDocument();
    expect(screen.getByText("Commands Reference")).toBeInTheDocument();
    expect(screen.getByText("Project Overview")).toBeInTheDocument();
    expect(screen.getByText("Quick Commands")).toBeInTheDocument();
  });

  it("shows Workshop Tasks tab by default", () => {
    render(<QuickStart />);
    // Workshop Tasks tab should be active by default
    expect(screen.getByText(/Workshop Challenge/i)).toBeInTheDocument();
    expect(screen.getByText(/Get the Sample Application/i)).toBeInTheDocument();
  });

  it("switches to Commands Reference tab when clicked", () => {
    render(<QuickStart />);
    const commandsRefButton = screen.getByText("Commands Reference");
    fireEvent.click(commandsRefButton);
    
    // Check if Commands Reference content is displayed
    expect(screen.getByText(/Image Commands/i)).toBeInTheDocument();
  });

  it("switches to Project Overview tab when clicked", () => {
    render(<QuickStart />);
    const overviewButton = screen.getByText("Project Overview");
    fireEvent.click(overviewButton);
    
    // Check if Overview content is displayed
    expect(screen.getByText(/Docker Files/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
  });

  it("switches to Quick Commands tab when clicked", () => {
    render(<QuickStart />);
    const quickCommandsButton = screen.getByText("Quick Commands");
    fireEvent.click(quickCommandsButton);
    
    // Check if Quick Commands content is displayed - use getAllByText since there might be multiple matches
    const devServerTexts = screen.getAllByText(/Start Development Server/i);
    expect(devServerTexts.length).toBeGreaterThan(0);
  });

  it("applies active styles to the Workshop Tasks button by default", () => {
    render(<QuickStart />);
    const tasksButton = screen.getByText("Workshop Tasks");
    expect(tasksButton).toHaveClass("bg-gradient-to-br");
  });

  it("applies active styles to the clicked tab button", () => {
    render(<QuickStart />);
    const commandsRefButton = screen.getByText("Commands Reference");
    fireEvent.click(commandsRefButton);
    
    expect(commandsRefButton.className).toContain("bg-gradient-to-br");
  });

  it("applies correct CSS classes to section", () => {
    const { container } = render(<QuickStart />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-24");
    expect(section).toHaveClass("px-8");
    expect(section).toHaveClass("bg-white");
  });
});

