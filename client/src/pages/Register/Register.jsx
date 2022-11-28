import "./Register.css";
import { useState } from "react";
import { axiosInstance } from "../../config";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [register, setRegister] = useState("");
  const [credential, setCredential] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", credential);
      navigate("/login");
      
    } catch (err) {
      console.log(err.response.data);
      setRegister(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="registerContain">
        <input
          type="text"
          onChange={handleChange}
          placeholder="username"
          id="username"
          className="registerInput"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="email"
          id="email"
          className="registerInput"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          id="password"
          className="passwordInput"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="country"
          id="country"
          className="registerInput"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="city"
          id="city"
          className="registerInput"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="phone number"
          id="phone"
          className="registerInput"
        />
        <button onClick={handleClick} className="registerBtn">
          Sign Up
        </button>
        <Link to="/login" className="loginPage">
        <p>Already have a account? <i>Login</i></p>
        </Link>
        {register}
      </div>
    </div>
  );
};

export default Register;
