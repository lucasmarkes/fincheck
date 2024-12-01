import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { UsersRepository } from "src/shared/database/repositories/users.repositories";
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepo: UsersRepository,
		private readonly jwtService: JwtService,
	) {}

	async authenticate(signInDto: SignInDto) {
		const { email, password } = signInDto;

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
		const accessToken = await this.generateAccessToken(user.id);

		return { accessToken };
	}

	async signup(signUpDto: SignUpDto) {
		const { email, name, password } = signUpDto;

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

		const accessToken = await this.generateAccessToken(user.id);

		return { accessToken };
	}

	private async generateAccessToken(userId: string) {
		const payload = { sub: userId };
		return this.jwtService.sign(payload);
	}
}
