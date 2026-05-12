import { Media, MediaTypes } from '@/types/media';
import { TMDB } from '@lorenzopant/tmdb';
import { cache } from 'react';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const tmdb = new TMDB(TMDB_TOKEN!);

export const getMovies = cache(async () => {
  const movies = await tmdb.discover.movie({
    region: 'US',
    include_adult: false,
    with_original_language: 'en',
    with_origin_country: 'US',
    sort_by: 'popularity.desc',
  });

  const detailedMovies = await Promise.all(
    movies.results.map(async (movie) => {
      const releaseDates = (
        await tmdb.movies.release_dates({
          movie_id: movie.id,
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
      };
    }),
  );

  return detailedMovies as Media[];
});
