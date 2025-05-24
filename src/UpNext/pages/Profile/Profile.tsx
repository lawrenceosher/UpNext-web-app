/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Container, Row } from "react-bootstrap";
import { MdNotificationsNone, MdOutlineSettings } from "react-icons/md";

import "./Profile.css";
import { useParams } from "react-router";
import MovieAccordion from "../../components/Accordions/MovieAccordion.tsx";
import TVAccordion from "../../components/Accordions/TVAccordion.tsx";
import AlbumAccordion from "../../components/Accordions/AlbumAccordion.tsx";
import BookAccordion from "../../components/Accordions/BookAccordion.tsx";
import PodcastAccordion from "../../components/Accordions/PodcastAccordion.tsx";
import GameAccordion from "../../components/Accordions/GameAccordion.tsx";
import useProfilePage from "../../hooks/useProfilePage.ts";
import NotificationOffcanvas from "../../components/Offcanvases/NotifcationsOffcanvas.tsx";
import { useSelector } from "react-redux";
import AccountSettingsOffcanvas from "../../components/Offcanvases/AccountSettingsOffcanvas.tsx";
import UserSummary from "../../components/UserSummary.tsx";

/**
 * Profile page component that displays user information, personal queues, notifcations, and account settings.
 * Users navigate to this page to view their own profile or the profile of another user.
 */
export default function Profile() {
  const { userId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    userData,
    acceptInvitation,
    rejectInvitation,
    showNotifications,
    handleCloseNotifications,
    handleShowNotifcations,
    showAccountSettings,
    handleCloseAccountSettings,
    handleShowAccountSettings,
    isViewingOwnProfile,
    signout,
  } = useProfilePage(userId, currentUser);

  // Conditionally render the profile page based on whether userData is available
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <UserSummary
            userData={userData}
            handleShowAccountSettings={handleShowAccountSettings}
            handleShowNotifcations={handleShowNotifcations}
            isViewingOwnProfile={isViewingOwnProfile}
          />
        </Col>

        {/* Only show the personal history, account settings, and invitations if you're viewing your own profile */}
        {isViewingOwnProfile && (
          <>
            <Col className="mt-md-4" xs={12} md={3}>
              <h4 className="fw-bold">Personal Queues - History</h4>
              <MovieAccordion movies={userData.historyQueues.movies} />
              <TVAccordion shows={userData.historyQueues.tv} />
              <AlbumAccordion albums={userData.historyQueues.albums} />
            </Col>

            <Col className="mt-md-4" xs={12} md={3}>
              <h4 className="d-none d-md-block">
                <br />
              </h4>
              <BookAccordion books={userData.historyQueues.books} />
              <PodcastAccordion podcasts={userData.historyQueues.podcasts} />
              <GameAccordion games={userData.historyQueues.games} />
            </Col>

            {/* Account settings and notifications */}
            <Col className="d-none d-md-block col-auto">
              <div className="">
                <MdOutlineSettings
                  id="icon-button"
                  className="display-5 float-end"
                  onClick={handleShowAccountSettings}
                />
                <MdNotificationsNone
                  id="icon-button"
                  className="display-5 float-end me-2"
                  onClick={handleShowNotifcations}
                />
              </div>

              
            </Col>

            <NotificationOffcanvas
                pendingInvitations={userData.pendingInvitations}
                showNotifications={showNotifications}
                handleCloseNotifications={handleCloseNotifications}
                acceptInvitation={acceptInvitation}
                rejectInvitation={rejectInvitation}
              />

              <AccountSettingsOffcanvas
                showAccountSettings={showAccountSettings}
                handleCloseAccountSettings={handleCloseAccountSettings}
                signout={signout}
              />
          </>
        )}

        {/* Only show the current personal queues if you're viewing another user's profile and you're logged in */}
        {!isViewingOwnProfile && currentUser !== null && (
          <>
            <Col className="mt-md-4" xs={12} md={3}>
              <h4 className="fw-bold">Personal Queues - Current</h4>
              <MovieAccordion movies={userData.currentQueues.movies} />
              <TVAccordion shows={userData.currentQueues.tv} />
              <AlbumAccordion albums={userData.currentQueues.albums} />
            </Col>

            <Col className="mt-md-4" xs={12} md={3}>
              <h4 className="d-none d-md-block">
                <br />
              </h4>
              <BookAccordion books={userData.currentQueues.books} />
              <PodcastAccordion podcasts={userData.currentQueues.podcasts} />
              <GameAccordion games={userData.currentQueues.games} />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}
