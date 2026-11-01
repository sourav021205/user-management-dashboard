import type { User } from "../types/user";

export function paginateUsers(
  users: User[],
  page: number,
  usersPerPage: number = 5
): User[] {
  const startIndex = (page - 1) * usersPerPage;

  return users.slice(startIndex, startIndex + usersPerPage);
}
