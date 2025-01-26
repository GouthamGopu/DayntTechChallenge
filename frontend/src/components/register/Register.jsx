import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";

const Register = () => {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {user} = useSelector(store=>store.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 

    try {
      const res = await axios.post("http://localhost:8000/dt/user/register", inputData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login"); 
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
      console.error("Registration error:", err);
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
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={inputData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputData.email}
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
              value={inputData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
