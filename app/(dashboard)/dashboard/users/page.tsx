import React from 'react';

const users = [
  {
    id: 1,
    fullName: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+1234567890',
    role: 'admin',
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phoneNumber: '+0987654321',
    role: 'user',
  },
];

const Page = () => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Full Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone Number</th>
            <th className="px-4 py-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.fullName}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.phoneNumber}</td>
              <td className="px-4 py-2 border">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
