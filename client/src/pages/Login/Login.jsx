import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSetToken } from "../../service/authentication";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:2007/api/users/login`, {
      email: state.email,
      password: state.password,
    });
    loginSetToken(response, () => navigate("/"));
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Login Form</h1>
      </div>
      <form onSubmit={login}>
        <div className="input-container">
          <label htmlFor="email" className="input-label">Email</label>
          <input 
            type="text" 
            id="email" 
            value={state.email} 
            onChange={(e) => setState({ ...state, email: e.target.value })} 
            className="input-field" 
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">Password</label>
          <input 
            type="password" 
            id="password" 
            value={state.password} 
            onChange={(e) => setState({ ...state, password: e.target.value })} 
            className="input-field" 
          />
        </div>
        <div>
          <input 
            type="submit" 
            value="Login" 
            className="submit-button" 
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
