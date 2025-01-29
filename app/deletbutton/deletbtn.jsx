// /app/home/DeleteButton.js (Client Component)
"use client"; // This marks the component as client-side

import { useState } from "react";

export default function DeleteButton({ userId }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmation) {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/delete/${userId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("User deleted successfully.");
          window.location.reload(); // Reload to update the list of users
        } else {
          alert("Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleDelete}
      disabled={loading} // Disable button while loading
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
