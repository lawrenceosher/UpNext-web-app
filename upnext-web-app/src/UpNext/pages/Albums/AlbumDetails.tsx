/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "react-bootstrap/Image";
import { CiCalendar } from "react-icons/ci";
import { MdAccessTime, MdAdd, MdOutlineDescription, MdOutlineHeadphones } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as queueClient from "../../clients/queueClient";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Album } from "../../types/album";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { BiLabel } from "react-icons/bi";

export default function AlbumDetails() {
  const { albumId } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [album, setAlbum] = useState<Album | null>(null);
  const [otherUsers, setOtherUsers] = useState<any>(null);
  const [albumQueue, setAlbumQueue] = useState<any>(null);

  const readableDate = (dateString: string) => {
    return `${dateString.slice(5, 7)}/${dateString.slice(
      8,
      10
    )}/${dateString.slice(0, 4)}`;
  };

  const addAlbumToCurrentQueue = async () => {
    if (!currentUser || !albumQueue) return;

    try {
      const updatedQueue = await queueClient.addMediaToQueue(
        "Album",
        albumQueue._id,
        album
      );
      setAlbumQueue(updatedQueue);
    } catch (error) {
      console.error("Error adding album to queue:", error);
    }
  };

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        if (!albumId) return;
        const albumResult = await queueClient.retrieveMediaDetails(
          "Album",
          albumId
        );
        setAlbum(albumResult);
      } catch (error) {
        console.error("Error fetching album:", error);
      }

      if (!currentUser) return;
      try {
        const queue = await queueClient.retrieveQueueByUserAndMediaType(
          currentUser.username,
          "Album"
        );
        setAlbumQueue(queue);
      } catch (error) {
        console.error("Error fetching queue items:", error);
      }
    };

    const fetchOtherUsers = async () => {
      if (!albumId) return;

      try {
        const otherUsers = await queueClient.findOtherUsersWithSameMedia(
          "Album",
          albumId
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

    fetchAlbumDetails();
    fetchOtherUsers();
  }, [currentUser, albumId]);

  if (!album) return <div>Loading...</div>;

  return (
    <div className="d-flex">
      <Image
        src={album.coverArt}
        height={550}
        className="border border-4 border-white mb-4"
      />
      <div className="ps-4 flex-grow-1">
        <h1 className="fw-bold d-flex align-items-center display-4">
          <IoMusicalNotesOutline className="me-2" /> {album.title}
        </h1>
        <h4 className="mt-3 d-flex align-items-center">
          <MdOutlineHeadphones className="me-2 fs-3" /> Created by {album.artist}
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <CiCalendar className="me-2 fs-3" /> {readableDate(album.releaseDate)}
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <MdAccessTime className="me-2 fs-3" /> {album.tracks.length} Tracks
        </h4>
        <h5 className="mt-3 d-flex align-items-center">
          <BiLabel className="me-2 fs-2" /> {album.label}
        </h5>
        <h5 className="mt-3 fw-bold d-flex align-items-center">
          <MdOutlineDescription className="me-2 fs-3" /> Tracks
        </h5>
        <ol className="mt-3 text-start pe-3">
          {album.tracks.map((track, index) => (
            <li key={index} className="text-white">
              {track}
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
                (albumQueue &&
                  albumQueue.current
                    .map((item: any) => item._id)
                    .includes(albumId)) ||
                (albumQueue &&
                  albumQueue.history
                    .map((item: any) => item._id)
                    .includes(albumId))
              }
              onClick={() => {
                addAlbumToCurrentQueue();
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
