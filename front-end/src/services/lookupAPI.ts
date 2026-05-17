import axios, { type AxiosResponse } from "axios";

// Interface for responses for field values on profile/shift creation forms
import type { LookupResponse } from "../types";

type LookupEndpoint =
  | "skills"
  | "interests"
  | "languages"
  | "shirt_sizes"
  | "countries"
  | "days"
  | "time_periods";

// BASE_URL => "http://localhost:8000/lookup";
const BASE_URL = `${import.meta.env.VITE_API_URL}/lookup`;

const getLookupData = async (
  lookupData: LookupEndpoint
): Promise<LookupResponse[]> => {
  const endpoint = `${BASE_URL}/${lookupData}`;
  const response: AxiosResponse<LookupResponse[]> = await axios.get(endpoint);

  return response.data;
};

const lookupServices = {
  getLookupData,
};

export default lookupServices;
