import axios, { type AxiosResponse } from "axios";

interface AuthResponse {
  status: string;
  message: string;
  token?: string;
}

const BASE_URL = "http://localhost:8000/auth";

async function signUp(email: string, password: string): Promise<AuthResponse> {
  const endpoint: string = `${BASE_URL}/signup`;
  const response: AxiosResponse<AuthResponse> = await axios.post(endpoint, {
    email,
    password,
  });
  return response.data;
}

const authServices = { signUp };

export default authServices;
