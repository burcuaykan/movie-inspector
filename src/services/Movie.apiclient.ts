import axios from "axios";

const BASE_URL = "http://www.omdbapi.com/?";
const POSTER_URL = "http://img.omdbapi.com/?";

const API_KEY = "c1436b5c";

abstract class MovieApiClient {
  static getMovies(
    movieTitle: string,
    releaseYear: string,
    type: string,
    page: number
  ): Promise<any> {
    ///TODO typing
    const url = `${BASE_URL}s=${movieTitle}&y=${releaseYear}&type=${type}&page=${page}&apikey=${API_KEY}`;
    return axios
      .get(url)
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  }

  static getMovieById(imdbId: string): Promise<any> {
    ///TODO typing
    const url = `${BASE_URL}i=${imdbId}&apikey=${API_KEY}`;
    return axios
      .get(url)
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  }

  static async getPoster(imdbId: string): Promise<Blob> {
    try {
      const response = await axios.get(
        `${POSTER_URL}i=${imdbId}&apikey=${API_KEY}`,
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching file by ID:", error);
      throw error;
    }
  }
}

export default MovieApiClient;
