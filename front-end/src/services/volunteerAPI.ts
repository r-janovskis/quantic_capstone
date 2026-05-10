import axios, { type AxiosResponse } from "axios";

interface APIResponse {
  status: string;
  message: string;
}

interface VolunteerData {
  display_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  area: string;
  country_id: number;
  shirt_size_id: number;
  bio: string;
  skill_ids: number[];
  interest_ids: number[];
  language_ids: number[];
}

// BASE_URL => "http://localhost:8000/volunteer";
const BASE_URL = `${import.meta.env.VITE_API_URL}/volunteer`;

const register = async (
  volunteer_info: VolunteerData,
  token: string
): Promise<APIResponse> => {
  const endpoint = BASE_URL + "/register";
  const response: AxiosResponse<APIResponse> = await axios.post(
    endpoint,
    volunteer_info,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const uploadAvatar = async (
  avatar_file: File,
  token: string
): Promise<APIResponse> => {
  const endpoint = BASE_URL + "/avatar";

  // We need to create a FormData object and append the file to it
  // Otherwise axios won't initiate multipart/form-data
  const formData = new FormData();
  formData.append("file", avatar_file);

  const response = await axios.post(endpoint, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const volunteerServices = { register, uploadAvatar };

export default volunteerServices;
