import { Link } from "react-router";
import digifyy from "./digifyy.png";

export default function Logo() {
  return (
    <Link to="/">
      <img className="h-14" src={digifyy} alt="logo of digifyy" />
    </Link>
  );
}
