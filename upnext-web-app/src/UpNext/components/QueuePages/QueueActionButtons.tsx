import { Button } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdHistory, MdOutlineDone } from "react-icons/md";
import { Queue } from "../../types/queue";

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
    <div className="d-flex justify-content-around">
      <Button
        id="action-button"
        size="lg"
        className={`mt-3 ${
          !queueHistorySelected ? "bg-light text-dark" : "purple-brand-bg"
        } border-0 w-25 align-items-center`}
        onClick={() => setQueueHistorySelected(false)}
      >
        <IoTrendingUpSharp className="me-1 mb-1 fs-4" /> Current
      </Button>
      <Button
        id="action-button"
        size="lg"
        className={`mt-3 ${
          queueHistorySelected ? "bg-light text-dark" : "purple-brand-bg"
        }  border-0 w-25`}
        onClick={() => setQueueHistorySelected(true)}
      >
        <MdHistory className="me-1 mb-1 fs-4" /> History
      </Button>
      <Button
        id="action-button"
        size="lg"
        className="mt-3 purple-brand-bg border-0 w-25"
        disabled={
          (mediaQueue && mediaQueue.current.length === 0) ||
          consumedMediaIDs.length === 0
        }
        onClick={() => {
          moveMediaFromCurrentToHistory();
          setConsumedMediaIDs([]);
        }}
      >
        <MdOutlineDone className="me-1 mb-1 fs-4" /> Submit
      </Button>
    </div>
  );
}
