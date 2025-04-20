/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as groupClient from "../../clients/groupClient";
import { Button, ListGroup } from "react-bootstrap";
import { Group } from "../../types/group";
import { useSelector } from "react-redux";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import "../../../utils.css";

export default function Groups() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupRes = await groupClient.getAllGroups();
        setGroups(groupRes);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end me-4">
        <Button
          size="lg"
          id="action-button"
          className="purple-brand-bg border-0"
        >
          <MdAdd className="me-1 mb-1 fs-4" /> Create Group
        </Button>
      </div>
      <ListGroup className="mt-4 me-4">
        {groups.map((group: Group) => (
          <ListGroup.Item
            key={group._id}
            className="d-flex flex-row align-items-center bg-transparent text-white "
          >
            <BsPeople className="me-3 fs-1 text-secondary" />
            <div className="fs-5">
              <span className="fw-bold">{group.groupName}</span>
              <div>Users: {group.users.join(", ")}</div>
            </div>
            {currentUser && currentUser.role === "ADMIN" && (
              <div className="d-inline-flex flex-grow-1 justify-content-end fs-3">
                <FaPencil className="me-3" />
                <FaTrashCan className="text-danger" />
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
