import Image from "react-bootstrap/Image";
import { BiMovie } from "react-icons/bi";
import { TbChairDirector } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { MdAccessTime, MdAdd, MdOutlineDescription } from "react-icons/md";
import { FaMasksTheater } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
import ListGroupSelect from "../../components/ListGroupSelect";

export default function MovieDetails() {
  return (
    <div className="d-flex">
      <Image
        src="dpwolverine.jpg"
        width={400}
        className="border border-4 border-white"
      />
      <div className="ps-4">
        <h1 className="fw-bold d-flex align-items-center display-4">
          <BiMovie className="me-2" /> Deadpool and Wolverine
        </h1>
        <h4 className="mt-3 d-flex align-items-center">
          <TbChairDirector className="me-2 fs-3" /> Directed by Shawn Levy
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <CiCalendar className="me-2 fs-3" /> July 2024
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <MdAccessTime className="me-2 fs-3" /> 2 Hours 33 Minutes
        </h4>
        <h4 className="mt-3 d-flex align-items-center">
          <FaMasksTheater className="me-2 fs-3" /> Superhero/Action
        </h4>
        <h5 className="mt-3 d-flex align-items-center">
          <IoIosPeople className="me-2 fs-2" /> Ryan Reynolds, Hugh Jackman
        </h5>
        <h5 className="mt-5 fw-bold d-flex align-items center">
          <MdOutlineDescription className="me-2 fs-3" /> Description
        </h5>
        <p className="mt-3 text-start pe-3">
          A listless Wade Wilson toils away in civilian life with his days as
          the morally flexible mercenary, Deadpool, behind him. But when his
          homeworld faces an existential threat, Wade must reluctantly suit-up
          again with an even more reluctant Wolverine.
        </p>

        <div>
          <Form className="d-flex align-items-center flex-fill justify-content-end me-2">
            <span className="me-3">
            <ListGroupSelect />
            </span>
            <Button
              size="lg"
              id="action-button"
              className="my-3 float-end purple-brand-bg border-0 w-25"
            >
              <MdAdd className="me-1 mb-1 fs-4" /> Add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
