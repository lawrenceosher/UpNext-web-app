/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup, Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "./GroupDetailsModal.css";
import { RiMailAddLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { formatReadableDate } from "../../utils";
import useGroupDetails from "../../hooks/useGroupDetails";

/**
 * Displays the details of a group, allowing the user to edit the group name,
 * view group members, and send/unsend invitations to other users.
 * It includes an input for editing group name as well.
 */
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
  const {
    allUsers,
    isEditing,
    setIsEditing,
    sendNewInvitationToGroup,
    cancelSentInvitation,
    removeGroupMember,
    invitedUsers,
  } = useGroupDetails(groupDetails, setGroupDetails);

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

          { /* Displaying all of the members of the group */ }
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
                  // Only show the remove button if the user is not the creator
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
                  // If the user is already invited, show the cancel button
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
                  // If the user is not invited, show the send button
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
