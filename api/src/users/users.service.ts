import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const { email, name, password } = createUserDto;

		const emailExists = await this.prismaService.user.findUnique({
			where: { email },
		});

		if (emailExists) {
			throw new ConflictException("This email is already in use.");
		}

		const hashedPassword = await hash(password, 10);

		const user = await this.prismaService.user.create({
			data: { email, name, password: hashedPassword },
		});

		return user;
	}
}
