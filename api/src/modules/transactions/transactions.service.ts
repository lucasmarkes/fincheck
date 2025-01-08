import { Injectable } from "@nestjs/common";
import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

@Injectable()
export class TransactionsService {
	constructor(private readonly transactionsRepo: TransactionsRepository) {}

	create(createTransactionDto: CreateTransactionDto) {
		return this.transactionsRepo.create({
			data: {
				...createTransactionDto,
			},
		});
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
