import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [registerDetail, setRegisterDetail] = useState({
    fullname: "",
    email: "",
    password: "",
    username: ""
  });

  const register = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:2007/api/users/register', { ...registerDetail });
    alert("Registered successfully");
    navigate('/');
  };

  return (
    <form onSubmit={register} className="container">
      <h2 className="input-label">Fullname</h2>
      <input 
        type="text" 
        value={registerDetail.fullname} 
        onChange={(e) => setRegisterDetail((prev) => ({ ...prev, fullname: e.target.value }))}
        className="input-field" 
      />
      <h2 className="input-label">Username</h2>
      <input 
        type="text" 
        value={registerDetail.username} 
        onChange={(e) => setRegisterDetail((prev) => ({ ...prev, username: e.target.value }))}
        className="input-field" 
      />
      <h2 className="input-label">Email</h2>
      <input 
        type="text" 
        value={registerDetail.email} 
        onChange={(e) => setRegisterDetail((prev) => ({ ...prev, email: e.target.value }))}
        className="input-field" 
      />
      <h2 className="input-label">Password</h2>
      <input 
        type="password" 
        value={registerDetail.password} 
        onChange={(e) => setRegisterDetail((prev) => ({ ...prev, password: e.target.value }))}
        className="input-field" 
      />
      <button 
        type="submit" 
        className="submit-btn" 
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
