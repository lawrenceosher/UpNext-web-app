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
import DeleteGroupModal from "./DeleteGroupModal";
import UpdateGroupModal from "./UpdateGroupModal";

export default function Groups() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroup, setNewGroup] = useState({
    groupName: "",
    users: [],
  });
  const [groupForModal, setGroupForModal] = useState<Group>({
    name: "",
    _id: "",
    creator: "",
    members: [],
  });

  const [showDeleteGroup, setShowDeleteGroup] = useState(false);
  const handleCloseDeleteGroup = () => setShowDeleteGroup(false);
  const handleShowDeleteGroup = () => setShowDeleteGroup(true);

  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const handleCloseCreateGroup = () => setShowCreateGroup(false);
  const handleShowCreateGroup = () => setShowCreateGroup(true);

  const [showUpdateGroup, setShowUpdateGroup] = useState(false);
  const handleCloseUpdateGroup = () => setShowUpdateGroup(false);
  const handleShowUpdateGroup = () => setShowUpdateGroup(true);

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

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await groupClient.deleteGroup(groupId);
      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleUpdateGroup = async () => {
    try {
      const updatedGroupData = await groupClient.updateGroup(
        groupForModal._id,
        groupForModal.name,
        groupForModal.members
      );
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupForModal._id ? updatedGroupData : group
        )
      );
    } catch (error) {
      console.error("Error updating group:", error);
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

      <DeleteGroupModal
        show={showDeleteGroup}
        handleClose={handleCloseDeleteGroup}
        groupName={groupForModal.name}
        groupId={groupForModal._id}
        deleteGroup={handleDeleteGroup}
      />

      <UpdateGroupModal
        show={showUpdateGroup}
        handleClose={handleCloseUpdateGroup}
        updatedGroup={groupForModal}
        setUpdatedGroup={setGroupForModal}
        handleUpdateGroup={handleUpdateGroup}
      />

      <div className="d-flex me-4">
        <h1 className="flex-grow-1">Groups ({groups.length})</h1>
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
                <span className="fw-bold">{group.name}</span>
                <div>Users: {group.members.join(", ")}</div>
              </div>
              {currentUser && (
                <div className="d-inline-flex flex-grow-1 justify-content-end fs-3">
                  <FaPencil
                    className="me-3"
                    onClick={() => {
                      setGroupForModal(group);
                      handleShowUpdateGroup();
                    }}
                  />
                  <FaTrashCan
                    className="text-danger"
                    onClick={() => {
                      setGroupForModal(group);
                      handleShowDeleteGroup();
                    }}
                  />
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
