import { FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./MediaSearch.css";

export default function MediaSearch() {
  return (
    <InputGroup className="align-items-center rounded position-relative" size="lg">
      <FaSearch className="search-icon" />
      <FormControl
        id="wd-search-assignment"
        placeholder="Search..."
        className="ps-5"
      />
    </InputGroup>
  );
}
