/*
  Warnings:

  - Added the required column `colorName` to the `Creature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Creature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "species" TEXT NOT NULL,
    "image" TEXT,
    "colorName" TEXT NOT NULL,
    "locationId" TEXT,
    CONSTRAINT "Creature_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Creature" ("createdAt", "id", "image", "locationId", "species", "updatedAt") SELECT "createdAt", "id", "image", "locationId", "species", "updatedAt" FROM "Creature";
DROP TABLE "Creature";
ALTER TABLE "new_Creature" RENAME TO "Creature";
CREATE UNIQUE INDEX "Creature_locationId_key" ON "Creature"("locationId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
