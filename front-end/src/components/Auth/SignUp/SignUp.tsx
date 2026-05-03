import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import authServices from "../../../services/authAPI";

import "./SignUp.css";

function SignUp() {
  const [validated, setValidated] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [APIMessage, setAPIMessage] = useState("");

  const navigate = useNavigate();

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    const checks = {
      length: password.length >= 10,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^a-zA-Z0-9]/.test(password),
    };
    setPasswordChecks(checks);

    const allPass = Object.values(checks).every(Boolean);
    event.currentTarget.setCustomValidity(
      allPass ? "" : "Password does not meet requirements"
    );
  };

  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const form: HTMLFormElement = event.currentTarget.form!;
    const password = form.elements.namedItem("password") as HTMLInputElement;

    if (event.currentTarget.value !== password.value) {
      event.currentTarget.setCustomValidity("Passwords don't match!");
      setPasswordError("Passwords don't match!");
    } else {
      event.currentTarget.setCustomValidity("");
      setPasswordError("");
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    const form: HTMLFormElement = event.currentTarget;

    // We always want to stay on the signup page
    event.preventDefault();

    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;
    const confirmPassword = form.elements.namedItem(
      "confirm_password"
    ) as HTMLInputElement;

    // Check if password matches our criteria
    // If it doesn't and user tries to brute force => we block him
    if (
      !passwordChecks.length ||
      !passwordChecks.uppercase ||
      !passwordChecks.number ||
      !passwordChecks.specialChar
    ) {
      setValidated(true);
      return;
    }

    // Check if passwords match and user just tries to brute force it
    // In that case we block it
    if (confirmPassword.value !== password.value) {
      setValidated(true);
      return;
    }

    // If we had set custom validity error for email we remove it
    email.setCustomValidity("");

    // Form is valid
    if (form.checkValidity()) {
      setValidated(true);
      // we send data to back end
      authServices
        .signUp(email.value, password.value)
        .then((response) => {
          if (response.status === "Success") {
            setShowMessage(true);
            setMessageType("success");
            setAPIMessage(response.message);
            setTimeout(() => navigate("/auth/login"), 2000);

            // Scenario where email address is already in use...
          } else {
            setShowMessage(true);
            setMessageType("danger");
            setAPIMessage(response.message);
            email.setCustomValidity(response.message);
            // alert(`Status: ${response.status}\nMessage: ${response.message}`);
          }
        })
        // Handle errors where we don't even reach the server
        // or don't get the response
        .catch(() => {
          setShowMessage(true);
          setMessageType("danger");
          setAPIMessage("Couldn not reach the server. Please try again later.");
        });
    }
  };

  return (
    <main className="signup-page">
      <h1>Sign Up</h1>
      <Form
        className="signup-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="row">
          <Form.Label htmlFor="email">Email:</Form.Label>

          <Form.Control
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email..."
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            required
          />
        </Form.Group>
        <Form.Group className="row">
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password..."
            onChange={handlePassword}
            required
          />
          <ul className="password-checklist">
            <li style={{ color: passwordChecks.length ? "green" : "red" }}>
              At least 10 characters
            </li>
            <li style={{ color: passwordChecks.uppercase ? "green" : "red" }}>
              At least one capital letter
            </li>
            <li style={{ color: passwordChecks.number ? "green" : "red" }}>
              At least one number
            </li>
            <li style={{ color: passwordChecks.specialChar ? "green" : "red" }}>
              At least one special character
            </li>
          </ul>
        </Form.Group>
        <Form.Group className="row">
          <Form.Label htmlFor="confirm_password">Repeat Password:</Form.Label>
          <Form.Control
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="Repeat your password..."
            onChange={handleConfirmPassword}
            isInvalid={!!passwordError}
            required
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" size="lg">
          Sign Up
        </Button>
      </Form>
      <Alert show={showMessage} variant={messageType}>
        {APIMessage}
      </Alert>
      <section className="link-to-login">
        <p>Already have an account?</p>
        <NavLink to="/auth/login">Login</NavLink>
      </section>
    </main>
  );
}

export default SignUp;
