/*
  Warnings:

  - You are about to drop the column `user_id` on the `User_message` table. All the data in the column will be lost.
  - Added the required column `email` to the `User_message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User_message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User_message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sendTo" TEXT NOT NULL
);
INSERT INTO "new_User_message" ("id", "message", "sendTo") SELECT "id", "message", "sendTo" FROM "User_message";
DROP TABLE "User_message";
ALTER TABLE "new_User_message" RENAME TO "User_message";
CREATE UNIQUE INDEX "User_message_email_key" ON "User_message"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
