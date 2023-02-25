import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

function seedUsers({ count }: { count: number }) {
  const fakerUser = (): Omit<User, 'id'> => ({
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
    phoneNumber: faker.phone.number('+36-30-###-####'),
    password: 'password',
    coin: 123,
  });
  return prisma.user.createMany({
    data: Array.from({ length: count }).map(fakerUser),
  });
}

async function seedCars({ users }: { users: User[] }) {
  const cars = users.map((user) => ({
    licencePlate: faker.vehicle.vin(),
    userId: user.id,
  }));
  return await prisma.car.createMany({
    data: cars,
  });
}

function seedLevels({ count }: { count: number }) {
  return prisma.level.createMany({
    data: Array.from({ length: count }).map(() => ({
      label:
        faker.random.alpha({ count: 2 }) + faker.random.numeric(2).toString(),
    })),
  });
}

async function main() {
  const users = await seedUsers({
    count: 10,
  });

  console.log('Seeded users:', users.count);

  const cars = await seedCars({
    users: await prisma.user.findMany(),
  });
  console.log('Seed cars:', cars.count);

  const levels = await seedLevels({
    count: 10,
  });
  console.log('Seeded levels:', levels.count);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
