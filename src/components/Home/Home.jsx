import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NewsItem from "../NewsItem/NewsItem";
import MyFavouritesPanel from "../MyFavouritesPanel/MyFavouritesPanel";
import "./Home.css";

function Home({ articles }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/");
    }

    //Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, [navigate]);

  const addFavorite = (article) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, article];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <Grid container direction="column" className="main-container">
      <Grid item lg={11} className="content-container">
        <Grid container direction="row">
          {/* My Favorites */}
          <Grid item lg={2.5} className="left-panel-container">
            <MyFavouritesPanel favorites={favorites} />
          </Grid>

          {/* Display Results */}
          <Grid item lg={9.5} className="result-container">
            <Typography variant="h6" color="primary">
              Display Results
            </Typography>
            <div className="articles-container">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <NewsItem key={index} article={article} addFavorite={addFavorite} />
                ))
              ) : (
                <Typography variant="body2" color="white">
                  No results to display.
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
