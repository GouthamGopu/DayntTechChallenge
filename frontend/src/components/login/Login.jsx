import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from 'react-redux';

import "./Login.css";
import { setAuthUser } from "../../../redux/authSlice";

const Login = () => {
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const {user} = useSelector(store=>store.auth);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 


    try {
      const res = await axios.post(
        "http://localhost:8000/dt/user/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user)); 
        toast.success(res.data.message);
        navigate("/"); 
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); 
    }
  };
  useEffect(()=>{
    if(user){
        navigate("/");
    }
  },[user])
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
