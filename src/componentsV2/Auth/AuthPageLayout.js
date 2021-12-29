import { Link } from "react-router-dom";
import Hero from "../Hero";

const AuthPageLayout = (props) => {
  return (
    <div className="container container-custom">
      <Hero />
      <section className="section">
        {props.children}
        <div className="field">
          <p>
            {props.infoMsg}
            <Link to={props.link} className="link">
              {props.linkName}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AuthPageLayout;
