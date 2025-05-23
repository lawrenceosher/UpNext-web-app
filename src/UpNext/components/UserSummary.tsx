/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MdDateRange,
  MdNotificationsNone,
  MdOutlineSettings,
} from "react-icons/md";
import { readableDateJoined } from "../utils";
import "../components/styles/UserSummary.css";

/**
 * Display the user's username, date joined, groups, and history summary with
 * values for how much of each media type they have consumed.
 * @param userData - The user data object containing user information and queues.
 */
export default function UserSummary({
  userData,
  handleShowAccountSettings,
  handleShowNotifcations,
  isViewingOwnProfile,
}: {
  userData: any;
  handleShowAccountSettings: () => void;
  handleShowNotifcations: () => void;
  isViewingOwnProfile: boolean;
}) {
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <h1 className="fw-bold display-2">
          {userData.username}{" "}
          {isViewingOwnProfile && (
            <span>
              <span className="d-inline-block position-relative">
                <MdNotificationsNone
                  id="icon-button"
                  className="display-5 me-2"
                  onClick={handleShowNotifcations}
                />
                {userData.pendingInvitations &&
                  userData.pendingInvitations.length > 0 && (
                    <span className="badge">
                      {userData.pendingInvitations.length}
                    </span>
                  )}
              </span>
              <MdOutlineSettings
                id="icon-button"
                className="display-5"
                onClick={handleShowAccountSettings}
              />
            </span>
          )}
        </h1>
      </div>

      <h4>
        <MdDateRange className="mb-1" /> Joined{" "}
        {readableDateJoined(userData.dateJoined)}
      </h4>

      <div className="mt-4">
        <h2 className="display-6 fw-bold">History</h2>
        <ul className="p-0">
          {userData.historySummary.map((category: any) => (
            <li
              key={category.category}
              className="d-flex align-items-center fs-3"
            >
              {<category.icon className=" me-2" />} {category.category}:{" "}
              {category.value.length}{" "}
            </li>
          ))}
        </ul>
      </div>

      {userData.groups && userData.groups.length > 0 && (
        <div className="mt-4">
          <h2 className="display-6 fw-bold">Groups</h2>
          <ul className="p-0">
            {userData.groups.map((group: any) => (
              <li key={group._id} className="d-flex align-items-center fs-3">
                {group.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
