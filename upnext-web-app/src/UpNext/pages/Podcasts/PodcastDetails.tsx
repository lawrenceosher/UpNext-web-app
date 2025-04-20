/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdOutlineDescription } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { Alert, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as queueClient from "../../clients/queueClient";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Podcast } from "../../types/podcast";
import { SlMicrophone } from "react-icons/sl";
import { BiLabel } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";

export default function PodcastDetails() {
  const { podcastId } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [otherUsers, setOtherUsers] = useState<any>(null);
  const [podcastQueue, setPodcastQueue] = useState<any>(null);

  const [showAlert, setShowAlert] = useState(false);

  const readableDate = (dateString: string) => {
    return `${dateString.slice(5, 7)}/${dateString.slice(
      8,
      10
    )}/${dateString.slice(0, 4)}`;
  };

  const addPodcastToCurrentQueue = async () => {
    if (!currentUser || !podcastQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "Podcast",
        podcastQueue._id,
        podcast
      );
      setPodcastQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding podcast to queue:", error);
    }
  };

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        if (!podcastId) return;
        const podcastResult = await queueClient.retrieveMediaDetails(
          "Podcast",
          podcastId
        );
        setPodcast(podcastResult);
      } catch (error) {
        console.error("Error fetching podcast:", error);
      }

      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "Podcast"
        );
        setPodcastQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };

    const fetchOtherUsers = async () => {
      if (!podcastId) return;

      try {
        const otherUsers = await queueClient.findOtherUsersWithSameMedia(
          "Podcast",
          podcastId
        );
        if (!currentUser) {
          setOtherUsers(otherUsers);
        } else {
          const otherUsersExceptCurrent = otherUsers.filter(
            (user: any) => user.username !== currentUser.username
          );
          setOtherUsers(otherUsersExceptCurrent);
        }
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };

    fetchPodcastDetails();
    fetchOtherUsers();
  }, [currentUser, podcastId]);

  if (!podcast) return <div>Loading...</div>;

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Add Podcast</Alert.Heading>
          <p>Successfully added {podcast.title} to your current personal queue!</p>
        </Alert>
      )}
      <div className="d-flex">
        <Image
          src={podcast.coverArt}
          height={550}
          className="border border-4 border-white mb-4"
        />
        <div className="ps-4 flex-grow-1">
          <h1 className="fw-bold d-flex align-items-center display-5">
            <SlMicrophone className="me-2" /> {podcast.title}
          </h1>
          <h4 className="mt-3 d-flex align-items-center">
            <BiLabel className="me-2 fs-3" /> Published by {podcast.publisher}
          </h4>
          <h4 className="mt-3 d-flex align-items-center">
            <CiCalendar className="me-2 fs-3" />{" "}
            {readableDate(podcast.latestEpisodeDate)}
          </h4>
          <h5 className="mt-3 fw-bold d-flex align-items-center">
            <MdOutlineDescription className="me-2 fs-3" /> Description
          </h5>
          <p className="mt-3 text-start pe-3">{podcast.description}</p>
          <h5 className="mt-3 fw-bold d-flex align-items-center">
            <FaRegListAlt className="me-2 fs-3" /> Most Recent Episodes
          </h5>
          <ol className="mt-3 text-start pe-3">
            {podcast.episodes.map((episode, index) => (
              <li key={index} className="text-white mb-3">
                {episode}
              </li>
            ))}
          </ol>

          {currentUser && (
            <>
              <h5 className="mt-3 fw-bold d-flex align-items-center">
                <IoIosPeople className="me-2 fs-2" /> Other Users Who Listened
              </h5>
              <ul className="list-unstyled">
                {otherUsers &&
                  otherUsers.map((u: any) => (
                    <li key={u._id}>
                      <Link to={`/UpNext/Account/Profile/${u._id}`}>
                        {u.username}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}

          <div>
            <Form className="d-flex align-items-center flex-fill justify-content-end me-4">
              <Button
                size="lg"
                id="action-button"
                className="my-3 float-end purple-brand-bg border-0 w-25"
                disabled={
                  !currentUser ||
                  (podcastQueue &&
                    podcastQueue.current
                      .map((item: any) => item._id)
                      .includes(podcastId)) ||
                  (podcastQueue &&
                    podcastQueue.history
                      .map((item: any) => item._id)
                      .includes(podcastId))
                }
                onClick={() => {
                  addPodcastToCurrentQueue();
                  setShowAlert(true);
                }}
              >
                <MdAdd className="me-1 mb-1 fs-4" /> Add
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
