import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    const workshopTexts = screen.getAllByText(/React.js Advanced Workshop/i);
    expect(workshopTexts.length).toBeGreaterThan(0);
  });

  it("renders all major sections", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Containerize React.js/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/Workshop materials/i)).toBeInTheDocument();

    expect(screen.getByText(/Kristiyan Velkov/i)).toBeInTheDocument();
  });

  it("renders the main container with correct classes", () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector(".min-h-screen");
    expect(mainDiv).toBeInTheDocument();
  });
});
