import React, { useState } from "react";
import {  Grid, TextField, Button, Typography, Container, Box} from "@mui/material";
import { Navigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedin") === "true");

  const loginHandle = () => {
    if (username === "ikhwan" && password === "12345") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true")
    } else {
      alert("Wrong username or password");
    }
  };

  if (isLoggedIn) return <Navigate to="/home" />;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="xs" className="login-container">
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" component="h1" className="title">
              Find My News
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              className="fullWidth"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              className="fullWidth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={loginHandle}
              className="fullWidth"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
