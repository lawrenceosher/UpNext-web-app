/* eslint-disable @typescript-eslint/no-explicit-any */
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
import useGroups from "../../hooks/useGroups";

/**
 * Displays the groups feature of the application where users can create, delete, and manage groups.
 * It includes modals for creating a new group, deleting a group, viewing group details, and leaving a group.
 */
export default function Groups() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const {
    groups,
    newGroup,
    setNewGroup,
    groupForModal,
    setGroupForModal,
    showDeleteGroup,
    handleCloseDeleteGroup,
    handleShowDeleteGroup,
    showCreateGroup,
    handleCloseCreateGroup,
    handleShowCreateGroup,
    showGroupDetailsModal,
    handleCloseGroupDetailsModal,
    handleShowGroupDetailsModal,
    showLeaveGroupModal,
    handleCloseLeaveGroupModal,
    handleShowLeaveGroupModal,
    handleCreateGroup,
    handleDeleteGroup,
    handleUpdateGroup,
    handleLeaveGroup,
  } = useGroups(currentUser);

  if (!currentUser) return;

  return (
    <div>
      {/* Modals for creating, deleting, and viewing group details and leaving a group */}
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

      {/* Rendering the list of groups the user is a member of */}
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
                  {/* Can only delete group if you are the group creator */}
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
                  {/* Can only leave group if you are not the group creator */}
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
