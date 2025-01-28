export type UserRole = 'admin' | 'instructor' | 'student';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // In a real app, this would be hashed
  avatar?: string;
  status: UserStatus;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

// Function to generate random dates within a range
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

// Generate users data
const firstNames = [
  'John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'James', 'Emily', 'William', 'Olivia',
  'Alexander', 'Sophia', 'Michael', 'Isabella', 'Daniel', 'Mia', 'Joseph', 'Charlotte', 'Henry', 'Ava',
  'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Sebastian', 'Evelyn', 'Jack', 'Abigail', 'Owen', 'Ella',
  'Gabriel', 'Elizabeth', 'Matthew', 'Sofia', 'Leo', 'Avery', 'Liam', 'Scarlett', 'Mason', 'Victoria'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
];

const roles: UserRole[] = ['admin', 'instructor', 'student'];
const statuses: UserStatus[] = ['active', 'inactive', 'pending'];

// Generate 100 users
export const users: User[] = Array.from({ length: 100 }, (_, index) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const role = roles[Math.floor(Math.random() * (index === 0 ? 1 : roles.length))]; // Ensure first user is admin
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const createdAt = randomDate(new Date('2023-01-01'), new Date('2024-01-28'));
  const hasLastLogin = Math.random() > 0.2; // 80% chance of having last login

  return {
    id: (index + 1).toString(),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    password: `hashed_password_${index + 1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
    status,
    role,
    createdAt,
    ...(hasLastLogin && {
      lastLogin: randomDate(new Date(createdAt), new Date('2024-01-28')),
    }),
  };
}).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by creation date, newest first
