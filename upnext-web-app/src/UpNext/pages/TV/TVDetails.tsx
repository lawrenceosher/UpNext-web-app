/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { TbChairDirector } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdOutlineDescription } from "react-icons/md";
import { LuListVideo, LuTvMinimalPlay } from "react-icons/lu";
import { FaMasksTheater } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as queueClient from "../../clients/queueClient";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TVShow } from "../../types/tvShow";
import { FiTv } from "react-icons/fi";

export default function TVDetails() {
  const { tvId } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [tvShow, setTvShow] = useState<TVShow | null>(null);
  const [otherUsers, setOtherUsers] = useState<any>(null);
  const [tvQueue, setTVQueue] = useState<any>(null);

  const readableDate = (dateString: string) => {
    return `${dateString.slice(5, 7)}/${dateString.slice(
      8,
      10
    )}/${dateString.slice(0, 4)}`;
  };

  const addTVShowToCurrentQueue = async () => {
    if (!currentUser || !tvQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "TV",
        tvQueue._id,
        tvShow
      );
      setTVQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding tv show to queue:", error);
    }
  };

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        if (!tvId) return;
        const tvResult = await queueClient.retrieveMediaDetails("TV", tvId);
        setTvShow(tvResult);
      } catch (error) {
        console.error("Error fetching tv show:", error);
      }

      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "TV"
        );
        setTVQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };

    const fetchOtherUsers = async () => {
      if (!tvId) return;

      try {
        const otherUsers = await queueClient.findOtherUsersWithSameMedia(
          "TV",
          tvId
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

    fetchTVShowDetails();
    fetchOtherUsers();
  }, [currentUser, tvId]);

  if (!tvShow) return <div>Loading...</div>;

  return (
    <div className="d-flex">
      <Image
        src={tvShow.posterPath}
        width={400}
        className="border border-4 border-white mb-4"
      />
      <div className="ps-4 flex-grow-1">
        <h1 className="fw-bold d-flex align-items-center display-4">
          <FiTv className="me-2" /> {tvShow.title}
        </h1>
        <h4 className="mt-3 d-flex align-items-center">
          <TbChairDirector className="me-2 fs-3" /> Created by {tvShow.creator}
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <CiCalendar className="me-2 fs-3" />
          {readableDate(tvShow.firstAirDate)}{" "}
          {tvShow.lastAirDate &&
            tvShow.lastAirDate.length > 0 &&
            `-
            ${readableDate(tvShow.lastAirDate)}`}
        </h4>

        <h4 className="mt-3 d-flex align-items-center">
          <LuTvMinimalPlay className="me-2 fs-3" /> {tvShow.totalEpisodes} Episodes
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <LuListVideo className="me-2 fs-3" /> {tvShow.totalSeasons} Seasons
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <FaMasksTheater className="me-2 fs-3" />{" "}
          {tvShow && tvShow.genres.join(", ")}
        </h4>
        <h5 className="mt-3 d-flex align-items-center">
          <IoIosPeople className="me-2 fs-2" />{" "}
          {tvShow && tvShow.cast.join(", ")}
        </h5>
        <h5 className="mt-5 fw-bold d-flex align-items-center">
          <MdOutlineDescription className="me-2 fs-3" /> Description
        </h5>
        <p className="mt-3 text-start pe-3">{tvShow.description}</p>
        {currentUser && (
          <>
            <h5 className="mt-5 fw-bold d-flex align-items-center">
              <IoIosPeople className="me-2 fs-2" /> Other Users Who Watched
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
                (tvQueue &&
                  tvQueue.current
                    .map((item: any) => item._id)
                    .includes(tvId)) ||
                (tvQueue &&
                  tvQueue.history.map((item: any) => item._id).includes(tvId))
              }
              onClick={() => {
                addTVShowToCurrentQueue();
              }}
            >
              <MdAdd className="me-1 mb-1 fs-4" /> Add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
