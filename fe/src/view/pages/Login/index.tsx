import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
	const { handleSubmit, register, errors } = useLoginController();

	return (
		<>
			<header className="flex flex-col gap-4 items-center text-center">
				<h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
					Entre em sua conta
				</h1>

				<p className="space-x-2">
					<span className="text-gray-700 tracking-[-0.5px]">
						Novo por aqui?
					</span>

					<Link
						to={"/signup"}
						className="text-teal-900 font-medium tracking-[-0.5px] hover:underline"
					>
						Crie uma conta
					</Link>
				</p>
			</header>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-[60px]">
				<Input
					type="email"
					placeholder="E-mail"
					error="Informe o email"
					{...register("email")}
				/>
				{/* {errors.email && (
					<span className="text-red-500 text-sm">{errors.email.message}</span>
				)} */}
				<Input
					type="password"
					placeholder="Senha"
					error="Informe a senha"
					{...register("password")}
				/>
				{/* {errors.password && (
					<span className="text-red-500 text-sm">
						{errors.password.message}
					</span>
				)} */}
				<Button type="submit" label="Entrar" className="mt-2" />
			</form>
		</>
	);
}
