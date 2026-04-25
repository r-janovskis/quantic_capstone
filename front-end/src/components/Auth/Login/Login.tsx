import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Login.css";

function Login() {
  return (
    <section className="login-page">
      <h1>Login</h1>
      <Form className="login-form">
        <Form.Group className="row">
          <Form.Label>Email:</Form.Label>

          <Form.Control
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
  );
}

export default Login;
