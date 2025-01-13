import { Api } from "../config/interceptor";

const url = "http://localhost:5000/auth";

const AuthService = {};

AuthService.Signin = async (data) => Api.post(`${url}/login`, data);
AuthService.Signup = async (data) => Api.post(`${url}/register`, data);

export default AuthService;
