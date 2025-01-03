import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { TransactionsService } from "./transactions.service";

@Controller("transactions")
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Post()
	create(@Body() createTransactionDto: CreateTransactionDto) {
		return this.transactionsService.create(createTransactionDto);
	}

	@Get()
	findAll() {
		return this.transactionsService.findAll();
	}

	@Put(":id")
	update(
		@Param("id") id: string,
		@Body() updateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionsService.update(+id, updateTransactionDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.transactionsService.remove(+id);
	}
}
