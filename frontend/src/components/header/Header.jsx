import React from 'react';
import { Button } from '@mui/material';
import './Header.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/dt/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <header className="header">
      <div className="header-left">
        <h3>DAYNT TECH</h3>
      </div>
      <div className="header-right">
        <Button variant="contained" color="error" className="logout-btn"
        onClick={()=>{logoutHandler()}}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;

