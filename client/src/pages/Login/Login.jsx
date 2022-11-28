import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginFail, loginStart, loginSuccess } from "../../context/SearchContext";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";

export const Login = () => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(()=> {
    localStorage.setItem("user", JSON.stringify(auth.user))
  }, [auth.user])

  const handleChange = (e) => {
    setCredential(prev => ({...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch(loginStart())

    try {

        const res = await axiosInstance.post("/auth/login", credential)
        dispatch(loginSuccess(res.data))
        navigate("/")
        
    } catch (err) {
        dispatch(loginFail(err.response.data))
    }
  }

  return (
    <div className="login">
      <div className="loginContain">
        <input
          type="text"
          onChange={handleChange}
          placeholder="email"
          id="email"
          className="loginInput"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          id="password"
          className="passwordInput"
        />
        <button disabled={auth.loading} onClick={handleClick} className="loginBtn"> Login </button>
        <Link to="/register" className="signUpLink" >
          <p>Sign Up</p>
        </Link>
        {auth.error && <span>{auth.error}</span>}
      </div>
    </div>
  );
};

export default Login;
