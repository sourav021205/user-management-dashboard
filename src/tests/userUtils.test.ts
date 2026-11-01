import { filterUsers } from "../utils/filterUsers";
import { sortUsers } from "../utils/sortUsers";
import { paginateUsers } from "../utils/paginateUsers";
import { mockUser } from "./mockUser";
import type { User } from "../types/user";

const secondUser: User = {
  ...mockUser,
  id: 2,
  name: "Zara",
  username: "zara",
  email: "zara@example.com",
  address: {
    ...mockUser.address,
    city: "Chennai",
  },
  company: {
    ...mockUser.company,
    name: "Other Company",
  },
};

test("searches users by name", function () {
  const result = filterUsers([mockUser, secondUser], "test user", "All", "All");

  expect(result).toHaveLength(1);
  expect(result[0].name).toBe("Test User");
});

test("filters users by city", function () {
  const result = filterUsers([mockUser, secondUser], "", "Bangalore", "All");

  expect(result).toHaveLength(1);
  expect(result[0].address.city).toBe("Bangalore");
});

test("filters users by company", function () {
  const result = filterUsers(
    [mockUser, secondUser],
    "",
    "All",
    "Other Company"
  );

  expect(result).toHaveLength(1);
  expect(result[0].company.name).toBe("Other Company");
});

test("sorts users in ascending order", function () {
  const result = sortUsers([secondUser, mockUser], "name", "asc");

  expect(result[0].name).toBe("Test User");
});

test("sorts users in descending order", function () {
  const result = sortUsers([mockUser, secondUser], "name", "desc");

  expect(result[0].name).toBe("Zara");
});

test("displays five users per page", function () {
  const users = Array.from({ length: 10 }, function (_, index) {
    return {
      ...mockUser,
      id: index + 1,
    };
  });

  const result = paginateUsers(users, 1, 5);

  expect(result).toHaveLength(5);
  expect(result[0].id).toBe(1);
});

test("returns the second page", function () {
  const users = Array.from({ length: 10 }, function (_, index) {
    return {
      ...mockUser,
      id: index + 1,
    };
  });

  const result = paginateUsers(users, 2, 5);

  expect(result).toHaveLength(5);
  expect(result[0].id).toBe(6);
});
