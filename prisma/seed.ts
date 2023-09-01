import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const seedLoc = [
    {
      name: "New York",
      certificateLevel: "Silver",
    },
    {
      name: "Chicago",
      certificateLevel: "Bronze",
    },
    {
      name: "San Francisco",
      certificateLevel: "Bronze",
    },
    {
      name: "Usrykos Dolnos",
      certificateLevel: "Gold",
    },
    {
      name: "Boston",
      certificateLevel: "Gold",
    },
  ];
  await Promise.all(
    seedLoc.map(async (loc) => {
      await prisma.location.create({
        data: loc,
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
