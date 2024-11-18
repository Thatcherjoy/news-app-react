import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);  //fetchNews function in App.js
  };

  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Typography variant="h6" className="title">
          Find My News
        </Typography>

        <form onSubmit={handleSearchSubmit} className="search-form">
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <Button variant="contained" color="primary" type="submit" className="search-button">
            Search News
          </Button>
        </form>

        <Button color="inherit" onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
