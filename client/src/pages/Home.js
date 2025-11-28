import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to MERN App</h1>
      <p className="mb-6">Manage users seamlessly with React & Express.</p>
      <Link
        to="/dashboard"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
