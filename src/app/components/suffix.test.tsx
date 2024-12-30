import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Suffix } from "./suffix";

describe("Suffix Test Suite", () => {
  it("Suffix Test", () => {
    render(<Suffix />);

    const h3 = screen.getByText("Data Input");
    expect(h3).toBeInTheDocument();

    const imgWrapper = screen.getByTestId("codeit-img-wrapper");
    expect(imgWrapper).toBeInTheDocument();

    const imgRole = screen.getByRole("img");
    expect(imgRole).toBeInTheDocument();

    const imgAltText = screen.getByAltText(/codeit-img/i);
    expect(imgAltText).toBeInTheDocument();

    const inputByLabel = screen.getByLabelText("email");
    expect(inputByLabel).toBeInTheDocument();

    const inputByDisplayValue = screen.getByDisplayValue("hello");
    expect(inputByDisplayValue).toBeInTheDocument();

    const inputByPlaceholder = screen.getByPlaceholderText(/type/i);
    expect(inputByPlaceholder).toBeInTheDocument();

    const buttonByTitle = screen.getByTitle(/click/i);
    expect(buttonByTitle).toBeInTheDocument();

    const button = document.querySelector("form button");
    expect(button).toHaveTextContent("submit");
  });
});
