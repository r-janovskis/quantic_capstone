import { useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Check if passwords match and user just tries to brute force it
    // In that case we block it
    if (confirmPassword.value !== password.value) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      alert(
        `Form submitted\n${email.value}\n${password.value}\n${confirmPassword.value}`
      );
    }

    setValidated(true);
  };

  return (
    <main>
      <section className="signup-page">
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
      </section>
      <section className="link-to-login">
        <p>Already have an account yet?</p>
        <NavLink to="/auth/login">Login</NavLink>
      </section>
    </main>
  );
}

export default SignUp;
