import axios, { type AxiosResponse } from "axios";

// Interface for responses for field values on profile/shift creation forms

interface Skill {
  id: number;
  name: string;
}

// BASE_URL => "http://localhost:8000/lookup";
const BASE_URL = `${import.meta.env.VITE_API_URL}/lookup`;

const getSkills = async (): Promise<Skill[]> => {
  const endpoint = BASE_URL + "/skills";
  const response: AxiosResponse<Skill[]> = await axios.get(endpoint);

  return response.data;
};

const lookupServices = { getSkills };

export default lookupServices;
