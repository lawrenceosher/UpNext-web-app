/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAccordionButton } from "react-bootstrap";

export default function QueueGroupToggle({
  children,
  eventKey,
}: {
  children: any;
  eventKey: any;
}) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});

  return (
    <h3
      className="fs-2 ps-2 pt-2 pb-2 rounded-top m-0 border"
      id="current-queue-header"
      onClick={decoratedOnClick}
    >
      {children}
    </h3>
  );
}
