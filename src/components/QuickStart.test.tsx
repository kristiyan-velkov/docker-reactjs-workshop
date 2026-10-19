import { render, screen, fireEvent } from "@testing-library/react";
import { QuickStart } from "./index";

describe("QuickStart Component", () => {
  it("renders without crashing", () => {
    render(<QuickStart />);
    expect(screen.getByText(/Workshop materials/i)).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<QuickStart />);
    const heading = screen.getByText(/Workshop materials/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("renders all tab buttons", () => {
    render(<QuickStart />);
    expect(screen.getAllByText("Workshop Tasks").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Docker Concepts").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Commands Reference").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Project Overview").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Quick Commands").length).toBeGreaterThan(0);
  });

  it("shows Workshop Tasks tab by default", () => {
    render(<QuickStart />);
    // Workshop Tasks tab should be active by default
    expect(screen.getByText(/Workshop Challenge/i)).toBeInTheDocument();
    expect(screen.getByText(/Get the Sample Application/i)).toBeInTheDocument();
  });

  it("switches to Commands Reference tab when clicked", () => {
    render(<QuickStart />);
    fireEvent.click(screen.getAllByText("Commands Reference")[0]);
    
    // Check if Commands Reference content is displayed
    expect(screen.getByText(/Image Commands/i)).toBeInTheDocument();
  });

  it("switches to Project Overview tab when clicked", () => {
    render(<QuickStart />);
    fireEvent.click(screen.getAllByText("Project Overview")[0]);
    
    // Check if Overview content is displayed
    expect(screen.getByText(/Docker Files/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
  });

  it("switches to Quick Commands tab when clicked", () => {
    render(<QuickStart />);
    fireEvent.click(screen.getAllByText("Quick Commands")[0]);
    
    // Check if Quick Commands content is displayed - use getAllByText since there might be multiple matches
    const devServerTexts = screen.getAllByText(/Start Development Server/i);
    expect(devServerTexts.length).toBeGreaterThan(0);
  });

  it("applies active styles to the Workshop Tasks button by default", () => {
    render(<QuickStart />);
    const tasksButtons = screen.getAllByText("Workshop Tasks");
    const activeButton = tasksButtons.find(
      (btn) =>
        btn.className.includes("tab-pill-active") ||
        btn.className.includes("tab-sidebar-active")
    );
    expect(activeButton).toBeTruthy();
  });

  it("applies active styles to the clicked tab button", () => {
    render(<QuickStart />);
    const commandsRefButtons = screen.getAllByText("Commands Reference");
    fireEvent.click(commandsRefButtons[0]);

    const activeButton = screen
      .getAllByText("Commands Reference")
      .find(
        (btn) =>
          btn.className.includes("tab-pill-active") ||
          btn.className.includes("tab-sidebar-active")
      );
    expect(activeButton).toBeTruthy();
  });

  it("applies correct CSS classes to section", () => {
    const { container } = render(<QuickStart />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-24");
    expect(section).toHaveClass("px-6");
    expect(section).toHaveClass("bg-white");
  });
});

