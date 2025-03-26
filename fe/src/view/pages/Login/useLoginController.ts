import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../../../app/services/authService";
import type { SigninParams } from "../../../app/services/authService/signin";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
	email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido"),
	password: z
		.string()
		.nonempty("Senha é obrigatória")
		.min(8, "Senha deve conter pelo menos 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["signIn"],
		mutationFn: async (data: SigninParams) => {
			return await authService.signIn(data);
		},
	});

	const { signin } = useAuth();

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			const { accessToken } = await mutateAsync(data);
			toast.success("Usuário logado com sucesso!");
			signin(accessToken);
			console.log(accessToken);
		} catch {
			toast.error("Ocorreu um erro ao entrar em sua conta.");
		}
	});

	return { register, handleSubmit, errors, isPending };
}
