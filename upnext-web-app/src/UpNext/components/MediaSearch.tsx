/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./MediaSearch.css";
import { useEffect, useState } from "react";
import * as queueClient from "../clients/queueClient";
import { Movie } from "../types/movie";

export default function MediaSearch({
  mediaType,
  setSelectedMovie,
}: {
  mediaType: string;
  setSelectedMovie: (movie: Movie) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await queueClient.searchMedia(mediaType, searchTerm);
        setSearchResults(response);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [mediaType, searchTerm]);

  return (
    <>
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
      <div id="search-results" className="z-3 position-absolute">
        <ListGroup>
          {searchResults.map((item: any) => (
            <ListGroup.Item
              key={item._id}
              onClick={() => {
                if (mediaType === "movie") {
                  setSelectedMovie(item);
                  setSearchTerm("");
                }
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
                `(${item.publishedDate.slice(0, 4)})`}
              {mediaType === "Podcast" &&
                `(${item.latestEpisodeDate.slice(0, 4)})`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}
