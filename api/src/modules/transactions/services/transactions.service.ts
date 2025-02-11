import { Injectable } from "@nestjs/common";
import { ValidateBankAccountOwnershipService } from "src/modules/bank-accounts/services/validate-bank-account-ownership.service";
import { ValidateCategoryOwnershipService } from "src/modules/categories/services/validate-category-ownership.service";
import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { ValidateTransactionOwnershipService } from "./validate-transaction-ownership.service";


@Injectable()
export class TransactionsService {
	constructor(
		private readonly transactionsRepo: TransactionsRepository,
		private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
		private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
		private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService
	) {}

	async create(userId: string, createTransactionDto: CreateTransactionDto) {
		const { bankAccountId, categoryId, date, name, type, value } = createTransactionDto;

		await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

		return this.transactionsRepo.create({
			data: {
				userId,
				bankAccountId,
				categoryId,
				date,
				name,
				type,
				value,
			}
		});
	}

	findAllByUserId(userId: string) {
		return this.transactionsRepo.findMany({
			where: {
				userId,
			},
		});
	}

	async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
		const { bankAccountId, categoryId, date, name } = updateTransactionDto;

		await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId });
	}

	remove(id: number) {
		return `This action removes a #${id} transaction`;
	}

	private async validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId }: { userId: string; bankAccountId: string; categoryId: string, transactionId?: string }) { 
		await Promise.all([
			transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
			this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
			this.validateCategoryOwnershipService.validate(userId, categoryId),
		]);
	}
}
