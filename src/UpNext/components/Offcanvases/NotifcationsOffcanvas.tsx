import { Offcanvas, ListGroup, ListGroupItem } from "react-bootstrap";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoRemoveCircle } from "react-icons/io5";
import { Invitation } from "../../types/invitation";

/**
 * Displays an offcanvas that contains a list of pending invitations that users can accept or reject.
 * @param pendingInvitations - Array of pending invitations
 * @param showNotifications - Boolean to control the visibility of the offcanvas
 * @param handleCloseNotifications - Function to close the offcanvas
 * @param acceptInvitation - Function to accept an invitation
 * @param rejectInvitation - Function to reject an invitation
 */
export default function NotificationOffcanvas({
  pendingInvitations,
  showNotifications,
  handleCloseNotifications,
  acceptInvitation,
  rejectInvitation,
}: {
  pendingInvitations: Invitation[];
  showNotifications: boolean;
  handleCloseNotifications: () => void;
  acceptInvitation: (invitationId: string) => void;
  rejectInvitation: (invitationId: string) => void;
}) {
  return (
    <Offcanvas
      show={showNotifications}
      onHide={handleCloseNotifications}
      placement="end"
      className="bg-dark text-white"
    >
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>
          <h2 className="mt-2">Invitations ({pendingInvitations.length})</h2>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {pendingInvitations.length !== 0 && (
          <ListGroup className="mb-4 border">
            {pendingInvitations.map((invitation: Invitation) => (
              <ListGroupItem
                key={invitation._id}
                className="rounded-0 bg-transparent text-white d-flex flex-row align-items-center"
              >
                <span className="flex-grow-1 fs-4">
                  {invitation.group.name}
                </span>
                <IoMdCheckmarkCircle
                  className="fs-2"
                  style={{ color: "#732bce" }}
                  onClick={() => {
                    acceptInvitation(invitation._id);
                  }}
                />
                <IoRemoveCircle
                  className="ms-3 fs-2 text-danger"
                  onClick={() => {
                    rejectInvitation(invitation._id);
                  }}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
