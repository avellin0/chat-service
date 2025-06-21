/*
  Warnings:

  - Added the required column `conteudo` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "remetentId" TEXT NOT NULL,
    "destinatarioId" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "message_remetentId_fkey" FOREIGN KEY ("remetentId") REFERENCES "User_message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "message_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "User_message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_message" ("destinatarioId", "id", "remetentId") SELECT "destinatarioId", "id", "remetentId" FROM "message";
DROP TABLE "message";
ALTER TABLE "new_message" RENAME TO "message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
