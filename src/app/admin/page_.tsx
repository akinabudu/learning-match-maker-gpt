'use client';
import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users', {
          headers: {
            // 'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message);
        }

        const { users } = await res.json();
        setUsers(users);
      } catch (err:any) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map(user => ( */}
            {/* <tr key={user._id}> */}
              {/* <td className="py-2 px-4 border-b">{user.username}</td> */}
              {/* <td className="py-2 px-4 border-b">{user.email}</td> */}
              {/* <td className="py-2 px-4 border-b">{user.role}</td> */}
              {/* <td className="py-2 px-4 border-b"> */}
                {/* Add actions like edit or delete user */}
              {/* </td> */}
            {/* </tr> */}
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
