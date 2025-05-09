import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export default function GalleryImage({ image, onClick, onDownload }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia
          component="img"
          height="180"
          image={image.url}
          alt={image.name}
          style={{ cursor: "pointer" }}
          onClick={onClick}
        />
        <CardActions>
          <Tooltip title="Download">
            <IconButton onClick={onDownload}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
}
