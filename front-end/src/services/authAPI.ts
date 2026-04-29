import axios, { type AxiosResponse } from "axios";

interface AuthResponse {
  status: string;
  message: string;
  token?: string;
  user_status?: string;
}

const BASE_URL = "http://localhost:8000/auth";

const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const endpoint: string = `${BASE_URL}/signup`;
  const response: AxiosResponse<AuthResponse> = await axios.post(endpoint, {
    email,
    password,
  });
  return response.data;
};

const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const endpoint: string = `${BASE_URL}/login`;
  const response: AxiosResponse<AuthResponse> = await axios.post(endpoint, {
    email,
    password,
  });
  return response.data;
};

const authServices = { signUp, login };

export default authServices;
