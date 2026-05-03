import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import authServices from "../../../services/authAPI";

import "./Login.css";

function Login() {
  const [validated, setValidated] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [APIMessage, setAPIMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    let password = form.elements.namedItem("password") as HTMLInputElement;

    // Clear custom validity errro from email field
    // In case we had set it previously (like email is already in use)
    email.setCustomValidity("");

    if (form.checkValidity()) {
      authServices
        .login(email.value, password.value)
        .then((response) => {
          if (response.status === "Success") {
            setMessageType("success");
            setAPIMessage(
              `Message: ${response.message}\nToken: ${response.token}\nUser status: ${response.user_status}`
            );
            // Set the token in local storage so we get access to protected routes later
            localStorage.setItem("token", response.token);
            // Based on user type (volunteer or organisation) we direct them to the correct route
            if (response.user_status === 1) {
              navigate("/profile/create");
            }
          } else if (response.status === "Error") {
            setMessageType("danger");
            setAPIMessage(`Message; ${response.message}`);

            email.setCustomValidity("response.message");
          }
        })
        .catch(() => {
          setMessageType("danger");
          setAPIMessage("Something went wrong! Please try again later.");
        });
      setShowMessage(true);
    }

    setValidated(true);
  };

  return (
    <main className="login-page">
      <section>
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
            <Form.Label htmlFor="password">Password:</Form.Label>
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
        <Alert show={showMessage} variant={messageType}>
          {APIMessage}
        </Alert>
      </section>
      <section className="link-to-signup">
        <p>Don't have an account yet?</p>
        <NavLink to="/auth/signup">Sign Up</NavLink>
      </section>
    </main>
  );
}

export default Login;
