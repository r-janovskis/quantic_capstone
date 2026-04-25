import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Login.css";

function Login() {
  return (
    <>
      <h1>Caritas Volunteer Login</h1>
      <Form>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email..."
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
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
    </>
  );
}

export default Login;
