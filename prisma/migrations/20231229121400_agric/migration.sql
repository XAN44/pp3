/*
  Warnings:

  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "repliedCommentId" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "title",
ADD COLUMN     "ImagePost" TEXT,
ALTER COLUMN "content" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_repliedCommentId_fkey" FOREIGN KEY ("repliedCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
