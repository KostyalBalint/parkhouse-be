/*
  Warnings:

  - You are about to drop the column `latitude` on the `ParkingSpace` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `ParkingSpace` table. All the data in the column will be lost.
  - You are about to drop the column `rotation` on the `ParkingSpace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `ParkingSpace` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ParkingSpace" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "rotation";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coin" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Resignation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parkingSpaceId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resignation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCar" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "GameCar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSpace_ownerId_key" ON "ParkingSpace"("ownerId");

-- AddForeignKey
ALTER TABLE "Resignation" ADD CONSTRAINT "Resignation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resignation" ADD CONSTRAINT "Resignation_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
