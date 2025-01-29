import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = await hash(password, 10); // make ths password hashed

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
