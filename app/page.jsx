import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import DeleteButton from "@/app/deletbutton/deletbtn";

const prisma = new PrismaClient();

export default async function Home() {
  const user = await prisma.user.findMany();
  const pets = await prisma.pet.findMany({
    include: {
      owner: {
        select: { name: true }, // Get only the owner's name
      },
    },
  });

  return (
    <main>
      <h1>Next.js CRUD App</h1>
      <p>List of Users</p>
      {user?.map((user) => (
        <div key={user.id}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link href={`/edit/${user.id}`}>Edit</Link>
          </button>
          <DeleteButton userId={user.id} />
          {" | "}
          {user.name} | {user.email}
        </div>
      ))}

      <p>Total of Users: {user.length}</p>

      <Link href="/create">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New User
        </button>
      </Link>

      <p>List of Pets</p>
      {pets?.map((pet) => (
        <div key={pet.id}>
          {pet.name} | {pet.age} | {pet.gender}
          <br />
          owner: {pet.owner?.name}
        </div>
      ))}
    </main>
  );
}
