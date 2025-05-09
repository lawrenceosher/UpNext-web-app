/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import useListGroupSelect from "../../hooks/useListGroupSelect";
import { Group } from "../../types/group";

/**
 * Dropdown component for selecting a group.
 * It fetches the list of groups for the current user and allows
 * the user to select a group from the dropdown.
 * @param selectedGroup - The currently selected group ID
 * @param setSelectedGroup - Function to set the selected group ID
 */
export default function ListGroupSelect({
  selectedGroup,
  setSelectedGroup,
}: {
  selectedGroup: string;
  setSelectedGroup: (groupId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { groupsForUser, handleGroupChange } = useListGroupSelect(
    currentUser,
    setSelectedGroup
  );

  return (
    <Form.Select
      size="lg"
      className="mb-3"
      value={selectedGroup}
      onChange={handleGroupChange}
    >
      <option value="">Personal</option>
      {groupsForUser.map((group: Group) => (
        <option key={group._id} value={group._id}>
          {group.name}
        </option>
      ))}
    </Form.Select>
  );
}
