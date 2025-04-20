/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as userClient from "../../clients/userClient";
import { MdAdd } from "react-icons/md";

export default function CreateGroupModal({
  show,
  handleClose,
  newGroup,
  setNewGroup,
  handleCreateGroup,
}: {
  show: boolean;
  handleClose: () => void;
  newGroup: any;
  setNewGroup: (group: any) => void;
  handleCreateGroup: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [allUsers, setAllUsers] = useState<any>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userClient.getAllUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAllUsers([]);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                value={newGroup.groupName}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, groupName: e.target.value })
                }
                placeholder="Enter group name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupMembers">
              <Form.Label>Users</Form.Label>
              <Form.Select
                multiple
                defaultValue={currentUser ? [currentUser.username] : []}
                onChange={(e) =>
                  setNewGroup({
                    ...newGroup,
                    users: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
              >
                {allUsers.map((user: any) => (
                  <option key={user._id.toString()} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button
              size="lg"
              id="action-button"
              className="purple-brand-bg border-0 mt-3 float-end"
              onClick={() => {
                handleCreateGroup();
                handleClose();
              }}
            >
              <MdAdd className="me-1 mb-1 fs-4" /> Create Group
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
