import MovieApiClient from "./Movie.apiclient";

abstract class MovieService {
  static getMovies(
    movieTitle: string,
    releaseYear: string,
    type: string,
    page: number
  ): Promise<any> {
    //TODO typing
    return MovieApiClient.getMovies(movieTitle, releaseYear, type, page);
  }

  static getMovieById(imdbID: string): Promise<any> {
    //TODO typing
    return MovieApiClient.getMovieById(imdbID);
  }

  static getPoster(imdbID: string): Promise<Blob> {
    //TODO typing
    return MovieApiClient.getPoster(imdbID);
  }
}

export default MovieService;
