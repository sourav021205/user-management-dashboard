import type { User } from "../types/user";

export type SortField = "name" | "username" | "email";

export function sortUsers(
  users: User[],
  field: SortField,
  direction: "asc" | "desc"
): User[] {
  const sortedUsers = [...users];

  sortedUsers.sort(function (a, b) {
    const result = a[field].localeCompare(b[field]);

    return direction === "asc" ? result : -result;
  });

  return sortedUsers;
}
