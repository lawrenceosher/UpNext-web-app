import Image from "react-bootstrap/Image";
import "./SummaryCard.css";
import { Link } from "react-router-dom";

export default function SummaryCard({src, title, subtitle, description }: {src: string, title: string, subtitle: string, description: string}) {
  return (
    <div className="bg-transparent mt-4 card-border d-flex flex-row text-center mh-75">
      <Image src={src} className="p-3 w-50" />
      <div className="p-3">
        <Link
          to="/UpNext/Movies/1"
          className="fw-bold fs-1 text-decoration-none text-white"
        >
          {title}
        </Link>
        <h4 className="mt-3">{subtitle}</h4>
        <p className="p-3 overflow-y-hidden text-start">
          {description}
        </p>
      </div>
    </div>
  );
}
