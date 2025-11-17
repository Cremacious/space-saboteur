/*
  Warnings:

  - A unique constraint covering the columns `[gameId,voterId,round]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_gameId_voterId_round_key" ON "Vote"("gameId", "voterId", "round");
