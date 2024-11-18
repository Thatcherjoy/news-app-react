import React from "react";
import { Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import "./MyFavouritesPanel.css";

function MyFavouritesPanel({ favorites }) {
  const openArticle = (url) => {
    window.open(url, "_blank");
  };

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    window.location.reload();
  };

  return (
    <div className="my-favourites-panel">
      <div className="header">
        <Typography variant="h6" color="primary">
          My Favorites: {favorites.length}
        </Typography>
        <Button variant="contained" color="secondary" onClick={clearFavorites}>
          Clear
        </Button>
      </div>
      <List>
        {favorites.map((article, index) => (
          <ListItem
            key={index}
            button
            onClick={() => openArticle(article.url)}
            className="favourite-item"
          >
            <ListItemText primary={article.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MyFavouritesPanel;
