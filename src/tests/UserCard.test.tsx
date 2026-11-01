import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserCard from "../components/UserCard";
import { mockUser } from "./mockUser";

test("displays user information", function () {
  render(
    <MemoryRouter>
      <UserCard
        user={mockUser}
        isFavorite={false}
        onToggleFavorite={function () {}}
      />
    </MemoryRouter>
  );

  expect(screen.getByText("Test User")).toBeInTheDocument();
  expect(screen.getByText("test@example.com")).toBeInTheDocument();
  expect(screen.getByText("Test Company")).toBeInTheDocument();
  expect(screen.getByText("Bangalore")).toBeInTheDocument();
});

test("shows the favorite state", function () {
  render(
    <MemoryRouter>
      <UserCard
        user={mockUser}
        isFavorite={true}
        onToggleFavorite={function () {}}
      />
    </MemoryRouter>
  );

  expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
});

test("calls favorite handler when clicked", function () {
  const handleFavorite = jest.fn();

  render(
    <MemoryRouter>
      <UserCard
        user={mockUser}
        isFavorite={false}
        onToggleFavorite={handleFavorite}
      />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByLabelText("Add to favorites"));

  expect(handleFavorite).toHaveBeenCalledWith(1);
});
