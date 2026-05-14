import axios, { type AxiosResponse } from "axios";

// Interface for responses for field values on profile/shift creation forms

interface LookupResponse {
  id: number;
  name: string;
}

// BASE_URL => "http://localhost:8000/lookup";
const BASE_URL = `${import.meta.env.VITE_API_URL}/lookup`;

const getSkills = async (): Promise<LookupResponse[]> => {
  const endpoint = BASE_URL + "/skills";
  const response: AxiosResponse<LookupResponse[]> = await axios.get(endpoint);

  return response.data;
};

const getLanguages = async (): Promise<LookupResponse[]> => {
  const endpoint = BASE_URL + "/languages";
  const response: AxiosResponse<LookupResponse[]> = await axios.get(endpoint);

  return response.data;
};

const getCountries = async (): Promise<LookupResponse[]> => {
  const endpoint = BASE_URL + "/countries";
  const response: AxiosResponse<LookupResponse[]> = await axios.get(endpoint);

  return response.data;
};

const getShirtSizes = async (): Promise<LookupResponse[]> => {
  const endpoint = BASE_URL + "/shirt_sizes";
  const response: AxiosResponse<LookupResponse[]> = await axios.get(endpoint);

  return response.data;
};

const getInterests = async (): Promise<LookupResponse[]> => {
  const endpoint = BASE_URL + "/interests";
  const response: AxiosResponse<LookupResponse[]> = await axios.get(endpoint);

  return response.data;
};

const getDays = async (): Promise<LookupResponse[]> => {
  const endpoint = BASE_URL + "/days";
  const response: AxiosResponse<LookupResponse[]> = await axios.get(endpoint);

  return response.data;
};

const getTimePeriods = async (): Promise<LookupResponse[]> => {
  const endpoint = BASE_URL + "/time_periods";
  const response: AxiosResponse<LookupResponse[]> = await axios.get(endpoint);

  return response.data;
};

const lookupServices = {
  getSkills,
  getLanguages,
  getCountries,
  getShirtSizes,
  getInterests,
  getDays,
  getTimePeriods,
};

export default lookupServices;
