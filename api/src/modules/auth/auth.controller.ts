import { Body, Controller, Post } from "@nestjs/common";
import { isPublic } from "src/shared/decorators/IsPublic";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";

@isPublic()
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signin")
	authenticate(@Body() signInDto: SignInDto) {
		return this.authService.authenticate(signInDto);
	}

	@Post("signup")
	create(@Body() signUpDto: SignUpDto) {
		return this.authService.signup(signUpDto);
	}
}
