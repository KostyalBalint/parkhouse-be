-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('LIGHTS_ON', 'OTHER');

-- CreateEnum
CREATE TYPE "ParkingSpaceStatus" AS ENUM ('FREE', 'RESERVED', 'RESERVED_FOR_OWNER', 'OCCUPIED');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('CREATED', 'CHECKED_IN', 'CHECKED_OUT');

-- CreateEnum
CREATE TYPE "ReservationType" AS ENUM ('ALL_DAY', 'MORNING', 'AFTERNOON');

-- CreateEnum
CREATE TYPE "ParkingSpaceType" AS ENUM ('NORMAL', 'ELECTRIC', 'DISABLED');

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "licencePlate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSpace" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ParkingSpaceType" NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "rotation" DOUBLE PRECISION NOT NULL,
    "currentStatus" "ParkingSpaceStatus" NOT NULL,
    "levelId" INTEGER NOT NULL,
    "userId" INTEGER,
    "parkingAreaId" INTEGER,

    CONSTRAINT "ParkingSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "ReservationType" NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "parkingSpaceId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingArea" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "levelId" INTEGER NOT NULL,

    CONSTRAINT "ParkingArea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpace" ADD CONSTRAINT "ParkingSpace_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpace" ADD CONSTRAINT "ParkingSpace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpace" ADD CONSTRAINT "ParkingSpace_parkingAreaId_fkey" FOREIGN KEY ("parkingAreaId") REFERENCES "ParkingArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingArea" ADD CONSTRAINT "ParkingArea_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
