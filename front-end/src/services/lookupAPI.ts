import axios, { type AxiosResponse } from "axios";

// Interface for responses for field values on profile/shift creation forms

interface Skill {
  id: number;
  name: string;
}

interface Language {
  id: number;
  language: string;
}

// BASE_URL => "http://localhost:8000/lookup";
const BASE_URL = `${import.meta.env.VITE_API_URL}/lookup`;

const getSkills = async (): Promise<Skill[]> => {
  const endpoint = BASE_URL + "/skills";
  const response: AxiosResponse<Skill[]> = await axios.get(endpoint);

  return response.data;
};

const getLanguages = async (): Promise<Language[]> => {
  const endpoint = BASE_URL + "/languages";
  const response: AxiosResponse<Language[]> = await axios.get(endpoint);

  return response.data;
};

const lookupServices = { getSkills, getLanguages };

export default lookupServices;
