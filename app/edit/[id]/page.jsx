"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";

export default function EditUser({ params }) {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });

  // Unwrap `params` with `React.use()`
  const { id } = React.use(params);

  useEffect(() => {
    if (id) {
      console.log("Fetching user with ID:", id); // Debugging: Log the ID
      fetch(`/api/users/edit/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched data:", data); // Debugging: Log the fetched data
          if (data.error) {
            console.error(data.error);
          } else {
            setUser(data); // Set the fetched user data
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error); // Debugging: Log the error
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a PUT request to update the user
    const response = await fetch(`/api/users/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      router.push("/"); // Redirect to the home page after updating
    }
  };

  return (
    <div>
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </Link>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
