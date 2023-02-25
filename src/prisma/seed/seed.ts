import { ParkingSpaceType, Prisma, PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { ParkingSpaceStatus } from '../../graphql/graphqlTypes';

const prisma = new PrismaClient();

async function seedUsers({ count }: { count: number }) {
  const names = new Set<string>();
  while (names.size < count) {
    names.add(faker.name.firstName());
  }
  const fakeNames = Array.from(names);

  const fakerUser = (index: number): Omit<User, 'id'> => ({
    name: fakeNames[index],
    avatar: faker.image.avatar(),
    phoneNumber: faker.phone.number('+36-30-###-####'),
    password: 'password',
    selectedGameCarId: null,
    coin: 123,
  });
  await prisma.user.create({
    data: {
      id: 'admin',
      name: 'Admin',
      avatar: faker.image.avatar(),
      phoneNumber: faker.phone.number('+36-30-###-####'),
      password: 'password',
      selectedGameCarId: null,
      coin: 123,
    },
  });
  return prisma.user.createMany({
    data: Array.from({ length: count }).map((_, index) => fakerUser(index)),
  });
}
function generatePlate() {
  let plate = '';
  for (let i = 0; i < 3; i++) {
    plate += String.fromCharCode(Math.floor(65 + Math.random() * 26));
  }
  plate += '-';
  for (let i = 0; i < 3; i++) {
    plate += String(Math.floor(Math.random() * 10));
  }

  return plate;
}

async function seedCars({ users }: { users: User[] }) {
  const cars = users.map((user) => ({
    licencePlate: generatePlate(),
    userId: user.id,
    name: faker.vehicle.model(),
  }));
  return await prisma.car.createMany({
    data: cars,
  });
}

async function seedGameCars() {
  const models = new Set<string>();
  while (models.size < 6) {
    models.add(faker.vehicle.model());
  }
  const fakeModels = Array.from(models);

  const gameCarImages = [
    'tdrc01_car01_b.png',
    'tdrc01_car01_e.png',
    'tdrc01_car01_f.png',
    'tdrc01_car03_a.png',
    'tdrc01_car03_c.png',
    'tdrc01_car03_d.png',
    'tdrc01_car04_a.png',
    'tdrc01_car04_d.png',
    'tdrc01_car04_f.png',
    'tdrc01_car07_b.png',
    'tdrc01_car07_d.png',
    'tdrc01_car07_f.png',
    'tdrc01_car08_a.png',
    'tdrc01_car08_b.png',
    'tdrc01_car08_d.png',
    'tdrc01_car09_a.png',
    'tdrc01_car09_e.png',
    'tdrc01_car09_f.png',
  ];
  const gameCars = (index: number) => ({
    name: fakeModels[Math.floor(index / 3)],
    price: (Math.floor(Math.random() * 10) + 15) * 25,
    image: gameCarImages[index],
  });

  return prisma.gameCar.createMany({
    data: Array.from({ length: 18 }).map((_, index) => gameCars(index)),
  });
}

async function seedLevels(count: number, users: User[]) {
  const parkingSpaces = (spaceIndex: number, levelIndex: number) => ({
    label: `A-${levelIndex * 100 + spaceIndex}`,
    type: ParkingSpaceType.NORMAL,
    currentStatus: ParkingSpaceStatus.FREE,
  });

  const parkingOwnedSpaces = (
    spaceIndex: number,
    users: User[],
    levelIndex: number,
  ) => ({
    label: `A-${levelIndex * 100 + spaceIndex}`,
    type: ParkingSpaceType.NORMAL,
    ownerId: users[spaceIndex].id,
    currentStatus: ParkingSpaceStatus.RESERVED_FOR_OWNER,
  });
  const levels = (index: number): Omit<Prisma.LevelCreateInput, 'id'> => ({
    label: `${index + 1}.emelet`,
    ParkingSpace: {
      createMany: {
        data: [
          ...Array.from({ length: 14 }).map((_, spaceIndex) =>
            parkingOwnedSpaces(
              spaceIndex,
              users.slice(14 * index, 14 * (index + 1)),
              index + 1,
            ),
          ),
          ...Array.from({ length: 2 }).map((_, spaceIndex) =>
            parkingSpaces(spaceIndex + 14, index + 1),
          ),
        ],
      },
    },
  });
  for (let i = 0; i < count; i++) {
    await prisma.level.create({
      data: levels(i),
    });
  }
  /*
  return prisma.level.createMany({
    data: Array.from({ length: count }).map((_, index) => levels(index)),
  });*/
}

async function main() {
  await seedUsers({
    count: 100,
  });

  const users = await prisma.user.findMany();
  console.log('Seeded users:', users.length);
  const cars = await seedCars({
    users: await prisma.user.findMany(),
  });
  console.log('Seed cars:', cars.count);

  await seedLevels(5, users);
  const levels = await prisma.level.findMany();
  console.log('Seed levels:', levels.length);

  await seedGameCars();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
