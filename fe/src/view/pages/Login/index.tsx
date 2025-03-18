import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Login() {
	return (
		<div>
			<header className="flex flex-col gap-4 items-center">
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

			<form action="" className="flex flex-col gap-4 mt-[60px]">
				<Input type="email" placeholder="Email" name="email" />
				<Input type="password" placeholder="Senha" name="password" />
				<Button type="submit" label="Entrar" className="mt-2" />
			</form>
		</div>
	);
}
