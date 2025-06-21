/*
  Warnings:

  - You are about to drop the column `email` on the `User_message` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `User_message` table. All the data in the column will be lost.
  - You are about to drop the column `sendTo` on the `User_message` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User_message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL
);
INSERT INTO "new_User_message" ("id", "username") SELECT "id", "username" FROM "User_message";
DROP TABLE "User_message";
ALTER TABLE "new_User_message" RENAME TO "User_message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
