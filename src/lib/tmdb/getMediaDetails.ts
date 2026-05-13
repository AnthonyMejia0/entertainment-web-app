import { Media, MediaTypes } from '@/types/media';
import { TMDB } from '@lorenzopant/tmdb';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
const tmdb = new TMDB(TMDB_TOKEN!);

export const getMovieDetails = async (id: number) => {
  try {
    const movie = await tmdb.movies.details({
      movie_id: id,
    });

    const releaseDates = (
      await tmdb.movies.release_dates({
        movie_id: id,
      })
    ).results;

    const usRelease = releaseDates.find(
      (release) => release.iso_3166_1 === 'US',
    );

    const certification = usRelease?.release_dates.find(
      (date) => date.certification,
    )?.certification;

    return {
      id: movie.id,
      mediaType: MediaTypes.movie,
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      certification,
    } as Media;
  } catch (error) {
    return null;
  }
};

export const getShowDetails = async (id: number) => {
  try {
    const tv = await tmdb.tv_series.details({
      series_id: id,
    });

    const contentRatings = (
      await tmdb.tv_series.content_ratings({
        series_id: id,
      })
    ).results;

    const certification = contentRatings.find(
      (rating) => rating.iso_3166_1 === 'US',
    )?.rating;

    return {
      id: tv.id,
      mediaType: MediaTypes.tv,
      title: tv.name,
      overview: tv.overview,
      poster: tv.poster_path,
      backdrop: tv.backdrop_path,
      rating: tv.vote_average,
      releaseDate: tv.first_air_date,
      certification,
    } as Media;
  } catch (error) {
    return null;
  }
};
