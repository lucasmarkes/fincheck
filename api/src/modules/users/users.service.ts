import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { UsersRepository } from "./../../shared/database/repositories/users.repositories";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
	constructor(private readonly usersRepo: UsersRepository) {}

	async create(createUserDto: CreateUserDto) {
		const { email, name, password } = createUserDto;

		const emailExists = await this.usersRepo.findUnique({
			where: { email },
			select: { id: true },
		});

		if (emailExists) {
			throw new ConflictException("This email is already in use.");
		}

		const hashedPassword = await hash(password, 10);

		const user = await this.usersRepo.create({
			data: {
				email,
				name,
				password: hashedPassword,
				categories: {
					createMany: {
						data: [
							// Income
							{ name: "Salário", icon: "salary", type: "INCOME" },
							{ name: "Freelance", icon: "freelance", type: "INCOME" },
							{ name: "Outro", icon: "other", type: "INCOME" },
							// Expense
							{ name: "Casa", icon: "home", type: "EXPENSE" },
							{ name: "Alimentação", icon: "food", type: "EXPENSE" },
							{ name: "Educação", icon: "education", type: "EXPENSE" },
							{ name: "Lazer", icon: "fun", type: "EXPENSE" },
							{ name: "Mercado", icon: "grocery", type: "EXPENSE" },
							{ name: "Roupas", icon: "clothes", type: "EXPENSE" },
							{ name: "Transporte", icon: "transport", type: "EXPENSE" },
							{ name: "Viagem", icon: "travel", type: "EXPENSE" },
							{ name: "Outro", icon: "other", type: "EXPENSE" },
						],
					},
				},
			},
		});

		return {
			email: user.email,
			name: user.name,
		};
	}
}
