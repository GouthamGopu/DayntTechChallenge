import React from 'react';
import { Button } from '@mui/material';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h3>DAYNT TECH</h3>
      </div>
      <div className="header-right">
        <Button variant="contained" color="error" className="logout-btn">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;

