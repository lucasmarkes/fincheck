import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import type { SignupParams } from "../../../app/services/authService/signup";
import toast from "react-hot-toast";

const schema = z.object({
	email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido"),
	password: z
		.string()
		.nonempty("Senha é obrigatória")
		.min(8, "Senha deve conter pelo menos 8 caracteres"),
	name: z.string().nonempty("Nome é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function useSignUpController() {
	const {
		register,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["signUp"],
		mutationFn: async (data: SignupParams) => {
			return await authService.signUp(data);
		},
	});

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			const { accessToken } = await mutateAsync(data);
			toast.success("Conta criada com sucesso!");
			console.log(accessToken);
		} catch {
			toast.error("Ocorreu um erro ao criar sua conta.");
		}
	});

	return { register, handleSubmit, errors, isPending };
}
