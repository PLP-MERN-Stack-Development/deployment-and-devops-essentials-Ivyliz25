import React, { useState } from "react";
import api from "../services/api";

export default function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Name and email are required");

    setSubmitting(true);
    try {
      const res = await api.post("/users", { name, email });
      onUserAdded(res.data.user);
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Add New User</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {submitting ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
