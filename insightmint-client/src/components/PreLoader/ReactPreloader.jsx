import "./ReactPreloader.css";
import { Sugar } from "react-preloaders";
import logo from "../../assets/images/logo/logo_light.png";
import Container from "../Container/Container";

const ReactPreloader = () => {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <figure className="absolute top-16">
          <img className="sm:h-20 sm:w-auto" src={logo} alt="logo" />
        </figure>

        <div className="[&>div]:!-z-40">
          <Sugar />
        </div>
      </div>
    </Container>
  );
};

export default ReactPreloader;
