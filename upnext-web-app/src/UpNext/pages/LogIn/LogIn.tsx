/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Button, Form } from "react-bootstrap";
import "./LogIn.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/accountReducer";
import * as userClient from "../../clients/userClient";
import { clearErrorMessage, setErrorMessage } from "../../redux/errorReducer";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<any>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorMessage } = useSelector((state: any) => state.errorReducer);

  const logIn = async () => {
    const user = await userClient.signin(credentials);
    if (!user) {
      dispatch(setErrorMessage("Invalid username or password"));
      return;
    }
    dispatch(setCurrentUser(user));
    navigate("/UpNext/Home");
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        {errorMessage && (
          <div className="d-block">
            <Alert
              variant="danger"
              className="text-center mt-5 mb-3 text-center"
              onClose={() => dispatch(clearErrorMessage())}
              dismissible
            >
              <Alert.Heading>{errorMessage}</Alert.Heading>
            </Alert>
          </div>
        )}
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
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="bg-transparent text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="lg"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
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

          <div className="d-flex mt-2">
            <div className="fs-6 flex-grow-1">
              Don't have an account? <br />
              <Link to="/UpNext/Register" className="text-white">
                Sign Up
              </Link>
              <br />
              <Link to="/UpNext/Home" className="text-white" onClick={() => dispatch(setCurrentUser(null))}>
                Continue as Guest
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
