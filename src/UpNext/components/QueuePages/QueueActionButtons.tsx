import { Button } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdHistory, MdOutlineDone } from "react-icons/md";
import { Queue } from "../../types/queue";

/**
 * Displays action buttons for the queue page, allowing users to switch between current and history views,
 * and to submit consumed media.
 */
export default function QueueActionButtons({
  queueHistorySelected,
  setQueueHistorySelected,
  mediaQueue,
  consumedMediaIDs,
  setConsumedMediaIDs,
  moveMediaFromCurrentToHistory,
}: {
  queueHistorySelected: boolean;
  setQueueHistorySelected: (value: boolean) => void;
  mediaQueue: Queue | null | undefined;
  consumedMediaIDs: string[];
  setConsumedMediaIDs: (ids: string[]) => void;
  moveMediaFromCurrentToHistory: () => Promise<void>;
}) {
  return (
    <div className="d-flex flex-md-row flex-column justify-content-around mt-3 mb-5">
      <Button
        id="action-button"
        size="lg"
        className={`mt-3 py-3 px-4 ${
          !queueHistorySelected ? "bg-light text-dark" : "purple-brand-bg"
        } border-0 align-items-center`}
        onClick={() => setQueueHistorySelected(false)}
      >
        <IoTrendingUpSharp className="me-1 mb-1 fs-4" /> Current
      </Button>
      <Button
        id="action-button"
        size="lg"
        className={`mt-3 py-3 px-4 ${
          queueHistorySelected ? "bg-light text-dark" : "purple-brand-bg"
        }  border-0`}
        onClick={() => setQueueHistorySelected(true)}
      >
        <MdHistory className="me-1 mb-1 fs-4" /> History
      </Button>
      <Button
        id="action-button"
        size="lg"
        className="mt-3 py-3 px-4 purple-brand-bg border-0"
        disabled={
          (mediaQueue && mediaQueue.current.length === 0) ||
          consumedMediaIDs.length === 0
        }
        onClick={() => {
          moveMediaFromCurrentToHistory();

          // Clear the consumed media IDs after moving them to history
          setConsumedMediaIDs([]);
        }}
      >
        <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
      </Button>
    </div>
  );
}
