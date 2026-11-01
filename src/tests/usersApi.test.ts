import { getUsers, getUserById } from "../api/usersApi";
import { mockUser } from "./mockUser";

const fetchMock = jest.fn();

beforeEach(function () {
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(function () {
  fetchMock.mockReset();
});

test("fetches all users successfully", async function () {
  fetchMock.mockResolvedValue({
    ok: true,
    json: async function () {
      return [mockUser];
    },
  } as Response);

  const result = await getUsers();

  expect(result).toHaveLength(1);
  expect(result[0].name).toBe("Test User");
});

test("handles API failure", async function () {
  fetchMock.mockResolvedValue({
    ok: false,
  } as Response);

  await expect(getUsers()).rejects.toThrow("Failed to fetch users");
});

test("fetches one user by ID", async function () {
  fetchMock.mockResolvedValue({
    ok: true,
    json: async function () {
      return mockUser;
    },
  } as Response);

  const result = await getUserById("1");

  expect(result.id).toBe(1);
  expect(result.name).toBe("Test User");
});
