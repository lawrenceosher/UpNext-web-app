/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import * as userClient from "../../clients/userClient";
import * as invitationClient from "../../clients/invitationClient";
import * as groupClient from "../../clients/groupClient";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "./GroupDetailsModal.css";
import { RiMailAddLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { MdOutlineCancelScheduleSend } from "react-icons/md";

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
  const [invitedUsers, setInvitedUsers] = useState<any>([]);

  const sendNewInvitationToGroup = async (
    groupId: string,
    invitedUser: string
  ) => {
    try {
      const sentInvitation = await invitationClient.sendInvitation(
        groupId,
        groupDetails.creator,
        invitedUser
      );
      setInvitedUsers((prevInvitations: any) => [
        ...prevInvitations,
        sentInvitation,
      ]);
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  const cancelSentInvitation = async (invitationId: string) => {
    try {
      await invitationClient.deleteSentInvitation(invitationId);
      setInvitedUsers((prevInvitations: any) =>
        prevInvitations.filter((invite: any) => invite._id !== invitationId)
      );
    } catch (error) {
      console.error("Error canceling invitation:", error);
    }
  };

  const removeGroupMember = async (username: string) => {
    try {
      await groupClient.removeGroupMember(groupDetails._id, username);
      setGroupDetails((prevGroup: any) => ({
        ...prevGroup,
        members: prevGroup.members.filter(
          (member: string) => member !== username
        ),
      }));
      setInvitedUsers((prevInvitations: any) =>
        prevInvitations.filter((invite: any) => invite.invitedUser !== username)
      );
    } catch (error) {
      console.error("Error removing group member:", error);
    }
  };

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

  useEffect(() => {
    const fetchPendingInvitationsForGroup = async () => {
      try {
        const invitations =
          await invitationClient.getPendingInvitationsForGroup(
            groupDetails._id
          );
        setInvitedUsers(invitations);
      } catch (error) {
        console.error("Error fetching pending invitations:", error);
      }
    };
    fetchPendingInvitationsForGroup();
  }, [groupDetails._id]);

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
              <h2 className="fw-bold">
                {" "}
                <BsPeople className="me-3 fs-1" />
                {groupDetails.name}{" "}
              </h2>
            </div>
          )}

          <h4>Creator: {groupDetails.creator}</h4>

          <h5 className="mt-4 text-start">Group Members:</h5>
          <ListGroup id="users" className="text-start">
            {groupDetails.members.map((user: any, index: any) => (
              <ListGroup.Item
                key={index}
                className="d-flex flex-row align-items-center bg-transparent "
              >
                <FaUserCircle className="me-3 fs-1 text-secondary" />
                <div className="fs-6 flex-grow-1">
                  <span className="fw-bold">{user}</span>
                </div>
                {groupDetails.creator !== user && (
                  <FaTrash
                    className="fs-2 text-danger"
                    onClick={() => {
                      removeGroupMember(user);
                    }}
                  />
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
                {invitedUsers
                  .map((invite: any) => invite.invitedUser)
                  .includes(user.username) ? (
                  <MdOutlineCancelScheduleSend
                    className="fs-2 text-danger"
                    onClick={() => {
                      cancelSentInvitation(
                        invitedUsers.filter(
                          (invite: any) => invite.invitedUser === user.username
                        )[0]._id
                      );
                    }}
                  />
                ) : (
                  <RiMailAddLine
                    className="fs-2 text-secondary"
                    onClick={() => {
                      sendNewInvitationToGroup(groupDetails._id, user.username);
                    }}
                  />
                )}
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
