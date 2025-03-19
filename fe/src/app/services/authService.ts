import { httpClient } from "./httpClient";

interface SignupParams {
	name: string;
	email: string;
	password: string;
}

interface SigninParams {
	email: string;
	password: string;
}

async function signUp(params: SignupParams) {
	const { data } = await httpClient.post("/auth/signup", params);
	return data;
}

async function signIn(params: SigninParams) {
	const { data } = await httpClient.post("/auth/signin", params);
	return data;
}

export const authService = {
	signUp,
	signIn,
};
