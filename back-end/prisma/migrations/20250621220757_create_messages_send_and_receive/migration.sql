/*
  Warnings:

  - You are about to drop the column `create_at` on the `User_message` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `User_message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "remetentId" TEXT NOT NULL,
    "destinatarioId" TEXT NOT NULL,
    CONSTRAINT "message_remetentId_fkey" FOREIGN KEY ("remetentId") REFERENCES "User_message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "message_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "User_message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User_message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sendTo" TEXT NOT NULL
);
INSERT INTO "new_User_message" ("id", "message", "sendTo") SELECT "id", "message", "sendTo" FROM "User_message";
DROP TABLE "User_message";
ALTER TABLE "new_User_message" RENAME TO "User_message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
