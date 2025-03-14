import Image from "react-bootstrap/Image";

export default function MovieDetails() {
  return (
    <div className="d-flex">
      <Image src="dpwolverine.jpg" width={400} className="border border-4 border-white" />
      <div className="ps-4">
        <h1 className="fw-bold">Deadpool and Wolverine</h1>
        <h4 className="mt-5">Directed by Shawn Levy</h4>
        <h4 className="mt-3">July 2024</h4>
        <h4 className="mt-3">2 Hours 33 Minutes</h4>
        <h4 className="mt-3">Genre: Superhero/Action</h4>
        <h5 className="mt-3">Notable Cast: Ryan Reynolds, Hugh Jackman</h5>
        <h5 className="mt-5 fw-bold">Description</h5>
        <p className="mt-3 text-start pe-3">
          A listless Wade Wilson toils away in civilian life with his days as
          the morally flexible mercenary, Deadpool, behind him. But when his
          homeworld faces an existential threat, Wade must reluctantly suit-up
          again with an even more reluctant Wolverine.
        </p>
      </div>
    </div>
  );
}
