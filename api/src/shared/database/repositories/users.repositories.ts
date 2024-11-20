import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersRepository extends PrismaService {
	async create() {}
}
