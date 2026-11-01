import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import UserDetailPage from "../pages/UserDetailPage";
import { getUserById } from "../api/usersApi";
import type { User } from "../types/user";
import { mockUser } from "./mockUser";

jest.mock("../api/usersApi", function () {
  return {
    getUserById: jest.fn(),
  };
});

const mockedGetUserById = getUserById as jest.MockedFunction<
  typeof getUserById
>;

function renderDetailPage(path: string = "/users/1") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/users" element={<UserDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(function () {
  jest.clearAllMocks();
});

test("shows loading state", function () {
  mockedGetUserById.mockImplementation(function () {
    return new Promise<User>(function () {});
  });

  renderDetailPage();

  expect(screen.getByText("Loading users...")).toBeInTheDocument();
});

test("displays user details successfully", async function () {
  mockedGetUserById.mockResolvedValue(mockUser);

  renderDetailPage();

  expect(
    await screen.findByRole("heading", { name: "Test User" })
  ).toBeInTheDocument();

  expect(screen.getByText("test@example.com")).toBeInTheDocument();
  expect(screen.getByText("Bangalore")).toBeInTheDocument();
  expect(screen.getByText("Test Company")).toBeInTheDocument();

  expect(mockedGetUserById).toHaveBeenCalledWith("1");
});

test("displays error when API fails", async function () {
  mockedGetUserById.mockRejectedValue(new Error("Failed to fetch user"));

  renderDetailPage();

  expect(await screen.findByText("Failed to fetch user")).toBeInTheDocument();

  expect(screen.getByText("Try Again")).toBeInTheDocument();
});

test("retries fetching user details", async function () {
  mockedGetUserById
    .mockRejectedValueOnce(new Error("Network failed"))
    .mockResolvedValueOnce(mockUser);

  renderDetailPage();

  expect(await screen.findByText("Network failed")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Try Again"));

  expect(
    await screen.findByRole("heading", { name: "Test User" })
  ).toBeInTheDocument();

  expect(mockedGetUserById).toHaveBeenCalledTimes(2);
});

test("handles missing user ID", async function () {
  renderDetailPage("/users");

  expect(
    await screen.findByText("User ID is missing.")
  ).toBeInTheDocument();
});
test("displays back to users link", async function () {
  mockedGetUserById.mockResolvedValue(mockUser);

  renderDetailPage();

  expect(
    await screen.findByRole("link", { name: /Back to Users/ })
  ).toHaveAttribute("href", "/");
});
