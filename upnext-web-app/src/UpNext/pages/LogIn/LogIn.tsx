import { Button, Form } from "react-bootstrap";
import "./LogIn.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const logIn = () => {
    navigate("/UpNext/Home");
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="fw-bold display-5 mt-5 mb-3 text-center">UpNext</h1>
        <div
          id="login-form"
          className="border border-5 d-flex flex-column py-4 px-5 fs-5"
        >
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Username"
                className="bg-transparent text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="lg"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="bg-transparent text-white"
              />
            </Form.Group>
          </Form>

          <Form.Check
            type="checkbox"
            label="Show Password"
            className="fs-6 mt-2"
            onClick={() => setShowPassword(!showPassword)}
          />

          <div className="d-flex justify-content-end mt-2">
            <div className="fs-6">
              Don't have an account? <br />
              <Link to="/UpNext/SignUp" className="text-white">
                Sign Up
              </Link>
            </div>
            <Button
              size="lg"
              id="login-button"
              className="ms-3 border-0"
              onClick={logIn}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
