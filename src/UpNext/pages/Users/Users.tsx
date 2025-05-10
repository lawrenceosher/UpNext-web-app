/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Groups from "../Groups/Groups";
import { formatReadableDate } from "../../utils";
import useUsersPage from "../../hooks/useUsersPage";
import "./Users.css";

/**
 * Displays a list of all users for the application along with groups that any user can create and join.
 * Users can be searched by their username and clicked on to view their profile.
 */
export default function Users() {
  const navigate = useNavigate();

  const { allUsers, filter, setFilter } = useUsersPage();

  return (
    <div>
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
            className="ps-5 rounded-start"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </InputGroup>
      </div>

      <ListGroup id="users-list" className="mt-4 me-4 border-bottom">
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
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="mt-4">
        <Groups />
      </div>
    </div>
  );
}
