-- AlterTable
ALTER TABLE "BroadcastTemplate" ADD COLUMN     "button" TEXT,
ADD COLUMN     "footerMessage" TEXT,
ADD COLUMN     "imageAttachment" TEXT,
ADD COLUMN     "subject" TEXT;

-- AlterTable
ALTER TABLE "GuestCategory" ADD COLUMN     "code" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "quota" INTEGER;
