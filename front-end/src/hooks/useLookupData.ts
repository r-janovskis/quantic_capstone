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

  useEffect(() => {
    Promise.all([
      lookupServices.getSkills(),
      lookupServices.getInterests(),
      lookupServices.getLanguages(),
      lookupServices.getCountries(),
      lookupServices.getShirtSizes(),
    ])
      .then(([skills, interests, languages, countries, shirtSizes]) => {
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
        setLoading(false);
      })
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
    loading,
    error,
  };
}

export default useLookupData;
