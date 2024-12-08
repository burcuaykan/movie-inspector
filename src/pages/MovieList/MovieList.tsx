import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import LoadingState from "../../components/LoadingState/LoadingState";
import MovieService from "../../services/Movie.service";
import SearchRow from "./components/SearchRow/SearchRow";
import TablePaginationActions from "./components/TablePaginationActions/TablePaginationActions";
import "./MovieList.scss";

const MovieList = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any>();
  const [movieTitle, setMovieTitle] = useState<string>("pokemon");
  const [page, setPage] = useState<number>(1);
  const [releaseYear, setReleaseYear] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(1);
  const [type, setType] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = () => {
    setLoading(true);
    MovieService.getMovies(movieTitle, releaseYear, type, page)
      .then((response) => {
        setMovies(response.Search);
        setTotalResults(response.totalResults);
      })
      .finally(() => setLoading(false));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowClick = (imdbID: string) => {
    navigate(`/${imdbID}`);
  };

  const handleSearch = () => {
    if (releaseYear && !/^\d{4}$/.test(releaseYear)) {
      setErrorMessage("Please enter a valid 4-digit release year.");
      return;
    }

    setPage(1);
    fetchMovies();
  };

  const handleCloseSnackbar = () => {
    setErrorMessage("");
  };

  return (
    <div id="movie-list">
      {loading ? (
        <LoadingState />
      ) : (
        <div>
          <SearchRow
            handleSearch={handleSearch}
            movieTitle={movieTitle}
            releaseYear={releaseYear}
            setMovieTitle={setMovieTitle}
            setReleaseYear={setReleaseYear}
            setType={setType}
            type={type}
          />
          {movies && (
            <div className="movie-list-table">
              <TableContainer className="table-container">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Movie Name</TableCell>
                      <TableCell>Release Year</TableCell>{" "}
                      <TableCell>Type</TableCell>
                      <TableCell>IMDB ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {movies.map((movie: any) => (
                      <TableRow
                        key={movie.imdbID}
                        onClick={() => handleRowClick(movie.imdbID)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>{movie.Title}</TableCell>
                        <TableCell>{movie.Year}</TableCell>
                        <TableCell>{movie.Type}</TableCell>
                        <TableCell>{movie.imdbID}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={totalResults}
                rowsPerPage={10}
                page={page - 1}
                onPageChange={handleChangePage}
                ActionsComponent={(subProps) => (
                  <TablePaginationActions
                    {...subProps}
                    page={page}
                    setPage={setPage}
                    totalResults={totalResults}
                  />
                )}
              />
            </div>
          )}
        </div>
      )}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default MovieList;
