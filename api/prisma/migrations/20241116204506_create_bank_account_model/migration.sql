-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('INVESTMENT', 'CHECKING', 'CASH');

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "type" "BankAccountType" NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);
