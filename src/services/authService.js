import { Api } from "../config/interceptor";

const url = "/auth";

const AuthService = {};

AuthService.Signin = async (data) => Api.post(`${url}/login`, data);
AuthService.Signup = async (data) => Api.post(`${url}/register`, data);

export default AuthService;
