-- AlterTable
ALTER TABLE "User" ADD COLUMN     "selectedGameCarId" TEXT;

-- CreateTable
CREATE TABLE "_GameCarToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameCarToUser_AB_unique" ON "_GameCarToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCarToUser_B_index" ON "_GameCarToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedGameCarId_fkey" FOREIGN KEY ("selectedGameCarId") REFERENCES "GameCar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCarToUser" ADD CONSTRAINT "_GameCarToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GameCar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCarToUser" ADD CONSTRAINT "_GameCarToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
