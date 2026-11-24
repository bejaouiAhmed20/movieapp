import { TMDB_ACCESS_TOKEN, TMDB_API_KEY } from "./firebase";

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w200";

export const FALLBACK_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

export const FALLBACK_MOVIES = [
  {
    id: "tmdb_155",
    tmdbId: 155,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: "2008",
    rating: "9.0",
    genres: ["Action", "Crime", "Drama"],
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"],
    custom: false,
  },
  {
    id: "tmdb_272",
    tmdbId: 272,
    title: "Batman Begins",
    poster: "https://image.tmdb.org/t/p/w200/4MpN4CiiZuZe6GRfZKdEX5Ufr7m.jpg",
    year: "2005",
    rating: "8.2",
    genres: ["Action", "Crime", "Drama"],
    actors: ["Christian Bale", "Michael Caine", "Liam Neeson", "Katie Holmes", "Gary Oldman"],
    custom: false,
  },
  {
    id: "tmdb_49026",
    tmdbId: 49026,
    title: "The Dark Knight Rises",
    poster: "https://image.tmdb.org/t/p/w200/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
    year: "2012",
    rating: "8.4",
    genres: ["Action", "Crime", "Drama"],
    actors: ["Christian Bale", "Tom Hardy", "Anne Hathaway", "Joseph Gordon-Levitt", "Marion Cotillard"],
    custom: false,
  },
  {
    id: "tmdb_414906",
    tmdbId: 414906,
    title: "The Batman",
    poster: "https://image.tmdb.org/t/p/w200/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    year: "2022",
    rating: "7.7",
    genres: ["Crime", "Mystery", "Thriller"],
    actors: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright", "Colin Farrell"],
    custom: false,
  },
  {
    id: "tmdb_27205",
    tmdbId: 27205,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w200/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    year: "2010",
    rating: "8.8",
    genres: ["Action", "Science Fiction", "Adventure"],
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy", "Ken Watanabe"],
    custom: false,
  },
  {
    id: "tmdb_157336",
    tmdbId: 157336,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    year: "2014",
    rating: "8.6",
    genres: ["Adventure", "Drama", "Science Fiction"],
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"],
    custom: false,
  },
  {
    id: "tmdb_299536",
    tmdbId: 299536,
    title: "Avengers: Infinity War",
    poster: "https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    year: "2018",
    rating: "8.3",
    genres: ["Action", "Adventure", "Science Fiction"],
    actors: ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans", "Scarlett Johansson"],
    custom: false,
  },
  {
    id: "tmdb_634649",
    tmdbId: 634649,
    title: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w200/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    year: "2021",
    rating: "8.0",
    genres: ["Action", "Adventure", "Science Fiction"],
    actors: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon", "Tobey Maguire"],
    custom: false,
  },
  {
    id: "tmdb_105",
    tmdbId: 105,
    title: "Back to the Future",
    poster: "https://image.tmdb.org/t/p/w200/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
    year: "1985",
    rating: "8.5",
    genres: ["Adventure", "Comedy", "Science Fiction"],
    actors: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson", "Crispin Glover", "Thomas F. Wilson"],
    custom: false,
  },
  {
    id: "tmdb_550",
    tmdbId: 550,
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    year: "1999",
    rating: "8.4",
    genres: ["Drama", "Thriller"],
    actors: ["Edward Norton", "Brad Pitt", "Helena Bonham Carter", "Meat Loaf", "Jared Leto"],
    custom: false,
  },
  {
    id: "tmdb_680",
    tmdbId: 680,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w200/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    year: "1994",
    rating: "8.5",
    genres: ["Thriller", "Crime"],
    actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Harvey Keitel", "Bruce Willis"],
    custom: false,
  }
];

export function getTmdbHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    accept: "application/json",
  };
  if (TMDB_ACCESS_TOKEN) {
    headers["Authorization"] = `Bearer ${TMDB_ACCESS_TOKEN}`;
  }
  return headers;
}

export function buildTmdbUrl(path: string, params: Record<string, string | number> = {}): string {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  if (TMDB_API_KEY) {
    url.searchParams.set("api_key", TMDB_API_KEY);
  }
  return url.toString();
}

export async function fetchTmdb(path: string, params: Record<string, string | number> = {}): Promise<any> {
  const url = buildTmdbUrl(path, params);
  const res = await fetch(url, { headers: getTmdbHeaders() });
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// 1. Get movies
export async function getPopularMovies(page = 1) {
  return fetchTmdb("/movie/popular", { page });
}

export async function getTrendingMovies() {
  return fetchTmdb("/trending/movie/day");
}

export async function getTopRatedMovies(page = 1) {
  return fetchTmdb("/movie/top_rated", { page });
}

export async function getUpcomingMovies(page = 1) {
  return fetchTmdb("/movie/upcoming", { page });
}

// 2. Search movies
export async function searchMovies(query: string, page = 1) {
  return fetchTmdb("/search/movie", { query, page });
}

// 3. Discover movies with filters
export async function discoverMovies(params: { genreId?: string | number; sortBy?: string; page?: number } = {}) {
  return fetchTmdb("/discover/movie", {
    sort_by: params.sortBy || "popularity.desc",
    page: params.page || 1,
    with_genres: params.genreId || "",
  });
}

// 4. Get all movie genres
export async function getMovieGenres() {
  return fetchTmdb("/genre/movie/list");
}

// Get movie details with cast
export async function getMovieDetails(id: number | string) {
  return fetchTmdb(`/movie/${id}`, { append_to_response: "credits" });
}
