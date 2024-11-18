import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Header from "./Header/Header";

const API_KEY = "79dc5b4312e0412992f009edebbcaa20";

function App() {
  const [articles, setArticles] = useState([]);

  const fetchNews = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?apiKey=${API_KEY}&sortBy=publishedAt&q=${searchQuery}&searchIn=title&pageSize=10&page=1&language=en`
      );
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
        <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={
              <>
                <Header onSearch={fetchNews} />
                <Home articles={articles} />
              </>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;
