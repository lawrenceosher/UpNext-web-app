/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import * as userClient from "../../clients/userClient";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "./GroupDetailsModal.css";
import { RiMailAddLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";

export default function GroupDetailsModal({
  show,
  handleClose,
  groupDetails,
  setGroupDetails,
  handleUpdateGroup,
}: {
  show: boolean;
  handleClose: () => void;
  groupDetails: any;
  setGroupDetails: (group: any) => void;
  handleUpdateGroup: () => void;
}) {
  function formatReadableDate(isoDateString: string) {
    const myDate = new Date(isoDateString);

    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, "0");
    const day = String(myDate.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  }

  const [allUsers, setAllUsers] = useState<any>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userClient.getAllUsers();
        const filteredUsers = users.filter(
          (user: any) => !groupDetails.members.includes(user.username)
        );

        setAllUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAllUsers([]);
      }
    };
    fetchUsers();
  }, [groupDetails.creator, groupDetails.members]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} className="text-dark text-center">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaPencil onClick={() => setIsEditing(!isEditing)} />{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Control
                type="text"
                className="text-center fs-2"
                value={groupDetails.name}
                onChange={(e) =>
                  setGroupDetails({
                    ...groupDetails,
                    name: e.target.value,
                  })
                }
                placeholder="Enter new group name"
              />
            </Form.Group>
          ) : (
            <div>
              <h2 className="fw-bold"> <BsPeople className="me-3 fs-1" />{groupDetails.name} </h2>
            </div>
          )}

          <h4>Creator: {groupDetails.creator}</h4>

          <h5 className="mt-4 text-start">Group Members:</h5>
          <ListGroup id="users" className="text-start">
            {groupDetails.members.map((user: any) => (
              <ListGroup.Item
                key={user._id}
                className="d-flex flex-row align-items-center bg-transparent "
              >
                <FaUserCircle className="me-3 fs-1 text-secondary" />
                <div className="fs-6 flex-grow-1">
                  <span className="fw-bold">{user}</span>
                </div>
                {groupDetails.creator !== user && (
                  <FaTrash className="fs-2 text-danger" />
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h5 className="mt-3 text-start">All Users:</h5>
          <ListGroup id="users" className="text-start">
            {allUsers.map((user: any) => (
              <ListGroup.Item
                key={user._id}
                className="d-flex flex-row align-items-center bg-transparent "
              >
                <FaUserCircle className="me-3 fs-1 text-secondary" />
                <div className="fs-6 flex-grow-1">
                  <span className="fw-bold">{user.username}</span>
                  <div>User Since: {formatReadableDate(user.dateJoined)}</div>
                </div>
                <RiMailAddLine className="fs-2 text-secondary" />
              </ListGroup.Item>
            ))}
          </ListGroup>

          {isEditing && (
            <>
              <Button
                size="lg"
                id="action-button"
                className="purple-brand-bg border-0 mt-3 ms-3 float-end"
                onClick={() => {
                  handleUpdateGroup();
                  handleClose();
                  setIsEditing(false);
                }}
              >
                Update Group
              </Button>

              <Button
                size="lg"
                variant="danger"
                className="border-0 mt-3 float-end"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
