/* eslint-disable @typescript-eslint/no-explicit-any */
import { Offcanvas, Button } from "react-bootstrap";
import EditProfileForm from "../../pages/Profile/EditProfileForm";

/**
 * Displays an offcanvas for account settings that contains a form for resetting the user's password and signing out.
 * @param showAccountSettings - Boolean to show or hide the offcanvas
 * @param handleCloseAccountSettings - Function to close the offcanvas
 * @param userData - User data to be passed to the EditProfileForm
 * @param signout - Function to sign out the user
 */
export default function AccountSettingsOffcanvas({
  showAccountSettings,
  handleCloseAccountSettings,
  userData,
  signout,
}: {
  showAccountSettings: boolean;
  handleCloseAccountSettings: () => void;
  userData: any;
  signout: () => void;
}) {
  return (
    <Offcanvas
      show={showAccountSettings}
      onHide={handleCloseAccountSettings}
      placement="end"
      className="bg-dark text-white"
    >
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>
          <h2 className="mt-2">Account Settings</h2>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <EditProfileForm existingUser={userData} />
        <Button variant="danger" onClick={signout} size="lg" className="mt-5">
          Sign Out
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
