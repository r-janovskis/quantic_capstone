import { useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

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

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [APIErrorMessage, setAPIErrorMessage] = useState("");

  const handlePassword: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const password: string = event.currentTarget.value;
    setPasswordChecks({
      length: password.length >= 10,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^a-zA-Z0-9]/.test(password),
    });
  };

  const handleConfirmPassword: React.ChangeEventHandler<HTMLInputElement> = (
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

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
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
      // we send data to back end
      // validate data
      const validationPassed: boolean = true;
      if (validationPassed) {
        setShowSuccess(true);
        setShowError(false);
      } else {
        setAPIErrorMessage("Email already in use!");
        setShowError(true);
        setShowSuccess(false);
        email.setCustomValidity("Email already in use!");
        setValidated(true);
      }
    }

    setValidated(true);
  };

  return (
    <main className="signup-page">
      <section>
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
              <li
                style={{ color: passwordChecks.specialChar ? "green" : "red" }}
              >
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
        <Alert show={showSuccess} variant="success">
          You have successfully signed up! Head to{" "}
          <NavLink to="/auth/login">login page</NavLink> to log in.
        </Alert>
        <Alert show={showError} variant="danger">
          {APIErrorMessage}
        </Alert>
      </section>
      <section className="link-to-login">
        <p>Already have an account?</p>
        <NavLink to="/auth/login">Login</NavLink>
      </section>
    </main>
  );
}

export default SignUp;
