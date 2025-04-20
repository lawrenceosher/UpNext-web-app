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
import CreateGroupModal from "./CreateGroupModal";

export default function Groups() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroup, setNewGroup] = useState({
    groupName: "",
    users: [],
  });
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const handleCloseCreateGroup = () => setShowCreateGroup(false);
  const handleShowCreateGroup = () => setShowCreateGroup(true);

  const handleCreateGroup = async () => {
    try {
      const createdGroup = await groupClient.createGroup(
        newGroup.groupName,
        newGroup.users
      );
      setGroups((prevGroups) => [...prevGroups, createdGroup]);
      setNewGroup({ groupName: "", users: [] });
      handleCloseCreateGroup();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

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
      <CreateGroupModal
        show={showCreateGroup}
        handleClose={handleCloseCreateGroup}
        newGroup={newGroup}
        setNewGroup={setNewGroup}
        handleCreateGroup={handleCreateGroup}
      />
      <div className="d-flex justify-content-end me-4">
        <Button
          size="lg"
          id="action-button"
          className="purple-brand-bg border-0"
          onClick={handleShowCreateGroup}
        >
          <MdAdd className="me-1 mb-1 fs-4" /> Create Group
        </Button>
      </div>
      {groups && groups.length > 0 && (
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
      )}
    </div>
  );
}
