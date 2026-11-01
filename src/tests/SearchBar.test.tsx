import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("displays search input", function () {
  render(<SearchBar searchTerm="" onSearchChange={function () {}} />);

  expect(
    screen.getByRole("textbox", { name: /search users/i })
  ).toBeInTheDocument();
});

test("calls search handler when typing", function () {
  const handleSearch = jest.fn();

  render(<SearchBar searchTerm="" onSearchChange={handleSearch} />);

  fireEvent.change(screen.getByRole("textbox", { name: /search users/i }), {
    target: { value: "Leanne" },
  });

  expect(handleSearch).toHaveBeenCalledWith("Leanne");
});

