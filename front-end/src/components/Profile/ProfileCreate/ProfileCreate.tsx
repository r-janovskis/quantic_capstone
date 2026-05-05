import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Select from "react-select";

import "./ProfileCreate.css";

function ProfileCreate() {
  const [profileType, setProfileType] = useState("");

  const interests = [
    { value: "music", label: "Music" },
    { value: "cooking", label: "Cooking" },
    { value: "coding", label: "Coding" },
    { value: "outdoors", label: "Outdoors" },
    { value: "reading", label: "Reading" },
    { value: "animals", label: "Animals" },
  ];

  const handleProfileTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfileType(event.currentTarget.value);
  };

  return (
    <main>
      <h1>Registration</h1>
      <Form>
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
            Which one to pick?
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
          <fieldset className="volunteer-form">
            <h2>Volunteer form</h2>
            <Form.Group>
              <Form.Label HTMLFor="first_name">First name</Form.Label>
              <Form.Control
                id="first_name"
                name="first_name"
                type="text"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label HTMLFor="last_name">Last Name</Form.Label>
              <Form.Control
                id="last_name"
                name="last_name"
                type="text"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label HTMLFor="phone">Phone Number</Form.Label>
              <Form.Control
                id="phone"
                name="phone"
                type="text"
                pattern="[0-9+\+\s()]+"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label HTMLFor="location">Location</Form.Label>
              <Form.Select id="location" name="location" required>
                <option value="">Select a country</option>
                <option value="Ireland">Ireland</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Spain">Spain</option>
                <option value="Portugal">Portugal</option>
                <option value="France">France</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label HTMLFor="interests">Interests/Skills</Form.Label>
              <Select
                id="interests"
                name="interests"
                isMulti
                closeMenuOnSelect={false}
                options={interests}
              />
            </Form.Group>
          </fieldset>
        )}
        {profileType === "organiser" && (
          <fieldset className="organiser-form">
            <h2>Organiser form</h2>
          </fieldset>
        )}
      </Form>
    </main>
  );
}

export default ProfileCreate;
