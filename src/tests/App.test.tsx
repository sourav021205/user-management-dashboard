
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { getUsers } from "../api/usersApi";

jest.mock("../api/usersApi", function () {
  return {
    getUsers: jest.fn(),
    getUserById: jest.fn()
  };
});

const mockedGetUsers = getUsers as jest.MockedFunction<
  typeof getUsers
>;

beforeEach(function () {
  localStorage.clear();
  mockedGetUsers.mockResolvedValue([]);
});

test("renders dashboard header and footer", async function () {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: "User Management Dashboard"
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText("Manage and explore your users")
  ).toBeInTheDocument();

  expect(
    screen.getByRole("contentinfo")
  ).toHaveTextContent("User Management Dashboard");

  await screen.findByText("No users found");
});

test("changes from light mode to dark mode", async function () {
  const { container } = render(<App />);

  const app = container.firstChild as HTMLElement;

  fireEvent.click(
    screen.getByRole("button", { name: /dark mode/i })
  );

  expect(app).toHaveClass("dark-mode");

  expect(
    localStorage.getItem("dashboard-theme")
  ).toBe("dark");

  await screen.findByText("No users found");
});

test("changes from dark mode to light mode", async function () {
  localStorage.setItem("dashboard-theme", "dark");

  const { container } = render(<App />);

  const app = container.firstChild as HTMLElement;

  fireEvent.click(
    screen.getByRole("button", { name: /light mode/i })
  );

  expect(app).not.toHaveClass("dark-mode");

  expect(
    localStorage.getItem("dashboard-theme")
  ).toBe("light");

  await screen.findByText("No users found");
});

test("loads saved dark theme", async function () {
  localStorage.setItem("dashboard-theme", "dark");

  render(<App />);

  expect(
    screen.getByRole("button", { name: /light mode/i })
  ).toBeInTheDocument();

  await screen.findByText("No users found");
});
