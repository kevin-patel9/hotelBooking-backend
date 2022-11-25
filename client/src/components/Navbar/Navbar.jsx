import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../context/SearchContext";


export const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <span className="logo">Lambda</span>
        </Link>
        {auth.user ? 
        (
        <>
        <div className="loggedUser">
          <span>{}</span>
            <h4 style={{margin: "0", fontSize: "1.4rem", fontWeight: "normal" }}>{auth.user.username}</h4>
            <button onClick={handleLogout} className="btn" >Logout</button>
        </div>
        </>
        ) : (
          <div className="navItems">
            <button  className="btn">Register</button>
            <button onClick={() => navigate("/login")} className="btn">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};
