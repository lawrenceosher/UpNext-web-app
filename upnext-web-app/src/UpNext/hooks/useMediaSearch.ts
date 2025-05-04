import { useState, useEffect } from "react";
import * as queueClient from "../clients/queueClient";

/**
 * Manages the search functionality for media items.
 * It utilizes a debounced search term and fetches search results from an external API.
 * @param mediaType - The type of media to search for (e.g., "Movie", "TV", etc.)
 * @returns An object containing the search term, function to set the search term, and search results
 */
const useMediaSearch = (mediaType: string) => {
  // State for managing search term and results
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
        return;
      }

      try {
        const response = await queueClient.searchMedia(
          mediaType,
          debouncedSearchTerm
        );
        setSearchResults(response);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [mediaType, debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
  };
};

export default useMediaSearch;
