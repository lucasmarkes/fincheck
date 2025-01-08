import { Injectable } from "@nestjs/common";
import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";
import { ValidateBankAccountOwnershipService } from "../bank-accounts/services/validate-bank-account-ownership.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

@Injectable()
export class TransactionsService {
	constructor(
		private readonly transactionsRepo: TransactionsRepository,
		private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
	) {}

	async create(userId: string, createTransactionDto: CreateTransactionDto) {
		const { bankAccountId } = createTransactionDto;
		await this.validateBankAccountOwnershipService.validate(
			userId,
			bankAccountId,
		);
	}

	findAllByUserId(userId: string) {
		return this.transactionsRepo.findMany({
			where: {
				userId,
			},
		});
	}

	update(id: number, updateTransactionDto: UpdateTransactionDto) {
		return `This action updates a #${id} transaction`;
	}

	remove(id: number) {
		return `This action removes a #${id} transaction`;
	}
}
