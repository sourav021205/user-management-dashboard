import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import UserListPage from "../pages/UserListPage";
import { getUsers } from "../api/usersApi";
import { mockUser } from "./mockUser";

jest.mock("../api/usersApi", function () {
  return {
    getUsers: jest.fn(),
    getUserById: jest.fn(),
  };
});

const mockedGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;

afterEach(function () {
  jest.clearAllMocks();
});

test("shows loading state", function () {
  mockedGetUsers.mockReturnValue(new Promise(function () {}));

  render(
    <MemoryRouter>
      <UserListPage />
    </MemoryRouter>
  );

  expect(screen.getByText("Loading users...")).toBeInTheDocument();
});

test("displays users after successful fetching", async function () {
  mockedGetUsers.mockResolvedValue([mockUser]);

  render(
    <MemoryRouter>
      <UserListPage />
    </MemoryRouter>
  );

  expect(await screen.findByText("Test User")).toBeInTheDocument();
});

test("displays error when API fails", async function () {
  mockedGetUsers.mockRejectedValue(new Error("Network failed"));

  render(
    <MemoryRouter>
      <UserListPage />
    </MemoryRouter>
  );

  expect(await screen.findByText("Network failed")).toBeInTheDocument();

  expect(screen.getByText("Try Again")).toBeInTheDocument();
});

test("displays empty state when no users are returned", async function () {
  mockedGetUsers.mockResolvedValue([]);

  render(
    <MemoryRouter>
      <UserListPage />
    </MemoryRouter>
  );

  expect(await screen.findByText("No users found")).toBeInTheDocument();
});
