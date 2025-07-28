/*
  Warnings:

  - A unique constraint covering the columns `[qrCode]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,eventId]` on the table `GuestCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GuestStatus" AS ENUM ('Invited', 'Attended', 'Cancelled');

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "invitationLink" TEXT,
ADD COLUMN     "qrCode" TEXT,
ADD COLUMN     "status" "GuestStatus" NOT NULL DEFAULT 'Invited';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Guest_qrCode_key" ON "Guest"("qrCode");

-- CreateIndex
CREATE UNIQUE INDEX "GuestCategory_code_eventId_key" ON "GuestCategory"("code", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
