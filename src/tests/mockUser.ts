import type { User } from "../types/user";

export const mockUser: User = {
  id: 1,
  name: "Test User",
  username: "testuser",
  email: "test@example.com",
  phone: "123456789",
  website: "test.com",
  address: {
    street: "Test Street",
    suite: "Apt 1",
    city: "Bangalore",
    zipcode: "560001",
    geo: {
      lat: "12.9",
      lng: "77.5",
    },
  },
  company: {
    name: "Test Company",
    catchPhrase: "Test Phrase",
    bs: "Test Business",
  },
};
