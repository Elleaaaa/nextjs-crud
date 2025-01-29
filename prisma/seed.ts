import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
