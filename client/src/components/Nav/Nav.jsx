import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutDestroyToken, getToken } from "../../service/authentication";
import "./navStyles.css";

const Nav = (props) => {
  const navigate = useNavigate();

  return (
    <nav className="nav-container">
      <div>
        <Link to="/" className="nav-link">
          <h1 className="nav-title">Blog</h1>
        </Link>
      </div>
      <div className="nav-items">
        {getToken() && (
          <p className="nav-username">username:{props?.username}</p>
        )}
        {!getToken() ? (
          <>
            <Link to="/login" className="nav-link">
              <button className="nav-button login">Login</button>
            </Link>
            <Link to="/register" className="nav-link">
              <button className="nav-button register">Register</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/blog/create" className="nav-link">
              <button className="nav-button create-post">Create Post</button>
            </Link>
            <button onClick={() => { logoutDestroyToken(() => window.location.reload()) }} className="nav-button logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
