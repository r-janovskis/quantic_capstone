import { useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Login.css";

function Login() {
  const [validated, setValidated] = useState(false);
  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    //event.preventDefault();
    let email: string = event.target.email.value;
    let password: string = event.target.password.value;
    const form: HTMLFormElement = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    alert(`Form submitted\n${email}\n${password}`);
  };

  return (
    <main>
      <section className="login-page">
        <h1>Login</h1>
        <Form
          className="login-form"
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
            <Form.Label column sm={2}>
              Password:
            </Form.Label>
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password..."
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" size="lg">
            Login
          </Button>
        </Form>
      </section>
      <section className="link-to-signup">
        <p>Don't have an account yet?</p>
        <NavLink to="/auth/signup">Sign Up</NavLink>
      </section>
    </main>
  );
}

export default Login;
