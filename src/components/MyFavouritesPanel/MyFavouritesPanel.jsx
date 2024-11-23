import React from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./MyFavouritesPanel.css";

function MyFavouritesPanel({ favorites = [] }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const openArticle = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setOpenDialog(false);
    window.location.reload();
  };

  const removeFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, idx) => idx !== index);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    window.location.reload();
  };

  const filteredFavorites = favorites.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper className="my-favourites-panel" elevation={0}>
      <Box className="header">
        <Box display="flex" alignItems="center" gap={1}>
          <FavoriteIcon style={{ color: "red" }} />
          <Typography variant="h6" style={{ color: "#ff3d47" }}>
            My Favorites ({favorites.length})
          </Typography>
        </Box>
      </Box>

      <Box mb={2}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search favorites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredFavorites.length === 0 ? (
        <Box py={4} textAlign="center">
          <Typography color="textSecondary">
            {searchTerm ? "No matching favorites found" : "No favorites yet"}
          </Typography>
        </Box>
      ) : (
        <List>
          {filteredFavorites.map((article, index) => (
            <ListItem key={index} className="favourite-item">
              <ListItemText
                primary={article.title}
                secondary={
                  article.dateAdded &&
                  new Date(article.dateAdded).toLocaleDateString()
                }
                onClick={() => openArticle(article.url)}
                style={{ cursor: "pointer" }}
              />
              <Box display="flex" gap={1}>
                <IconButton
                  size="small"
                  onClick={() => openArticle(article.url)}
                  className="action-button"
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => removeFavorite(index)}
                  className="action-button"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {favorites.length > 0 && (
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDialog(true)}
            size="small"
          >
            Clear All
          </Button>
        </Box>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Clear all favorites?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete all your favorite articles.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={clearFavorites} color="error" variant="contained">
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default MyFavouritesPanel;
