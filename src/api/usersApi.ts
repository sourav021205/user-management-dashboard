import type { User } from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: User[] = await response.json();

  return data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data: User = await response.json();

  return data;
}
