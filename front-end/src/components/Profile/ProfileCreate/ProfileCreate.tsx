import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import lookupServices from "../../../services/lookupAPI";

import "./ProfileCreate.css";

function ProfileCreate() {
  const [profileType, setProfileType] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    lookupServices.getSkills().then((skills) => {
      setSkills(
        skills.map((skill) => ({ value: skill.id, label: skill.name }))
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
          <fieldset className="profile-form">
            <h3>Personal Information</h3>
            <div className="personal-names">
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="first_name">First name</Form.Label>
                <Form.Control
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="last_name">Last Name</Form.Label>
                <Form.Control
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="last_name">
                  Display Name (optional)
                </Form.Label>
                <Form.Control
                  id="display_name"
                  name="display_name"
                  type="text"
                />
              </Form.Group>
            </div>
            <div className="personal-data">
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="date_of_birth">Date of Birth</Form.Label>
                <Form.Control
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="phone">Phone Number</Form.Label>
                <Form.Control
                  id="phone"
                  name="phone"
                  type="text"
                  pattern="[0-9+\+\s()]+"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="post-code">
                  Eircode (Postal code)
                </Form.Label>
                <Form.Control
                  id="post-code"
                  name="post-code"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
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
            </div>
            <h3>Getting to know you</h3>
            <div className="volunteer-motivation">
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="skills">
                  What skills or previous experiences do you have?
                </Form.Label>
                <Select
                  id="skills"
                  name="skills"
                  isMulti
                  closeMenuOnSelect={false}
                  options={skills}
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="interests">
                  What do you enjoy? How would you like to help?
                </Form.Label>
                <Select
                  id="interests"
                  name="interests"
                  isMulti
                  closeMenuOnSelect={false}
                  options={skills}
                />
              </Form.Group>
              <Form.Group className="entry-volunteer">
                <Form.Label HTMLFor="languages">
                  What languages do you speak?
                </Form.Label>
                <Select
                  id="interests"
                  name="interests"
                  isMulti
                  closeMenuOnSelect={false}
                  options={skills}
                />
              </Form.Group>
            </div>
            <Form.Group className="bio-volunteer">
              <Form.Label HTMLFor="bio">
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
