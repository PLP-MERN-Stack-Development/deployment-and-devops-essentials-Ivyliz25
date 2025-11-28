import React, { useEffect, useState } from "react";
import api from "../services/api";
import AddUser from "../components/AddUser";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <AddUser onUserAdded={handleUserAdded} />

      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Users List</h2>
        {users.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li
                key={u._id}
                className="border-b py-2 flex justify-between items-center"
              >
                <span>
                  <strong>{u.name}</strong> — {u.email}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
