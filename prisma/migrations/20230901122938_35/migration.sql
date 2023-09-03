/*
  Warnings:

  - You are about to drop the column `createdAt` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `completeddate` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "taskid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffid" INTEGER NOT NULL,
    "clientname" TEXT NOT NULL,
    "categoryid" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "visitcount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "completeddate" TEXT NOT NULL
);
INSERT INTO "new_tasks" ("categoryid", "clientname", "location", "staffid", "status", "taskid", "visitcount") SELECT "categoryid", "clientname", "location", "staffid", "status", "taskid", "visitcount" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
