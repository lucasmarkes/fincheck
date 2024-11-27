import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { env } from "node:process";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		JwtModule.register({
			signOptions: { expiresIn: "1d" },
			secret: env.JWT_SECRET,
		}),
	],
})
export class AuthModule {}
