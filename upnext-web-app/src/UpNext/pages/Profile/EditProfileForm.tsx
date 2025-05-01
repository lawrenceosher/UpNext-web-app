/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as userClient from "../../clients/userClient";
import { setCurrentUser } from "../../redux/accountReducer";

export default function EditProfileForm({
  existingUser,
}: {
  existingUser: any;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [updatedUser, setUpdatedUser] = useState({
    _id: existingUser._id,
    password: "",
    verifyPassword: "",
  });

  const dispatch = useDispatch();

  const updateExistingUser = async () => {
    if (updatedUser.password !== updatedUser.verifyPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const resultingUser = await userClient.updateUser(
      updatedUser._id,
      updatedUser
    );
    dispatch(setCurrentUser(resultingUser));
    setUpdatedUser({
      _id: existingUser._id,
      password: "",
      verifyPassword: "",
    });
  };

  return (
    <div className="d-flex">
      <div className="d-flex flex-column align-items-start w-100">
        {errorMessage && (
          <Alert
            variant="danger"
            onClose={() => setErrorMessage(null)}
            dismissible
          >
            <Alert.Heading>Failed to Reset Passwords</Alert.Heading>
            <p>{errorMessage}</p>
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
