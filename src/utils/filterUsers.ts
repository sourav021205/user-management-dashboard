import type { User } from "../types/user";

export function filterUsers(
  users: User[],
  searchTerm: string,
  city: string,
  company: string
): User[] {
  return users.filter(function (user) {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);

    const matchesCity =
      city === "All" || user.address.city.toLowerCase() === city.toLowerCase();

    const matchesCompany =
      company === "All" ||
      user.company.name.toLowerCase() === company.toLowerCase();

    return matchesSearch && matchesCity && matchesCompany;
  });
}
