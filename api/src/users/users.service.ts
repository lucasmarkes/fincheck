import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.prismaService.user.create({
			data: {
				email: createUserDto.email,
				name: createUserDto.name,
				password: createUserDto.password,
			},
		});

		return user;
	}
}
