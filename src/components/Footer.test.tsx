import { render, screen } from "@testing-library/react";
import { SOCIAL_LINKS } from "../constants/data";
import { Footer } from "./index";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText(/React.js Advanced Workshop/i)).toBeInTheDocument();
  });

  it("renders the LinkedIn link correctly", () => {
    render(<Footer />);
    const linkedinLink = screen.getByText("Kristiyan Velkov");
    expect(linkedinLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.linkedin);
    expect(linkedinLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(linkedinLink.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the X link", () => {
    render(<Footer />);
    const xLink = screen.getByText("@krisvelkov");
    expect(xLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.x);
    expect(xLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the Newsletter link", () => {
    render(<Footer />);
    const newsletterLink = screen.getByText("Newsletter");
    expect(newsletterLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.newsletter);
  });

  it("renders the Medium blog link", () => {
    render(<Footer />);
    const mediumLink = screen.getByText("Medium");
    expect(mediumLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.medium);
  });

  it("renders the GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByText("GitHub");
    expect(githubLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.github);
  });

  it("renders the license line", () => {
    render(<Footer />);
    expect(screen.getByText(/Docker & React.js · MIT License/i)).toBeInTheDocument();
  });

  it("applies correct CSS classes to footer", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("bg-zinc-50");
    expect(footer).toHaveClass("border-t");
  });

  it("all external links have correct attributes", () => {
    const { container } = render(<Footer />);
    const links = container.querySelectorAll('a[target="_blank"]');
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
