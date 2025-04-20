/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import * as groupClient from "../clients/groupClient";
import { useSelector } from "react-redux";

export default function ListGroupSelect({
  selectedGroup,
  setSelectedGroup,
}: {
  selectedGroup: string;
  setSelectedGroup: (groupId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [groupsForUser, setGroupsForUser] = useState<any>([]);

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      if (!currentUser) return;
      try {
        const groups = await groupClient.getGroupsForUser(currentUser.username);
        setGroupsForUser(groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
        setGroupsForUser([]);
      }
    };
    fetchGroups();
  }, [currentUser]);

  return (
    <Form.Select
      size="lg"
      className="mb-3"
      value={selectedGroup}
      onChange={handleGroupChange}
    >
      <option value="">Personal</option>
      {groupsForUser.map((group: any) => (
        <option key={group._id} value={group._id}>
          {group.groupName}
        </option>
      ))}
    </Form.Select>
  );
}
