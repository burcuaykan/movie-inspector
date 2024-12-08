import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieService from "../../services/Movie.service";
import LoadingState from "../../components/LoadingState/LoadingState";
import { Box, Container, Divider, Typography } from "@mui/material";
import "./MovieDetails.scss";
import { Circle } from "@mui/icons-material";

const MovieDetails = (): JSX.Element => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movieData, setMovieData] = useState<any>();
  const [poster, setPoster] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const emptyPoster = require("../../assets/empty-poster.png") as string;

  useEffect(() => {
    fetchMovieData();
    fetchAttachmentPreview();
  }, [imdbID]);

  const fetchMovieData = () => {
    if (imdbID) {
      setLoading(true);
      MovieService.getMovieById(imdbID)
        .then(setMovieData)
        .finally(() => setLoading(false));
    }
  };

  const fetchAttachmentPreview = async () => {
    if (imdbID) {
      setLoading(true);
      try {
        const response = await MovieService.getPoster(imdbID);
        const imageUrl = URL.createObjectURL(response); // Convert Blob to object URL
        setPoster(imageUrl);
        setLoading(false);
        return imageUrl;
      } catch (error) {
        console.error("Error fetching attachment preview:", error);
        return null;
      }
    }
  };

  return (
    <Container id="movie-details">
      {loading ? (
        <LoadingState />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="h3" style={{ color: "#fbbd84" }}>
              {movieData?.Title}
            </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="subtitle2">{movieData?.Type}</Typography>
              <Circle
                style={{ width: "4px", color: "#e9e9e9", margin: "0 0.5rem" }}
              />
              <Typography variant="subtitle2">{movieData?.Year}</Typography>
              <Circle
                style={{ width: "4px", color: "#e9e9e9", margin: "0 0.5rem" }}
              />
              <Typography variant="subtitle2">{movieData?.Runtime}</Typography>
              <Circle
                style={{ width: "4px", color: "#e9e9e9", margin: "0 0.5rem" }}
              />
              <Typography variant="subtitle2">{movieData?.Genre}</Typography>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {poster ? (
              <img src={poster} alt="poster" className="attachment-image" />
            ) : (
              <img
                src={emptyPoster}
                alt="poster"
                className="attachment-image"
              />
            )}
            <Typography variant="body1" style={{ marginLeft: "2rem" }}>
              {movieData?.Plot}
              <div className="rating-boxes">
                <Box className="rating-box">
                  <Typography variant="subtitle1">
                    <b>IMDB Rating</b>
                  </Typography>
                  <Typography variant="body1">
                    {movieData?.imdbRating}
                  </Typography>
                </Box>
                {movieData?.Ratings.map((rating: any) => {
                  return (
                    <Box className="rating-box">
                      <Typography variant="subtitle1">
                        <b>{rating.Source}</b>
                      </Typography>
                      <Typography variant="body1">{rating.Value}</Typography>
                    </Box>
                  );
                })}
              </div>
            </Typography>
          </div>
          <Typography
            variant="body1"
            style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            <b>Director: </b>
            {movieData?.Director}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "0.5rem" }}>
            <b>Writer: </b>
            {movieData?.Writer}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "0.5rem" }}>
            <b>Cast: </b>
            {movieData?.Actors}
          </Typography>
          <Typography variant="body1">
            <b>IMDB ID: </b>
            {movieData?.imdbID}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default MovieDetails;
