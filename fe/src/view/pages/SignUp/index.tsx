import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useSignUpController } from "./useSignUpController";

export function SignUp() {
	const { register, handleSubmit, errors, isPending } = useSignUpController();

	return (
		<>
			<header className="flex flex-col gap-4 items-center text-center">
				<h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
					Crie sua conta
				</h1>
				<p className="space-x-2">
					<span className="text-gray-700 tracking-[-0.5px]">
						Já possui uma conta?
					</span>
					<Link
						to={"/login"}
						className="text-teal-900 font-medium tracking-[-0.5px] hover:underline"
					>
						Fazer login
					</Link>
				</p>
			</header>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-[60px]">
				<Input
					placeholder="Nome"
					{...register("name")}
					error={errors.name?.message}
				/>
				<Input
					type="email"
					placeholder="Email"
					{...register("email")}
					error={errors.email?.message}
				/>
				<Input
					type="password"
					placeholder="Senha"
					{...register("password")}
					error={errors.password?.message}
				/>
				<Button
					type="submit"
					label="Criar conta"
					className="mt-2"
					isPending={isPending}
				/>
			</form>
		</>
	);
}
