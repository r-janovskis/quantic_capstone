import { useState, useEffect } from "react";
import lookupServices from "../services/lookupAPI";

import type { Option, LookupResponse } from "../types";

function useLookupData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [skills, setSkills] = useState<Option[]>([]);
  const [languages, setLanguages] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);
  const [shirtSizes, setShirtSizes] = useState<Option[]>([]);
  const [interests, setInterests] = useState<Option[]>([]);
  const [days, setDays] = useState<Option[]>([]);
  const [timePeriods, setTimePeriods] = useState<Option[]>([]);

  // This is a list of all the lookup
  // Order in this list needs to match the order in which the API returns the data
  // look at list under .then()
  const LOOKUP_OPTIONS = [
    "skills",
    "interests",
    "languages",
    "countries",
    "shirt_sizes",
    "days",
    "time_periods",
  ] as const;

  // Helper function to map lookup data to options
  const mapToOptions = (data: LookupResponse[]) =>
    data.map((item) => ({ value: item.id, label: item.name }));

  useEffect(() => {
    Promise.all(
      LOOKUP_OPTIONS.map((option) => lookupServices.getLookupData(option))
    )
      .then(
        ([
          skills,
          interests,
          languages,
          countries,
          shirtSizes,
          days,
          timePeriods,
        ]) => {
          setSkills(mapToOptions(skills));
          setInterests(mapToOptions(interests));
          setLanguages(mapToOptions(languages));
          setCountries(mapToOptions(countries));
          setShirtSizes(mapToOptions(shirtSizes));
          setDays(mapToOptions(days));
          setTimePeriods(mapToOptions(timePeriods));
          setLoading(false);
        }
      )
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);
  return {
    skills,
    interests,
    languages,
    countries,
    shirtSizes,
    days,
    timePeriods,
    loading,
    error,
  };
}

export default useLookupData;
