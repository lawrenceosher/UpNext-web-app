/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./MediaSearch.css";
import { useEffect, useState } from "react";
import * as queueClient from "../clients/queueClient";

export default function MediaSearch({ mediaType }: { mediaType: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm === '') {
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
          id="wd-search-assignment"
          placeholder="Search..."
          value={searchTerm}
          className="ps-5"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </InputGroup>
      <div id="search-results" className="z-3 position-absolute w-75">
        <ListGroup>
          {searchResults.map((item: any) => (
            <ListGroup.Item key={item._id}>
              {item.title}{" "}
              {(mediaType === "movie" || mediaType === "album" || mediaType === "VideoGame") && `(${item.releaseDate.slice(0, 4)})`}
              {(mediaType === "tv") && `(${item.firstAirDate.slice(0, 4)})`}
              {(mediaType === "book" && item.datePublished !== '') && `(${item.publishedDate.slice(0, 4)})`}
              {(mediaType === "podcast") && `(${item.latestEpisodeDate.slice(0, 4)})`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}
