import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { ActiveUserId } from "src/shared/decorators/ActiveUserId";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { TransactionsService } from "./services/transactions.service";
@Controller("transactions")
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Post()
	create(
		@ActiveUserId() userId: string,
		@Body() createTransactionDto: CreateTransactionDto,
	) {
		return this.transactionsService.create(userId, createTransactionDto);
	}

	@Get()
	findAll(
		@ActiveUserId() userId: string,
		@Query('month') month: number,
		@Query('year') year: number,
	) {
		console.log(month, year);
		return this.transactionsService.findAllByUserId(userId, { month, year });
	}

	@Put(":transactionId")
	update(
		@ActiveUserId() userId: string,
		@Param("transactionId", ParseUUIDPipe) transactionId: string,
		@Body() updateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionsService.update(userId, transactionId, updateTransactionDto);
	}

	@Delete(":transactionId")
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(
		@ActiveUserId() userId: string,
		@Param("transactionId", ParseUUIDPipe) transactionId: string) {
		return this.transactionsService.remove(userId, transactionId);
	}
}
