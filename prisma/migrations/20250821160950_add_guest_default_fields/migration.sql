-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('NotSent', 'Sent', 'Delivered', 'Failed');

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "dateArrival" TIMESTAMP(3),
ADD COLUMN     "emailStatus" "EmailStatus" NOT NULL DEFAULT 'NotSent',
ADD COLUMN     "signed" TEXT DEFAULT 'Not Sign',
ADD COLUMN     "webStatus" TEXT DEFAULT 'Viewed';
