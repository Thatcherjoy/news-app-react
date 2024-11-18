import React from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./NewsItem.css";

function NewsItem({ article, addFavorite }) {
  const { source, publishedAt, urlToImage, title, url } = article;

  const openSource = (event) => {
    event.stopPropagation();
    window.open(url, "_blank");
  };

  const handleFavorite = () => {
    addFavorite(article);
  };

  return (
    <Card className="news-item-card">
      <CardContent className="news-item-header">
        <Avatar sx={{ bgcolor: "#f44336", marginRight: 1 }}>
          {source.name.charAt(0).toUpperCase()}
        </Avatar>
        <div className="news-item-header-text">
          <Typography variant="subtitle2" color="textSecondary">
            {source.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(publishedAt).toLocaleDateString()}
          </Typography>
        </div>
      </CardContent>

      {urlToImage && (
        <CardMedia
          component="img"
          image={urlToImage}
          alt={title}
          className="news-item-image"
          onClick={openSource} 
          style={{ cursor: "pointer" }} 
        />
      )}
      
      <CardContent>
        <Typography variant="body1">{title}</Typography>
      </CardContent>
      
      <CardContent className="news-item-actions">
        <IconButton color="primary" onClick={handleFavorite}>
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default NewsItem;
