import { Alert, Button, Form } from "react-bootstrap";
import "./SignUp.css";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { clearErrorMessage } from "../../redux/errorReducer";
import useAuth from "../../hooks/useAuth";

/**
 * Component that allows users to register and create a new account.
 * It provides a form for users to enter their username, password, and verify password.
 */
export default function SignUp() {
  const dispatch = useDispatch();

  const { errorMessage, user, setUser, showPassword, setShowPassword, signUp } =
    useAuth();

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
                value={user.verifyPassword}
                onChange={(e) =>
                  setUser({ ...user, verifyPassword: e.target.value })
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
              disabled={
                user.username.length < 1 ||
                user.password.length < 1 ||
                user.verifyPassword.length < 1
              }
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
