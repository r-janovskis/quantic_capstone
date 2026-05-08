import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import type { MultiValue } from "react-select";
import lookupServices from "../../../services/lookupAPI";

import "./ProfileCreate.css";

function ProfileCreate() {
  type Option = {
    value: number;
    label: string;
  };

  const [profileType, setProfileType] = useState("");

  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSInterests, setSelectedInterestes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVolunteerFormSubmit = (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    // We stop default behaviour
    event.preventDefault();

    const form = event.currentTarget;
    console.log(selectedSkills.map((skill) => skill.value));
  };

  useEffect(() => {
    lookupServices.getSkills().then((skills) => {
      setSkills(
        skills.map((skill) => ({ value: skill.id, label: skill.name }))
      );
    });
    lookupServices.getLanguages().then((languages) => {
      setLanguages(
        languages.map((language) => ({
          value: language.id,
          label: language.language,
        }))
      );
    });
  }, []);

  const handleProfileTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfileType(event.currentTarget.value);
  };

  return (
    <main>
      <h1>Registration</h1>
      <fieldset className="user-type-selection">
        <Form.Group className="user-type-options">
          <Form.Check
            type="radio"
            name="profile-type"
            label="Volunteer"
            value="volunteer"
            onChange={handleProfileTypeChange}
          />
          <Form.Check
            type="radio"
            name="profile-type"
            label="Organiser"
            value="organiser"
            onChange={handleProfileTypeChange}
          />
        </Form.Group>
        <Form.Text>
          Which one is you?
          <ul>
            <li>
              <span className="bold">Volunteer:</span> You want to volunteer
              your time for a good cause
            </li>
            <li>
              <span className="bold">Organiser:</span> You want to plan and
              organise events
            </li>
          </ul>
        </Form.Text>
      </fieldset>
      {profileType === "volunteer" && (
        <Form
          className="registration-form"
          onSubmit={handleVolunteerFormSubmit}
        >
          <fieldset className="display-info-section">
            <h3>Display Information</h3>
            <div className="display-info-layout">
              <div className="avatar-section">
                <div className="avatar-preview">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview ?? undefined}
                      alt="Avatar preview"
                    />
                  ) : (
                    <span className="avatar-placeholder">No image</span>
                  )}
                </div>
                <Form.Group>
                  <Form.Label htmlFor="avatar">Profile Picture</Form.Label>
                  <Form.Control
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/jpeg, image/png image/webp"
                    onChange={handleAvatarChange}
                  />
                  <Form.Text>JPEG, PNG, or WebP - max 2MB</Form.Text>
                </Form.Group>
              </div>
              <div className="display-name-section">
                <Form.Group>
                  <Form.Label htmlFor="display_name">Display Name</Form.Label>
                  <Form.Control
                    id="display_name"
                    name="display_name"
                    type="text"
                    required
                  />
                </Form.Group>
              </div>
            </div>
          </fieldset>
          <fieldset className="profile-form">
            <h3>Personal Information</h3>
            <div className="personal-data">
              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="first_name">First name</Form.Label>
                <Form.Control
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="last_name">Last Name</Form.Label>
                <Form.Control
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                />
              </Form.Group>

              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="date_of_birth">Date of Birth</Form.Label>
                <Form.Control
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="phone">Phone Number</Form.Label>
                <Form.Control
                  id="phone"
                  name="phone"
                  type="text"
                  pattern="[0-9\+\s\(\)]+"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="post-code">Postal code</Form.Label>
                <Form.Control
                  id="post-code"
                  name="post-code"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="location">Location</Form.Label>
                <Form.Select id="location" name="location" required>
                  <option value="">Select a country</option>
                  <option value="Ireland">Ireland</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Spain">Spain</option>
                  <option value="Portugal">Portugal</option>
                  <option value="France">France</option>
                </Form.Select>
              </Form.Group>
            </div>
            <h3>Getting to know you</h3>
            <div className="volunteer-motivation">
              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="skills">
                  What skills or previous experiences do you have?
                </Form.Label>
                <Select
                  id="skills"
                  name="skills"
                  isMulti
                  closeMenuOnSelect={false}
                  options={skills}
                  onChange={(selected: MultiValue<Option>) =>
                    setSelectedSkills([...selected])
                  }
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="interests">
                  What do you enjoy? How would you like to help?
                </Form.Label>
                <Select
                  id="interests"
                  name="interests"
                  isMulti
                  closeMenuOnSelect={false}
                  options={skills}
                  onChange={(selected: MultiValue<Option>) =>
                    setSelectedInterestes([...selected])
                  }
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label htmlFor="languages">
                  What languages do you speak?
                </Form.Label>
                <Select
                  id="languages"
                  name="languages"
                  isMulti
                  closeMenuOnSelect={false}
                  options={languages}
                  onChange={(selected: MultiValue<Option>) =>
                    setSelectedLanguages([...selected])
                  }
                />
              </Form.Group>
            </div>
            <Form.Group className="bio-volunteer">
              <Form.Label htmlFor="bio">
                Could you tell us a bit more about yourslef?
              </Form.Label>
              <Form.Control
                id="bio"
                name="bio"
                as="textarea"
                rows={5}
                placeholder="Describe yourslef..."
              />
            </Form.Group>
            <Button type="submit">Crete Profile</Button>
          </fieldset>
        </Form>
      )}
      {profileType === "organiser" && (
        <Form>
          <fieldset className="organiser-form">
            <h2>Organiser form</h2>
          </fieldset>
        </Form>
      )}
    </main>
  );
}

export default ProfileCreate;
