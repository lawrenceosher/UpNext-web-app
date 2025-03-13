/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAccordionButton } from "react-bootstrap";
import "./QueueGroupToggle.css"

export default function QueueGroupToggle({
  children,
  eventKey,
}: {
  children: any;
  eventKey: any;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
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
