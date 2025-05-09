import React, { useState, useEffect, Suspense } from "react";
import {
  Grid,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
  Container,
} from "@mui/material";
import axios from "axios";

const GalleryImage = React.lazy(() => import("./GalleryImage"));

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get("https://[2401:4900:1cb2:e07c:43f3:bf1b:d051:37f]/api/files/get-images")
      .then((resp) =>{ 
        console.log("IMGs",resp.data)
        setImages(resp.data)
      })
      .catch((err) => console.error("Failed to fetch images", err));
  }, []);

  const handleDownload = async (image) => {
    try {
      const response = await fetch(`https://[2401:4900:1cb2:e07c:43f3:bf1b:d051:37f]/api/files/download?id=${image.name}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Image Gallery
      </Typography>
      <Grid container spacing={2}>
        <Suspense fallback={<CircularProgress />}>
          {images.map((image, index) => (
            <GalleryImage
              key={index}
              image={image}
              onClick={() => setSelectedImage(image)}
              onDownload={() => handleDownload(image)}
            />
          ))}
        </Suspense>
      </Grid>

      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
