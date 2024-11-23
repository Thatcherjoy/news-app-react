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
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async (searchQuery, page = 1, isLoadMore = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?apiKey=${API_KEY}&sortBy=publishedAt&q=${searchQuery}&searchIn=title&pageSize=10&page=${page}&language=en`
      );
      const data = await response.json();

      if (data.articles) {
        if (isLoadMore) {
          // Append new articles to existing ones
          setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        } else {
          // Reset articles
          setArticles(data.articles);
        }

        // Check if got more articles to load
        setHasMore(data.articles.length === 10);
        setCurrentQuery(searchQuery);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setCurrentPage(1);
    setHasMore(true);
    fetchNews(searchQuery, 1, false);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchNews(currentQuery, nextPage, true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                <Header onSearch={handleSearch} />
                <Home
                  articles={articles}
                  onLoadMore={handleLoadMore}
                  hasMore={hasMore}
                  isLoading={isLoading}
                />
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
