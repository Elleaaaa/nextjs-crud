import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user:", error); // Debugging: Log the error
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;

  try {
    const userData = await request.json(); // Get the JSON data sent in the request body

    // Remove createdAt from the user data to prevent it from being updated
    const { createdAt, ...updateData } = userData;

    // Update user in the database with the data, excluding createdAt
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updateData, // Update the user with the data, excluding createdAt
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
