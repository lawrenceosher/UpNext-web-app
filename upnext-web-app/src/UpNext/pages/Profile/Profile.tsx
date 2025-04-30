/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { MdDateRange, MdNotificationsNone } from "react-icons/md";
import { BiMovie } from "react-icons/bi";
import { FiTv } from "react-icons/fi";
import { IoMusicalNotesOutline, IoRemoveCircle } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { SlMicrophone } from "react-icons/sl";
import { IoGameControllerOutline } from "react-icons/io5";
import "./Profile.css";
import QueueGroupToggle from "./QueueGroupToggle";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as userClient from "../../clients/userClient.ts";
import * as queueClient from "../../clients/queueClient.ts";
import * as groupClient from "../../clients/groupClient.ts";
import * as invitationClient from "../../clients/invitationClient.ts";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/accountReducer.ts";
import EditProfileForm from "./EditProfileForm.tsx";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function Profile() {
  const { userId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [userData, setUserData] = useState<any | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isViewingOwnProfile = userId === undefined && currentUser !== null;

  const readableDateJoined = (date: string) => {
    const myDate = new Date(date);
    return myDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  const acceptInvitation = async (invitationId: string) => {
    try {
      await invitationClient.respondToInvitation(invitationId, true);
      setUserData((prevState: any) => ({
        ...prevState,
        pendingInvitations: prevState.pendingInvitations.filter(
          (invitation: any) => invitation._id !== invitationId
        ),
      }));
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const rejectInvitation = async (invitationId: string) => {
    try {
      await invitationClient.respondToInvitation(invitationId, false);
      setUserData((prevState: any) => ({
        ...prevState,
        pendingInvitations: prevState.pendingInvitations.filter(
          (invitation: any) => invitation._id !== invitationId
        ),
      }));
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let user;
        if (userId === undefined) {
          const profile = await userClient.getProfile();
          user = profile;
        } else {
          if (currentUser && userId === currentUser._id) {
            navigate("/UpNext/Account/Profile");
            return;
          } else {
            user = await userClient.getUserById(userId);
          }
        }
        setUserData({
          ...user,
          historySummary: [],
          currentQueues: {
            movies: [],
            tv: [],
            albums: [],
            books: [],
            podcasts: [],
            games: [],
          },
          groups: [],
          pendingInvitations: [],
        });

        // Fetch history summary after user data is set
        const historySummary = await queueClient.retrieveHistorySummaryForUser(
          user.username
        );
        setUserData((prevState: any) => ({
          ...prevState,
          historySummary: [
            { category: "Movies", icon: BiMovie, value: historySummary.movie },
            { category: "TV", icon: FiTv, value: historySummary.tv },
            {
              category: "Albums",
              icon: IoMusicalNotesOutline,
              value: historySummary.album,
            },
            {
              category: "Books",
              icon: IoBookOutline,
              value: historySummary.book,
            },
            {
              category: "Podcasts",
              icon: SlMicrophone,
              value: historySummary.podcast,
            },
            {
              category: "Games",
              icon: IoGameControllerOutline,
              value: historySummary.game,
            },
          ],
        }));

        // Fetch current queues after user data is set
        const currentQueues =
          await queueClient.retrieveTop3InCurrentQueueForUser(user.username);
        setUserData((prevState: any) => ({
          ...prevState,
          currentQueues: {
            movies: currentQueues.movie.current,
            tv: currentQueues.tv.current,
            albums: currentQueues.album.current,
            books: currentQueues.book.current,
            podcasts: currentQueues.podcast.current,
            games: currentQueues.game.current,
          },
        }));

        // Fetch groups
        const groups = await groupClient.getGroupsForUser(user.username);
        setUserData((prevState: any) => ({
          ...prevState,
          groups: groups,
        }));

        // Fetch pending invitations
        const invitations = await invitationClient.getPendingInvitationsForUser(
          user.username
        );
        setUserData((prevState: any) => ({
          ...prevState,
          pendingInvitations: invitations,
        }));
      } catch (error) {
        console.error("Error fetching user data or history summary:", error);
      }
    };

    fetchUserData();
  }, [currentUser, navigate, userId]);

  const signout = async () => {
    await userClient.signout();
    dispatch(setCurrentUser(null));
    navigate("/UpNext/LogIn");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex align-items-center">
            <h1 className="fw-bold display-2">{userData.username}</h1>
          </div>

          <h4>
            <MdDateRange className="mb-1" /> Joined{" "}
            {readableDateJoined(userData.dateJoined)}
          </h4>

          <div className="mt-4">
            <h2 className="display-6 fw-bold">History</h2>
            <ul className="p-0">
              {userData.historySummary.map((category: any) => (
                <li
                  key={category.category}
                  className="d-flex align-items-center fs-3"
                >
                  {<category.icon className=" me-2" />} {category.category}:{" "}
                  {category.value}{" "}
                </li>
              ))}
            </ul>
          </div>

          {userData.groups && userData.groups.length > 0 && (
            <div className="mt-4">
              <h2 className="display-6 fw-bold">Groups</h2>
              <ul className="p-0">
                {userData.groups.map((group: any) => (
                  <li
                    key={group._id}
                    className="d-flex align-items-center fs-3"
                  >
                    {group.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Only show the sign out button if you're viewing your own profile */}
          {isViewingOwnProfile && (
            <Button
              variant="danger"
              onClick={signout}
              size="lg"
              className="mt-4 mb-4"
            >
              Sign Out
            </Button>
          )}
        </Col>

        {/* Only show the edit profile form if you're viewing your own profile */}
        {isViewingOwnProfile && (
          <>
            <Col>
            <div>
                <h2 className="d-flex align-items-center mb-4">
                  Update Account Security
                </h2>
              </div>
              <EditProfileForm existingUser={userData} />
            </Col>
            <Col>
              <div>
                <h2 className="d-flex align-items-center">
                  <MdNotificationsNone className="me-2" />
                  Invitations ({userData.pendingInvitations.length})
                </h2>
              </div>
              {userData.pendingInvitations.length !== 0 && (
                <ListGroup className="mb-4 border w-75">
                  {userData.pendingInvitations.map((invitation: any) => (
                    <ListGroupItem
                      key={invitation._id}
                      className="rounded-0 bg-transparent text-white d-flex flex-row align-items-center"
                    >
                      <span className="flex-grow-1 fs-4">
                        {invitation.group.name}
                      </span>
                      <IoMdCheckmarkCircle
                        className="fs-2 text-success"
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
            </Col>
          </>
        )}

        {/* Only show the current personal queues if you're viewing another user's profile and you're logged in */}
        {!isViewingOwnProfile && currentUser !== null && (
          <>
            <Col>
              <h4>Current Personal Queues</h4>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="0">Movies</QueueGroupToggle>
                  <Accordion.Collapse eventKey="0">
                    <ListGroup>
                      {userData.currentQueues.movies.map(
                        (movie: any, index: number) => (
                          <ListGroupItem
                            key={movie._id}
                            className="rounded-0 bg-transparent text-white"
                            onClick={() =>
                              navigate(`/UpNext/Movies/${movie._id}`)
                            }
                          >
                            {index + 1}. {movie.title} (
                            {movie.releaseDate.slice(0, 4)})
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="1">TV</QueueGroupToggle>
                  <Accordion.Collapse eventKey="1">
                    <ListGroup>
                      {userData.currentQueues.tv.map(
                        (tv: any, index: number) => (
                          <ListGroupItem
                            key={tv._id}
                            className="rounded-0 bg-transparent text-white"
                            onClick={() => navigate(`/UpNext/TV/${tv._id}`)}
                          >
                            {index + 1}. {tv.title} (
                            {tv.firstAirDate.slice(0, 4)})
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="2">Albums</QueueGroupToggle>
                  <Accordion.Collapse eventKey="2">
                    <ListGroup>
                      {userData.currentQueues.albums.map(
                        (album: any, index: number) => (
                          <ListGroupItem
                            key={album._id}
                            className="rounded-0 bg-transparent text-white"
                            onClick={() =>
                              navigate(`/UpNext/Albums/${album._id}`)
                            }
                          >
                            {index + 1}. {album.title} (
                            {album.releaseDate.slice(0, 4)})
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>
            </Col>

            <Col>
              <h4>
                <br />
              </h4>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="3">Books</QueueGroupToggle>
                  <Accordion.Collapse eventKey="3">
                    <ListGroup>
                      {userData.currentQueues.books.map(
                        (book: any, index: number) => (
                          <ListGroupItem
                            key={book._id}
                            className="rounded-0 bg-transparent text-white"
                            onClick={() =>
                              navigate(`/UpNext/Books/${book._id}`)
                            }
                          >
                            {index + 1}. {book.title}{" "}
                            {book.datePublished !== ""
                              ? `(${book.datePublished.slice(0, 4)})`
                              : ""}
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="4">Podcasts</QueueGroupToggle>
                  <Accordion.Collapse eventKey="4">
                    <ListGroup>
                      {userData.currentQueues.podcasts.map(
                        (podcast: any, index: number) => (
                          <ListGroupItem
                            key={podcast._id}
                            className="rounded-0 bg-transparent text-white"
                            onClick={() =>
                              navigate(`/UpNext/Podcasts/${podcast._id}`)
                            }
                          >
                            {index + 1}. {podcast.title} (
                            {podcast.latestEpisodeDate.slice(0, 4)})
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="5">Games</QueueGroupToggle>
                  <Accordion.Collapse eventKey="5">
                    <ListGroup>
                      {userData.currentQueues.games.map(
                        (game: any, index: number) => (
                          <ListGroupItem
                            key={game._id}
                            className="rounded-0 bg-transparent text-white"
                            onClick={() =>
                              navigate(`/UpNext/Games/${game._id}`)
                            }
                          >
                            {index + 1}. {game.title} (
                            {game.releaseDate.slice(0, 4)})
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}
