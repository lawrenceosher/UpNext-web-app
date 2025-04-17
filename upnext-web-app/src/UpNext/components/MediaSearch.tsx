/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./MediaSearch.css";
import * as queueClient from "../clients/queueClient";

export default function MediaSearch({
  mediaType,
  setSelectedMedia,
}: {
  mediaType: string;
  setSelectedMedia: (media: any) => void;
}) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "" // Load search term from localStorage
  );
  const [searchResults, setSearchResults] = useState<any[]>(
    JSON.parse(localStorage.getItem("searchResults") || "[]") // Load search results from localStorage
  );
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debouncer: Update `debouncedSearchTerm` after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler); // Clear timeout if searchTerm changes
    };
  }, [searchTerm]);

  // Fetch search results when `debouncedSearchTerm` changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm === "") {
        setSearchResults([]);
        localStorage.removeItem("searchResults"); // Clear search results in localStorage
        return;
      }

      try {
        const response = await queueClient.searchMedia(
          mediaType,
          debouncedSearchTerm
        );
        setSearchResults(response);
        localStorage.setItem("searchResults", JSON.stringify(response)); // Save search results to localStorage
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [mediaType, debouncedSearchTerm]);

  // Save the search term to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

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
          className="ps-5"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </InputGroup>
      {searchResults && (
        <div id="search-results">
          <ListGroup>
            {searchResults.map((item: any) => (
              <ListGroup.Item
                key={item._id}
                onClick={() => {
                  setSelectedMedia(item);
                  setSearchTerm("");
                  localStorage.removeItem("searchTerm"); // Clear search term when an item is selected
                  localStorage.removeItem("searchResults"); // Clear search results when an item is selected
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