import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import MultiSelectField from "../../shared/MultiSelectField/MultiSelectField";
import AvatarUpload from "../../shared/AvatarUpload/AvatarUpload";
import SlotList from "../../shared/SlotList/SlotList";
import VolunteerAvailabilitySlot from "../VolunteerAvailabilitySlot/VolunteerAvailabilitySlot";

import useLookupData from "../../../hooks/useLookupData";
import volunteerServices from "../../../services/volunteerAPI";

import type { Option, VolunteerProfileData } from "../../../types";
import type { VolunteerSlot } from "../VolunteerAvailabilitySlot/VolunteerAvailabilitySlot";

import { useHeaderRefresh } from "../../../context/HeaderContext";

import "./VolunteerProfile.css";

function VolunteerProfile({ mode }: { mode: "create" | "edit" }) {
  const navigate = useNavigate();

  // Values we use to visualize form field validity
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    skills: false,
    interests: false,
    languages: false,
  });

  const [ageFeedback, setAgeFeedback] = useState("");

  // Values we load from API calls and display in dropdowns
  const {
    skills,
    languages,
    countries,
    shirtSizes,
    interests,
    days,
    timePeriods,
    loading,
    error,
  } = useLookupData();

  // Managing selected values in multi-select fields
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Option[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);
  // Managing selected availability slots
  const [selectedSlots, setSelectedSlots] = useState<VolunteerSlot[]>([]);

  // For displaying messages in case something went wrong while registering volunteer
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [APIMessage, setAPIMessage] = useState({ status: "", message: "" });

  const [profileData, setProfileData] = useState<VolunteerProfileData | null>(
    null
  );

  // We define it here so we can use it later when we want to submit update
  // and refresh the header in case the user changed their display information
  const { refresh } = useHeaderRefresh();

  const handleVolunteerFormSubmit = (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    // We stop default behaviour
    event.preventDefault();

    // Do custom react-select (multi-select) field validation
    const hasErrors = {
      skills: selectedSkills.length === 0,
      interests: selectedInterests.length === 0,
      languages: selectedLanguages.length === 0,
    };
    setErrors(hasErrors);

    const form = event.currentTarget;
    const date_of_birth = form.elements.namedItem(
      "date_of_birth"
    ) as HTMLInputElement;

    // Check if age is less than 18 years old
    if (
      Date.now() - Date.parse(date_of_birth.value) <
      18 * 365 * 24 * 60 * 60 * 1000
    ) {
      date_of_birth.setCustomValidity(
        "You must be at least 18 years old to register!"
      );
      setAgeFeedback("You must be at least 18 years old to register!");
    } else {
      date_of_birth.setCustomValidity("");
      setAgeFeedback("");
    }

    // Do custom form validation
    if (form.checkValidity() && !Object.values(hasErrors).some(Boolean)) {
      // Let's get form data and create volunteer object that we will send to API endpoint
      const formData = new FormData(form);
      const volunteerData = {
        display_name: formData.get("display_name") as string,
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        phone: formData.get("phone") as string,
        date_of_birth: formData.get("date_of_birth") as string,
        area: formData.get("area") as string,
        country_id: Number(formData.get("country")),
        shirt_size_id: Number(formData.get("shirt_size")),
        bio: formData.get("bio") as string,
        skill_ids: selectedSkills.map((skill) => skill.value),
        interest_ids: selectedInterests.map((interest) => interest.value),
        language_ids: selectedLanguages.map((language) => language.value),
        availability: selectedSlots
          .filter((slot) => slot.day_id && slot.timePeriod_id)
          .map((slot) => ({
            day_id: slot.day_id,
            time_period_id: slot.timePeriod_id,
          })),
      };

      const token = localStorage.getItem("token") ?? "";

      // For create mode we want to hit endpoint POST /volunteer/register
      // Everything else is pretty much the same
      const apiCall =
        mode === "create"
          ? volunteerServices.register(volunteerData, token)
          : volunteerServices.updateProfile(volunteerData, token);

      apiCall
        .then((response) => {
          // Check if we need to upload avatar image too
          const avatarFile = formData.get("avatar") as File | null;
          if (avatarFile && avatarFile.size > 0) {
            volunteerServices.uploadAvatar(avatarFile, token).catch(() => {
              setMessageType("warning");
              setAPIMessage({
                status: response.status,
                message: response.message,
              });
              setShowMessage(true);
            });
          }
          if (mode === "create" && response.token) {
            localStorage.setItem("token", response.token);
          } else {
            refresh();
          }
          navigate("/volunteer/dashboard");
        })
        .catch((error) => {
          setMessageType("danger");
          setAPIMessage({
            status: error.response.status,
            message: error.response.data.detail,
          });
          setShowMessage(true);
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    if (mode === "edit") {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth/login");
        return;
      }

      volunteerServices.getProfile(token).then((response) => {
        setProfileData(response);
        setSelectedSkills(response.skills);
        setSelectedInterests(response.interests);
        setSelectedLanguages(response.languages);
        setSelectedSlots(
          response.availability.map((slot, index) => ({
            id: index + 1,
            day_id: slot.day_id,
            timePeriod_id: slot.time_period_id,
          }))
        );
      });
    }
  }, []);

  const SlotWithOptions = (props: {
    slot: VolunteerSlot;
    onChange: (update: VolunteerSlot) => void;
  }) => (
    <VolunteerAvailabilitySlot
      {...props}
      dayOptions={days}
      timePeriodOptions={timePeriods}
    />
  );

  if (loading) return <p>Loading...</p>;
  if (mode === "edit" && !profileData) return <p>Loading...</p>;
  if (error)
    return (
      <Alert variant="danger">
        Failed to load data for form. Please refresh the page.
      </Alert>
    );

  return (
    <>
      <Form
        className="registration-form"
        noValidate
        validated={validated}
        onSubmit={handleVolunteerFormSubmit}
      >
        <fieldset className="display-info-section">
          <h3>Display Information</h3>
          <div className="display-info-layout">
            <AvatarUpload currentAvatar={profileData?.avatar_url ?? ""} />
            <div className="display-name-section">
              <Form.Group>
                <Form.Label htmlFor="display_name">Display Name</Form.Label>
                <Form.Control
                  id="display_name"
                  name="display_name"
                  type="text"
                  defaultValue={profileData?.display_name ?? ""}
                  required
                />
              </Form.Group>
            </div>
          </div>
        </fieldset>
        <fieldset className="personal-info-section">
          <h3>Personal Information</h3>
          <div className="personal-data">
            <Form.Group className="entry-volunteer">
              <Form.Label htmlFor="first_name">First name</Form.Label>
              <Form.Control
                id="first_name"
                name="first_name"
                type="text"
                defaultValue={profileData?.first_name ?? ""}
                required
              />
            </Form.Group>
            <Form.Group className="entry-volunteer">
              <Form.Label htmlFor="last_name">Last Name</Form.Label>
              <Form.Control
                id="last_name"
                name="last_name"
                type="text"
                defaultValue={profileData?.last_name ?? ""}
                required
              />
            </Form.Group>

            <Form.Group className="entry-volunteer">
              <Form.Label htmlFor="date_of_birth">Date of Birth</Form.Label>
              <Form.Control
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                isInvalid={ageFeedback !== ""}
                defaultValue={profileData?.date_of_birth ?? ""}
                required
              />
              <Form.Control.Feedback type="invalid">
                {ageFeedback}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="entry-volunteer">
              <Form.Label htmlFor="phone">Phone Number</Form.Label>
              <Form.Control
                id="phone"
                name="phone"
                type="text"
                pattern="[0-9\+\s\(\)]+"
                defaultValue={profileData?.phone ?? ""}
                required
              />
            </Form.Group>
            <Form.Group className="entry-volunteer">
              <Form.Label htmlFor="area">City/Town/Region</Form.Label>
              <Form.Control
                id="area"
                name="area"
                type="text"
                defaultValue={profileData?.area ?? ""}
                required
              />
              <Form.Text>City, town or region you are from</Form.Text>
            </Form.Group>
            <Form.Group className="entry-volunteer">
              <Form.Label htmlFor="country">Country</Form.Label>
              <Form.Select
                id="country"
                name="country"
                defaultValue={profileData?.country_id ?? 0}
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => {
                  return (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </div>
        </fieldset>
        <fieldset className="volunteer-motivation">
          <h3>Getting to know you</h3>
          <div className="volunteer-motivation-lists">
            <MultiSelectField
              id="skills"
              label="What skills (previous experiences) do you have?"
              value={selectedSkills}
              options={skills}
              onChange={(selected: Option[]) => {
                setSelectedSkills([...selected]);
                if (selected.length > 0)
                  setErrors((prev) => ({ ...prev, skills: false }));
              }}
              isInvalid={errors.skills}
            />
            <MultiSelectField
              id="interests"
              label="Where would you like to volunteer?"
              value={selectedInterests}
              options={interests}
              onChange={(selected: Option[]) => {
                setSelectedInterests([...selected]);
                if (selected.length > 0)
                  setErrors((prev) => ({ ...prev, interests: false }));
              }}
              isInvalid={errors.interests}
            />
            <MultiSelectField
              id="languages"
              label="What languages do you speak?"
              value={selectedLanguages}
              options={languages}
              onChange={(selected: Option[]) => {
                setSelectedLanguages([...selected]);
                if (selected.length > 0)
                  setErrors((prev) => ({ ...prev, languages: false }));
              }}
              isInvalid={errors.languages}
            />
            <Form.Group className="entry-volunteer">
              <Form.Label htmlFor="shirt_size">
                What t-shirt size do you prefer?
              </Form.Label>
              <Form.Select
                id="shirt_size"
                name="shirt_size"
                defaultValue={profileData?.shirt_size_id ?? 0}
                required
              >
                <option value="">Select T-shirt size</option>
                {shirtSizes.map((size) => {
                  return (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group className="bio-volunteer">
            <Form.Label htmlFor="bio">
              Could you tell us a bit more about yourself?
            </Form.Label>
            <Form.Control
              id="bio"
              name="bio"
              as="textarea"
              rows={5}
              placeholder="Describe yourself..."
              defaultValue={profileData?.bio ?? ""}
              required
            />
          </Form.Group>
        </fieldset>
        <fieldset className="volunteer-availability">
          <h3>Your availability</h3>
          <SlotList
            SlotComponent={SlotWithOptions}
            createEmptySlot={(id) => ({
              id,
              day_id: null,
              timePeriod_id: null,
            })}
            initialSlots={selectedSlots}
            onChange={setSelectedSlots}
          />
        </fieldset>
        {mode === "create" ? (
          <Button type="submit">Create Profile</Button>
        ) : (
          <div className="button-container">
            <Button type="submit">Save Changes</Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        )}
      </Form>
      <Alert show={showMessage} variant={messageType}>
        <p>Status code: {APIMessage.status}</p>
        <p>Message: {APIMessage.message}</p>
      </Alert>
    </>
  );
}

export default VolunteerProfile;
