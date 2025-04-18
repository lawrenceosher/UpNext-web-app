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
    username: existingUser.username,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
    password: existingUser.password,
    role: existingUser.role,
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
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
          size="lg"
            type="text"
            value={updatedUser.username}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, username: e.target.value })
            }
            className="bg-transparent text-white"
          />
        </Form.Group>
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
      </div>
      <div className="ms-4">
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
          size="lg"
            type="text"
            value={updatedUser.firstName}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, firstName: e.target.value })
            }
            className="bg-transparent text-white"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
          size="lg"
            type="text"
            value={updatedUser.lastName}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, lastName: e.target.value })
            }
            className="bg-transparent text-white"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
          size="lg"
            type="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
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
              setUpdatedUser({ ...updatedUser, role: e.target.value })
            }
            value={"USER"}
            checked={updatedUser.role === "USER"}
            className="bg-transparent text-white"
          />
          <Form.Check
            type="radio"
            name="role"
            label="System Administrator"
            value={"ADMIN"}
            checked={updatedUser.role === "ADMIN"}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, role: e.target.value })
            }
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
          Update Profile
        </Button>
      </div>
      </div>

     
    </div>
  );
}
