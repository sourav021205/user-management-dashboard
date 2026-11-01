import { render, screen, fireEvent } from "@testing-library/react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterBar from "../components/FilterBar";
import SortControls from "../components/SortControls";

test("displays dashboard header", function () {
  render(<Header darkMode={false} onToggleTheme={function () {}} />);

  expect(screen.getByText("User Management Dashboard")).toBeInTheDocument();
});

test("toggles theme button", function () {
  const handleToggle = jest.fn();

  render(<Header darkMode={false} onToggleTheme={handleToggle} />);

  fireEvent.click(screen.getByRole("button", { name: /dark mode/i }));

  expect(handleToggle).toHaveBeenCalled();
});

test("displays footer", function () {
  render(<Footer />);

  expect(screen.getByText(/User Management Dashboard/)).toBeInTheDocument();
});

test("changes city filter", function () {
  const handleCity = jest.fn();

  render(
    <FilterBar
      cities={["Bangalore", "Chennai"]}
      companies={["Google", "Microsoft"]}
      cityFilter="All"
      companyFilter="All"
      onCityChange={handleCity}
      onCompanyChange={jest.fn()}
    />
  );

  fireEvent.change(screen.getByLabelText("City"), {
    target: { value: "Bangalore" },
  });

  expect(handleCity).toHaveBeenCalledWith("Bangalore");
});

test("changes company filter", function () {
  const handleCompany = jest.fn();

  render(
    <FilterBar
      cities={["Bangalore", "Chennai"]}
      companies={["Google", "Microsoft"]}
      cityFilter="All"
      companyFilter="All"
      onCityChange={jest.fn()}
      onCompanyChange={handleCompany}
    />
  );

  fireEvent.change(screen.getByLabelText("Company"), {
    target: { value: "Microsoft" },
  });

  expect(handleCompany).toHaveBeenCalledWith("Microsoft");
});

test("changes sorting field", function () {
  const handleField = jest.fn();

  render(
    <SortControls
      sortField="name"
      sortDirection="asc"
      onFieldChange={handleField}
      onDirectionChange={jest.fn()}
    />
  );

  fireEvent.change(screen.getByLabelText("Sort By"), {
    target: { value: "email" },
  });

  expect(handleField).toHaveBeenCalledWith("email");
});

test("changes sorting direction", function () {
  const handleDirection = jest.fn();

  render(
    <SortControls
      sortField="name"
      sortDirection="asc"
      onFieldChange={jest.fn()}
      onDirectionChange={handleDirection}
    />
  );

  fireEvent.change(screen.getByLabelText("Order"), {
    target: { value: "desc" },
  });

  expect(handleDirection).toHaveBeenCalledWith("desc");
});
