import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { UsersRepository } from "src/shared/database/repositories/users.repositories";
import { AuthenticateDto } from "./dto/authenticate.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepo: UsersRepository,
		private readonly jwtService: JwtService,
	) {}

	async authenticate(authenticateDto: AuthenticateDto) {
		const { email, password } = authenticateDto;

		const user = await this.usersRepo.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		// Generate JWT token
		const accessToken = this.jwtService.sign({ sub: user.id });

		return { accessToken };
	}
}