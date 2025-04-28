/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as userClient from "../../clients/userClient";
import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import DeleteUserModal from "../../components/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import Groups from "../Groups/Groups";

export default function Users() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  function formatReadableDate(isoDateString: string) {
    const myDate = new Date(isoDateString);

    // Code taken from GeeksForGeeks: https://www.geeksforgeeks.org/how-to-format-javascript-date-as-yyyy-mm-dd/
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, "0");
    const day = String(myDate.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  }

  const [allUsers, setAllUsers] = useState<any>([]);
  const [filter, setFilter] = useState("");

  const [show, setShow] = useState(false);
  const [userForModal, setUserForModal] = useState({
    username: "",
    _id: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeUser = async (userId: string) => {
    try {
      await userClient.deleteUser(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }

    setAllUsers((prevUsers: any) =>
      prevUsers.filter((user: any) => user._id !== userId)
    );
  };

  useEffect(() => {
    setAllUsers((prevUsers: any) =>
      prevUsers.filter((user: any) =>
        user.username.toLowerCase().includes(filter.toLowerCase())
      )
    );

    if (filter === "") {
      const fetchUsers = async () => {
        try {
          const users = await userClient.getAllUsers();
          setAllUsers(users);
        } catch (error) {
          console.error("Error fetching users:", error);
          setAllUsers([]);
        }
      };
      fetchUsers();
    }
  }, [filter]);

  return (
    <div>
      <DeleteUserModal
        show={show}
        handleClose={handleClose}
        username={userForModal.username}
        userId={userForModal._id}
        deleteUser={removeUser}
      />

      <div className="d-flex justify-content-between align-items-center">
        <h1>Users ({allUsers.length})</h1>
        <InputGroup
          className="align-items-center rounded position-relative w-50 me-4"
          size="lg"
        >
          <FaSearch className="search-icon" />
          <FormControl
            id="wd-search-assignment"
            placeholder="Search for Users..."
            className="ps-5"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </InputGroup>
      </div>

      <ListGroup className="mt-4 me-4">
        {allUsers.map((user: any) => (
          <ListGroup.Item
            key={user._id}
            className="d-flex flex-row align-items-center bg-transparent text-white "
            onClick={() => {
              navigate(`/UpNext/Account/Profile/${user._id}`);
            }}
          >
            <FaUserCircle className="me-3 fs-1 text-secondary" />
            <div className="fs-5">
              <span className="fw-bold">{user.username}</span>
              <div>User Since: {formatReadableDate(user.dateJoined)}</div>
            </div>
            {currentUser &&
              currentUser.role === "ADMIN" &&
              user.username !== currentUser.username && (
                <div className="d-inline-flex flex-grow-1 justify-content-end fs-3">
                  <FaTrashCan
                    className="text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserForModal({
                        username: user.username,
                        _id: user._id,
                      });
                      handleShow();
                    }}
                  />
                </div>
              )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="mt-4">
        <Groups />
      </div>
    </div>
  );
}
