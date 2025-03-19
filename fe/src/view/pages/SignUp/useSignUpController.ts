import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";

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

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		const { accessToken } = await authService.signUp(data);

		console.log(accessToken);
	});

	return { register, handleSubmit, errors };
}
