/*
  Warnings:

  - Added the required column `name` to the `collaborators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collaborators" ADD COLUMN     "name" TEXT NOT NULL;
