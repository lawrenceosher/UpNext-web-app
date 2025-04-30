/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as groupClient from "../../clients/groupClient";
import { Button, ListGroup } from "react-bootstrap";
import { Group } from "../../types/group";
import { useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import "../../../utils.css";
import CreateGroupModal from "./CreateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
import GroupDetailsModal from "./GroupDetailsModal";
import { IoMdRemoveCircle } from "react-icons/io";
import LeaveGroupModal from "./LeaveGroupModal";

export default function Groups() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroup, setNewGroup] = useState({
    name: "",
    creator: currentUser ? currentUser.username : "",
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

  const [showGroupDetailsModal, setShowGroupDetailsModal] = useState(false);
  const handleCloseGroupDetailsModal = () => setShowGroupDetailsModal(false);
  const handleShowGroupDetailsModal = () => setShowGroupDetailsModal(true);

  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);
  const handleCloseLeaveGroupModal = () => setShowLeaveGroupModal(false);
  const handleShowLeaveGroupModal = () => setShowLeaveGroupModal(true);

  const handleCreateGroup = async () => {
    try {
      const createdGroup = await groupClient.createGroup(
        newGroup.name,
        newGroup.creator
      );
      setGroups((prevGroups) => [...prevGroups, createdGroup]);
      setNewGroup({
        name: "",
        creator: currentUser ? currentUser.username : "",
      });
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
        groupForModal.name
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

  const handleLeaveGroup = async (groupId: string) => {
    try {
      await groupClient.removeGroupMember(groupId, currentUser.username);
      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (!currentUser) return;
        const groupRes = await groupClient.getGroupsForUser(
          currentUser.username
        );
        setGroups(groupRes);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [currentUser, groupForModal]);

  if (!currentUser) return;

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

      <GroupDetailsModal
        show={showGroupDetailsModal}
        handleClose={handleCloseGroupDetailsModal}
        groupDetails={groupForModal}
        setGroupDetails={setGroupForModal}
        handleUpdateGroup={handleUpdateGroup}
      />

      <LeaveGroupModal
        show={showLeaveGroupModal}
        handleClose={handleCloseLeaveGroupModal}
        groupName={groupForModal.name}
        groupId={groupForModal._id}
        leaveGroup={handleLeaveGroup}
      />

      <div className="d-flex me-4">
        <h1 className="flex-grow-1">Joined Groups ({groups.length})</h1>
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
              onClick={() => {
                if (currentUser && group.creator === currentUser.username) {
                  setGroupForModal(group);
                  handleShowGroupDetailsModal();
                }
              }}
            >
              <BsPeople className="me-3 fs-1 text-secondary" />
              <div className="fs-5">
                <span className="fw-bold">{group.name}</span>
                <div>Created By: {group.creator}</div>
                <div>Users: {group.members.join(", ")}</div>
              </div>
              {currentUser && group.creator === currentUser.username ? (
                <div className="d-inline-flex flex-grow-1 justify-content-end fs-3">
                  <FaTrashCan
                    className="text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroupForModal(group);
                      handleShowDeleteGroup();
                    }}
                  />
                </div>
              ) : (
                <div className="d-inline-flex flex-grow-1 justify-content-end fs-1">
                  <IoMdRemoveCircle
                    className="text-danger"
                    onClick={() => {
                      setGroupForModal(group);
                      handleShowLeaveGroupModal();
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
