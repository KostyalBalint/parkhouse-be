/*
  Warnings:

  - The primary key for the `Car` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Level` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ParkingSpace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `parkingAreaId` on the `ParkingSpace` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ParkingSpace` table. All the data in the column will be lost.
  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `ParkingArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_userId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingArea" DROP CONSTRAINT "ParkingArea_levelId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingSpace" DROP CONSTRAINT "ParkingSpace_levelId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingSpace" DROP CONSTRAINT "ParkingSpace_parkingAreaId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingSpace" DROP CONSTRAINT "ParkingSpace_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_carId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_parkingSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP CONSTRAINT "Car_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Car_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Car_id_seq";

-- AlterTable
ALTER TABLE "Level" DROP CONSTRAINT "Level_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Level_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Level_id_seq";

-- AlterTable
ALTER TABLE "ParkingSpace" DROP CONSTRAINT "ParkingSpace_pkey",
DROP COLUMN "parkingAreaId",
DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "levelId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ParkingSpace_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ParkingSpace_id_seq";

-- AlterTable
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "parkingSpaceId" SET DATA TYPE TEXT,
ALTER COLUMN "carId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reservation_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "ParkingArea";

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpace" ADD CONSTRAINT "ParkingSpace_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpace" ADD CONSTRAINT "ParkingSpace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
