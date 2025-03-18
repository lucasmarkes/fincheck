import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignUp() {
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

			<form action="" className="flex flex-col gap-4 mt-[60px]">
				<Input placeholder="Nome" name="name" />
				<Input type="email" placeholder="Email" name="email" />
				<Input type="password" placeholder="Senha" name="password" />
				<Button type="submit" label="Criar conta" className="mt-2" />
			</form>
		</>
	);
}
