import { User } from "@/data/users";
import * as XLSX from "xlsx";
import { format } from "date-fns";

export function exportToExcel(users: User[]) {
  const worksheet = XLSX.utils.json_to_sheet(
    users.map((user) => ({
      "First Name": user.firstName,
      "Last Name": user.lastName,
      Email: user.email,
      Role: user.role,
      Status: user.status,
      "Created At": format(new Date(user.createdAt), "MMM d, yyyy"),
      "Last Login": user.lastLogin
        ? format(new Date(user.lastLogin), "MMM d, yyyy")
        : "Never",
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  XLSX.writeFile(workbook, "users.xlsx");
}

export function printUsers(users: User[]) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Users List</title>
        <style>
          body { font-family: system-ui, sans-serif; margin: 2rem; }
          table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
          th, td { padding: 0.5rem; text-align: left; border: 1px solid #ddd; }
          th { background: #f4f4f5; }
          .header { margin-bottom: 2rem; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Users List</h1>
          <p>Generated on ${format(new Date(), "MMM d, yyyy 'at' HH:mm")}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            ${users
              .map(
                (user) => `
              <tr>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.status}</td>
                <td>${format(new Date(user.createdAt), "MMM d, yyyy")}</td>
                <td>${
                  user.lastLogin
                    ? format(new Date(user.lastLogin), "MMM d, yyyy")
                    : "Never"
                }</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <button class="no-print" onclick="window.print()" style="margin-top: 2rem; padding: 0.5rem 1rem;">
          Print
        </button>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
