import { useState, useEffect } from "react";
import lookupServices from "../services/lookupAPI";

import type { Option } from "../types";

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

  useEffect(() => {
    Promise.all([
      lookupServices.getSkills(),
      lookupServices.getInterests(),
      lookupServices.getLanguages(),
      lookupServices.getCountries(),
      lookupServices.getShirtSizes(),
      lookupServices.getDays(),
      lookupServices.getTimePeriods(),
    ])
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
          setSkills(
            skills.map((skill) => ({ value: skill.id, label: skill.name }))
          );
          setInterests(
            interests.map((interests) => ({
              value: interests.id,
              label: interests.name,
            }))
          );
          setLanguages(
            languages.map((languages) => ({
              value: languages.id,
              label: languages.name,
            }))
          );
          setCountries(
            countries.map((country) => ({
              value: country.id,
              label: country.name,
            }))
          );
          setShirtSizes(
            shirtSizes.map((shirtSize) => ({
              value: shirtSize.id,
              label: shirtSize.name,
            }))
          );
          setDays([
            ...days.map((day) => ({
              value: day.id,
              label: day.name,
            })),
            { value: 8, label: "Working days" },
            { value: 9, label: "Weekend" },
          ]);
          setTimePeriods([
            ...timePeriods.map((timePeriod) => ({
              value: timePeriod.id,
              label: timePeriod.name,
            })),
            { value: 4, label: "Whole day" },
          ]);
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
