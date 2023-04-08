/*
  Warnings:

  - You are about to drop the column `name` on the `collaborators` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `collaborators` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "collaborators" DROP COLUMN "name",
ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_user_id_key" ON "collaborators"("user_id");

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
