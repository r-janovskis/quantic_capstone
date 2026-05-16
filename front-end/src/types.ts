type Option = {
  value: number;
  label: string;
};

type VolunteerProfileData = {
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
  skills: Option[];
  interests: Option[];
  languages: Option[];
  availability: { day_id: number; time_period_id: number }[];
};

export type { Option, VolunteerProfileData };
