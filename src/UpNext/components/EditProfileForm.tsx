import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearErrorMessage } from "../redux/errorReducer";
import useAuth from "../hooks/useAuth";

/**
 * Form for editing the user's profile, specifically for resetting the password.
 * It includes fields for entering a new password and verifying it.
 * It also includes a checkbox to show/hide the password.
 */
export default function EditProfileForm() {
  const dispatch = useDispatch();

  const {
    errorMessage,
    showPassword,
    updatedUser,
    setUpdatedUser,
    setShowPassword,
    updateExistingUser,
    successMessage,
    setSuccessMessage,
  } = useAuth();

  return (
    <div className="d-flex">
      <div className="d-flex flex-column align-items-start w-100">
        {errorMessage && (
          <Alert
            variant="danger"
            onClose={() => dispatch(clearErrorMessage())}
            dismissible
          >
            <Alert.Heading>Failed to Reset Passwords</Alert.Heading>
            <p>{errorMessage}</p>
          </Alert>
        )}

        {successMessage && (
          <Alert
            variant="success"
            onClose={() => setSuccessMessage(null)}
            dismissible
          >
            <Alert.Heading>Success</Alert.Heading>
            <p>{successMessage}</p>
          </Alert>
        )}

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Reset Password</Form.Label>
          <Form.Control
            size="lg"
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={updatedUser.password}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, password: e.target.value })
            }
            className="bg-transparent text-white"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="verifyPassword">
          <Form.Label>Verify New Password</Form.Label>
          <Form.Control
            size="lg"
            value={updatedUser.verifyPassword}
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                verifyPassword: e.target.value,
              })
            }
            type={showPassword ? "text" : "password"}
            placeholder="Verify New Password"
            className="bg-transparent text-white"
          />
        </Form.Group>

        <div className="d-flex flex-column align-items-start">
          <Form.Check
            type="checkbox"
            label="Show Password"
            className="fs-6 mt-2"
            onClick={() => setShowPassword(!showPassword)}
          />

          <Button
            size="lg"
            id="signup-button"
            className="mt-3 border-0"
            onClick={updateExistingUser}
            disabled={
              updatedUser.password.length < 1 ||
              updatedUser.verifyPassword.length < 1
            }
          >
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}
