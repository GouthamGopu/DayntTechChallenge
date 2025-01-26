import React from 'react';
import { Button } from '@mui/material';
import './Header.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {

    const logoutHandler = async () => {
      try {
          const res = await axios.get('http://localhost:8000/dt/user/logout', { withCredentials: true });
          if (res.data.success) {
              toast.success(res.data.message);
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

