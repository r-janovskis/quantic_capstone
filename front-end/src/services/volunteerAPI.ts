import axios, { type AxiosResponse } from "axios";
import type { VolunteerProfileData } from "../types";

interface APIResponse {
  status: string;
  message: string;
}

interface APIRegisterResponse extends APIResponse {
  token: string;
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
  availability: { day_id: number; time_period_id: number }[];
}

interface APIVolunteerData {
  avatar_url: string | null;
  display_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  area: string;
  country_id: number;
  shirt_size_id: number;
  bio: string;
  skills: { id: number; name: string }[];
  interests: { id: number; name: string }[];
  languages: { id: number; name: string }[];
  availability: { day_id: number; time_period_id: number }[];
}

// BASE_URL => "http://localhost:8000/volunteer";
const BASE_URL = `${import.meta.env.VITE_API_URL}/volunteer`;

const register = async (
  volunteer_info: VolunteerData,
  token: string
): Promise<APIRegisterResponse> => {
  const endpoint = BASE_URL + "/register";
  const response: AxiosResponse<APIRegisterResponse> = await axios.post(
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

const getProfile = async (token: string): Promise<VolunteerProfileData> => {
  const endpoint = BASE_URL + "/me";
  const response: AxiosResponse<APIVolunteerData> = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const volunteerData = response.data;
  if (volunteerData.avatar_url) {
    volunteerData.avatar_url = `${import.meta.env.VITE_API_URL}${
      volunteerData.avatar_url
    }`;
  }

  // We need to transform data so that we can keep that transformation out of the component itself
  const profileData: VolunteerProfileData = {
    ...volunteerData,
    skills: volunteerData.skills.map((skill) => ({
      value: skill.id,
      label: skill.name,
    })),
    interests: volunteerData.interests.map((interest) => ({
      value: interest.id,
      label: interest.name,
    })),
    languages: volunteerData.languages.map((language) => ({
      value: language.id,
      label: language.name,
    })),
  };

  return profileData;
};

const updateProfile = async (
  volunteer_info: VolunteerData,
  token: string
): Promise<APIRegisterResponse> => {
  const endpoint = BASE_URL + "/me";
  const response: AxiosResponse<APIRegisterResponse> = await axios.put(
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

const volunteerServices = { register, uploadAvatar, getProfile, updateProfile };

export default volunteerServices;
