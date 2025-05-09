/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAccordionButton } from "react-bootstrap";
import "./styles/QueueGroupToggle.css";

/**
 * Render a toggle button in the form of a rotating arrow for queue group accordions.
 * This component is used to collapse or expand the queue group.
 */
export default function QueueGroupToggle({
  children,
  eventKey,
}: {
  children: any;
  eventKey: any;
}) {
  // State to manage the collapse/expand state of the accordion
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to handle the click event on the accordion button
  // It uses the `useAccordionButton` hook from react-bootstrap to manage the accordion state
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setIsCollapsed(!isCollapsed);
  });

  return (
    <h3
      className={`fs-2 ps-2 pt-2 pb-2 rounded-top m-0 border accordion-button ${
        isCollapsed ? "collapsed" : ""
      } text-white`}
      id="current-queue-header"
      onClick={decoratedOnClick}
    >
      {children}
    </h3>
  );
}
