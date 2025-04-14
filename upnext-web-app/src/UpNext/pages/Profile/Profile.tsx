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
import { MdDateRange } from "react-icons/md";
import { BiMovie } from "react-icons/bi";
import { FiTv } from "react-icons/fi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { SlMicrophone } from "react-icons/sl";
import { IoGameControllerOutline } from "react-icons/io5";
import "./Profile.css";
import QueueGroupToggle from "./QueueGroupToggle";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as userClient from "../../clients/userClient.ts";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/accountReducer.ts";
import EditProfileForm from "./EditProfileForm.tsx";

const history = [
  { category: "Movies", icon: BiMovie, value: 30 },
  { category: "TV", icon: FiTv, value: 25 },
  { category: "Albums", icon: IoMusicalNotesOutline, value: 20 },
  { category: "Books", icon: IoBookOutline, value: 15 },
  { category: "Podcasts", icon: SlMicrophone, value: 10 },
  { category: "Games", icon: IoGameControllerOutline, value: 5 },
];

export default function Profile() {
  const { userId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [userData, setUserData] = useState<any | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isViewingOwnProfile = userId === undefined && currentUser !== null;

  const readableDate = (date: string) => {
    const myDate = new Date(date);
    return myDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId === undefined) {
          try {
            const profile = await userClient.getProfile();
            setUserData(profile);
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        } else {
          if (currentUser && userId === currentUser._id) {
            navigate("/UpNext/Account/Profile");
          } else {
            const user = await userClient.getUserById(userId);
            setUserData(user);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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
            {readableDate(userData.dateJoined)}
          </h4>

          <div className="mt-4">
            <h2 className="display-6 fw-bold">History</h2>
            <ul className="p-0">
              {history.map((category) => (
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

          {/* Only show the sign out button if you're viewing your own profile */}
          {isViewingOwnProfile && (
            <Button
              variant="danger"
              onClick={signout}
              size="lg"
              className="mt-4"
            >
              Sign Out
            </Button>
          )}
        </Col>

        {isViewingOwnProfile && (
          <>
            <Col>
              <EditProfileForm existingUser={userData} />
            </Col>
          </>
        )}

        {/* Only show the current personal queues if you're viewing another user's profile*/}
        {userId !== undefined && (
          <>
            <Col>
              <h4>Current Personal Queues</h4>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="0">Movies</QueueGroupToggle>
                  <Accordion.Collapse eventKey="0">
                    <ListGroup>
                      <ListGroupItem className="rounded-0 bg-transparent text-white">
                        1. Cras justo odio
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        2. Dapibus ac facilisis in
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        3. Vestibulum at eros
                      </ListGroupItem>
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="1">TV</QueueGroupToggle>
                  <Accordion.Collapse eventKey="1">
                    <ListGroup>
                      <ListGroupItem className="rounded-0 bg-transparent text-white">
                        1. Cras justo odio
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        2. Dapibus ac facilisis in
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        3. Vestibulum at eros
                      </ListGroupItem>
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="2">Albums</QueueGroupToggle>
                  <Accordion.Collapse eventKey="2">
                    <ListGroup>
                      <ListGroupItem className="rounded-0 bg-transparent text-white">
                        1. Cras justo odio
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        2. Dapibus ac facilisis in
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        3. Vestibulum at eros
                      </ListGroupItem>
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
                      <ListGroupItem className="rounded-0 bg-transparent text-white">
                        1. Cras justo odio
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        2. Dapibus ac facilisis in
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        3. Vestibulum at eros
                      </ListGroupItem>
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="4">Podcasts</QueueGroupToggle>
                  <Accordion.Collapse eventKey="4">
                    <ListGroup>
                      <ListGroupItem className="rounded-0 bg-transparent text-white">
                        1. Cras justo odio
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        2. Dapibus ac facilisis in
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        3. Vestibulum at eros
                      </ListGroupItem>
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup>
              </Accordion>

              <Accordion>
                <ListGroup className="mb-4 border">
                  <QueueGroupToggle eventKey="5">Games</QueueGroupToggle>
                  <Accordion.Collapse eventKey="5">
                    <ListGroup>
                      <ListGroupItem className="rounded-0 bg-transparent text-white">
                        1. Cras justo odio
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        2. Dapibus ac facilisis in
                      </ListGroupItem>
                      <ListGroupItem className="bg-transparent text-white">
                        3. Vestibulum at eros
                      </ListGroupItem>
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
