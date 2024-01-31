import { Link } from "react-router-dom";

const Logo = () => {
  return (
    // <Link to="/">
    <div className="d-flex flex-row align-items-center">
      <img
        src={require("../assets/images/logos/logoIcon.png")}
        alt="logo"
        width={40}
        height={40.45}
      />
      <div className="p-2 sidenav-title">Admin Console</div>
    </div>
    // </Link>
  );
};

export default Logo;
