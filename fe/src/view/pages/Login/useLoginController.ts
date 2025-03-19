import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { httpClient } from "../../../app/services/httpClient";

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
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		const parseResult = schema.safeParse(data);

		if (parseResult.success) {
			await httpClient.post("/auth/signin", data);
		}
	});

	return { register, handleSubmit, errors };
}
