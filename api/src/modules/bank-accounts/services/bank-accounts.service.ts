import { Injectable } from "@nestjs/common";
import { BankAccountsRepository } from "src/shared/database/repositories/bank-accounts.repositories";
import { CreateBankAccountDto } from "../dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "../dto/update-bank-account.dto";
import { ValidateBankAccountOwnershipService } from "./validate-bank-account-ownership.service";

@Injectable()
export class BankAccountsService {
	constructor(
		private readonly bankAccountsRepo: BankAccountsRepository,
		private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
	) {}

	create(userId: string, createBankAccountDto: CreateBankAccountDto) {
		const { name, initialBalance, type, color } = createBankAccountDto;

		return this.bankAccountsRepo.create({
			data: {
				userId,
				name,
				initialBalance,
				type,
				color,
			},
		});
	}

	async findAllByUserId(userId: string) {
		const bankAccounts = await this.bankAccountsRepo.findMany({
			where: { userId },
			include: {
				transactions: {
					select: {
						type: true,
						value: true,
					},
				},
			},
		});

		return bankAccounts.map(({ transactions, ...bankAccount }) => {
			const totalTransactionsValue = transactions.reduce(
				(acc, transaction) =>
					acc +
					(transaction.type === "INCOME"
						? transaction.value
						: -transaction.value),
				0,
			);

			const currentBalance =
				bankAccount.initialBalance + totalTransactionsValue;

			return {
				...bankAccount,
				currentBalance,
				transactions,
			};
		});
	}

	async update(
		userId: string,
		bankAccountId: string,
		updateBankAccountDto: UpdateBankAccountDto,
	) {
		await this.validateBankAccountOwnershipService.validate(
			userId,
			bankAccountId,
		);

		const { name, initialBalance, type, color } = updateBankAccountDto;

		return this.bankAccountsRepo.update({
			where: {
				id: bankAccountId,
			},
			data: {
				name,
				initialBalance,
				type,
				color,
			},
		});
	}

	async remove(userId: string, bankAccountId: string) {
		await this.validateBankAccountOwnershipService.validate(
			userId,
			bankAccountId,
		);

		await this.bankAccountsRepo.delete({
			where: {
				id: bankAccountId,
			},
		});

		return;
	}
}
