
import { render, screen } from "@testing-library/react";
import AppRoutes from "../routes/AppRoutes";

import { getUsers, getUserById } from "../api/usersApi";
import { mockUser } from "./mockUser";

jest.mock("../api/usersApi", function () {
  return {
    getUsers: jest.fn(),
    getUserById: jest.fn()
  };
});

const mockedGetUsers = getUsers as jest.MockedFunction<
  typeof getUsers
>;

const mockedGetUserById = getUserById as jest.MockedFunction<
  typeof getUserById
>;

beforeEach(function () {
  window.history.pushState({}, "", "/");

  mockedGetUsers.mockResolvedValue([]);
  mockedGetUserById.mockResolvedValue(mockUser);
});

afterEach(function () {
  jest.clearAllMocks();
});

test("renders user listing route", async function () {
  render(<AppRoutes />);

  expect(
    await screen.findByText("No users found")
  ).toBeInTheDocument();
});

test("renders user detail route", async function () {
  window.history.pushState({}, "", "/users/1");

  render(<AppRoutes />);

  expect(
    await screen.findByRole("heading", { name: "Test User" })
  ).toBeInTheDocument();
});

test("redirects unknown routes to dashboard", async function () {
  window.history.pushState({}, "", "/unknown");

  render(<AppRoutes />);

  expect(
    await screen.findByText("No users found")
  ).toBeInTheDocument();
});
