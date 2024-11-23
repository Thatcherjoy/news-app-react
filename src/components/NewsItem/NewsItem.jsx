import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./NewsItem.css";

function NewsItem({ article, addFavorite }) {
  const { source, publishedAt, urlToImage, title, url } = article;

  const isRemoved = title.toLowerCase().includes("[removed]");

  const openSource = (event) => {
    event.stopPropagation();
    if (!isRemoved) {
      window.open(url, "_blank");
    }
  };

  const handleFavorite = () => {
    if (!isRemoved) {
      addFavorite(article);
    }
  };

  const renderMedia = () => {
    if (isRemoved) {
      return (
        <Box className="news-item-no-image removed-content">
          <ErrorOutlineIcon sx={{ fontSize: 60, color: "text.disabled" }} />
          <Typography variant="body2" color="text.secondary" align="center">
            Content Removed
          </Typography>
        </Box>
      );
    }

    if (!urlToImage) {
      return (
        <Box className="news-item-no-image">
          <ImageNotSupportedIcon
            sx={{ fontSize: 60, color: "text.disabled" }}
          />
          <Typography variant="body2" color="text.secondary" align="center">
            No Image Available
          </Typography>
        </Box>
      );
    }

    return (
      <CardMedia
        component="img"
        image={urlToImage}
        alt={title}
        className="news-item-image"
        onClick={openSource}
        style={{ cursor: isRemoved ? "default" : "pointer" }}
      />
    );
  };

  return (
    <Card className="news-item-card">
      <CardContent className="news-item-header">
        <Avatar
          sx={{
            bgcolor: isRemoved ? "grey.500" : "#f44336",
            marginRight: 1,
          }}
        >
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

      {renderMedia()}

      <CardContent>
        <Typography variant="body1" className={isRemoved ? "removed-text" : ""}>
          {title}
        </Typography>
      </CardContent>

      <CardContent className="news-item-actions">
        <IconButton
          sx={{ color: isRemoved ? "default" : "red" }}
          onClick={handleFavorite}
          disabled={isRemoved}
        >
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default NewsItem;
