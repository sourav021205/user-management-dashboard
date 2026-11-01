import type { User } from "../types/user";

export function exportCsv(users: User[]): void {
  const headers = [
    "Name",
    "Username",
    "Email",
    "Phone",
    "Website",
    "Company",
    "City",
  ];

  const rows = users.map(function (user) {
    return [
      user.name,
      user.username,
      user.email,
      user.phone,
      user.website,
      user.company.name,
      user.address.city,
    ];
  });

  const csv = [headers, ...rows]
    .map(function (row) {
      return row
        .map(function (value) {
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",");
    })
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "users.csv";
  link.click();

  URL.revokeObjectURL(url);
}
