/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../styles/MediaSearch.css";
import useMediaSearch from "../../hooks/useMediaSearch";

/**
 * Custom search component to retrieve matching media items from external APIs.
 * @param mediaType - The type of media to search for (e.g., "Movie", "TV", etc.)
 * @param setSelectedMedia - Function to set the selected media item
 */
export default function MediaSearch({
  mediaType,
  setSelectedMedia,
}: {
  mediaType: string;
  setSelectedMedia: (media: any) => void;
}) {
  const { searchTerm, setSearchTerm, searchResults } =
    useMediaSearch(mediaType);

  return (
    <div className="position-relative">
      <InputGroup
        className="align-items-center rounded position-relative"
        size="lg"
      >
        <FaSearch className="search-icon" />
        <FormControl
          id="search"
          placeholder="Search..."
          value={searchTerm}
          className="ps-5 rounded-start"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </InputGroup>

      {/* Show search results if there are any */}
      {searchResults.length > 0 && (
        <div id="search-results">
          <ListGroup>
            {searchResults.map((item: any) => (
              <ListGroup.Item
                key={item._id}
                onClick={() => {
                  setSelectedMedia(item);
                  setSearchTerm("");
                }}
              >
                {item.title}{" "}
                {(mediaType === "Movie" ||
                  mediaType === "Album" ||
                  mediaType === "VideoGame") &&
                  `(${item.releaseDate.slice(0, 4)})`}
                {mediaType === "TV" && `(${item.firstAirDate.slice(0, 4)})`}
                {mediaType === "Book" &&
                  item.datePublished !== "" &&
                  `(${item.datePublished.slice(0, 4)})`}
                {mediaType === "Podcast" &&
                  `(${item.latestEpisodeDate.slice(0, 4)})`}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
}
