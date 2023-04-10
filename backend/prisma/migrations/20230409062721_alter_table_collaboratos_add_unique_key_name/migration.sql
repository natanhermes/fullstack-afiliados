/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `collaborators` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "collaborators_name_key" ON "collaborators"("name");
