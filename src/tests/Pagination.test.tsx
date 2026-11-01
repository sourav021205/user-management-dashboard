import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

test("displays current page", function () {
  render(
    <Pagination currentPage={1} totalPages={2} onPageChange={function () {}} />
  );

  expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
});

test("calls next page handler", function () {
  const handlePage = jest.fn();

  render(
    <Pagination currentPage={1} totalPages={2} onPageChange={handlePage} />
  );

  fireEvent.click(screen.getByText("Next"));

  expect(handlePage).toHaveBeenCalledWith(2);
});

test("disables previous button on first page", function () {
  render(
    <Pagination currentPage={1} totalPages={2} onPageChange={function () {}} />
  );

  expect(screen.getByText("Previous")).toBeDisabled();
});

test("calls previous page handler", function () {
  const handlePage = jest.fn();

  render(
    <Pagination
      currentPage={2}
      totalPages={2}
      onPageChange={handlePage}
    />
  );

  fireEvent.click(screen.getByText("Previous"));

  expect(handlePage).toHaveBeenCalledWith(1);
});

test("disables next button on last page", function () {
  render(
    <Pagination
      currentPage={2}
      totalPages={2}
      onPageChange={function () {}}
    />
  );

  expect(screen.getByText("Next")).toBeDisabled();
});