import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

	const handleSubmit = hookFormHandleSubmit((data) => {
		const parseResult = schema.safeParse(data);

		if (parseResult.success) {
			console.log("Data:", parseResult.data);
		}
	});

	return { register, handleSubmit, errors };
}
