/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "react-bootstrap";
import "./SignUp.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/accountReducer";
import * as userClient from "../../clients/userClient";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = async () => {
    const currentUser = await userClient.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/UpNext/Home");
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="fw-bold display-5 mt-5 mb-3 text-center">UpNext</h1>
        <div
          id="signup-form"
          className="border border-5 d-flex flex-column py-4 px-5 fs-5"
        >
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="bg-transparent text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="lg"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="bg-transparent text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="verifyPassword">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                size="lg"
                type={showPassword ? "text" : "password"}
                placeholder="Verify Password"
                className="bg-transparent text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter First Name"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                className="bg-transparent text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Last Name"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                className="bg-transparent text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="lg"
                type="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="bg-transparent text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Check
                type="radio"
                name="role"
                label="Regular User"
                onChange={(e) =>
                  setUser({ ...user, role: e.target.value })
                }
                value={"USER"}
                className="bg-transparent text-white"
              />
              <Form.Check
                type="radio"
                name="role"
                label="System Administrator"
                value={"ADMIN"}
                onChange={(e) =>
                  setUser({ ...user, role: e.target.value })
                }
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
              Already have an account? <br />
              <Link to="/UpNext/LogIn" className="text-white">
                Log In
              </Link>
            </div>
            <Button
              size="lg"
              id="signup-button"
              className="ms-3 border-0"
              onClick={signUp}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
