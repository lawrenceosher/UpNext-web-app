/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as userClient from "../../clients/userClient";
import { setCurrentUser } from "../../redux/accountReducer";

export default function EditProfileForm({
  existingUser,
}: {
  existingUser: any;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    _id: existingUser._id,
    password: existingUser.password,
  });

  const dispatch = useDispatch();

  const updateExistingUser = async () => {
    const resultingUser = await userClient.updateUser(
      updatedUser._id,
      updatedUser
    );
    dispatch(setCurrentUser(resultingUser));
  };

  return (
    <div className="d-flex">
      <div>
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
          >
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}
