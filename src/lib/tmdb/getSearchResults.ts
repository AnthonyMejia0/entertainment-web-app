import { Media, MediaTypes } from '@/types/media';
import { SearchAPI, TMDB } from '@lorenzopant/tmdb';
import { cache } from 'react';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const tmdb = new TMDB(TMDB_TOKEN!);
const search = new SearchAPI(TMDB_TOKEN!);

export const getSearchResultsMovie = cache(async (searchQuery: string) => {
  try {
    const movieResults = await search.movies({
      query: searchQuery,
    });

    const detailedMovies = await Promise.all(
      movieResults.results.map(async (media) => {
        const movie = await tmdb.movies.details({
          movie_id: media.id,
        });

        const releaseDates = (
          await tmdb.movies.release_dates({
            movie_id: media.id,
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

    return detailedMovies.filter(Boolean) as Media[];
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const getSearchResultsShows = cache(async (searchQuery: string) => {
  try {
    const showResults = await search.tv_series({
      query: searchQuery,
    });

    const detailedShows = await Promise.all(
      showResults.results.map(async (media) => {
        const show = await tmdb.tv_series.details({
          series_id: media.id,
        });

        const contentRatings = (
          await tmdb.tv_series.content_ratings({
            series_id: show.id,
          })
        ).results;

        const certification = contentRatings.find(
          (rating) => rating.iso_3166_1 === 'US',
        )?.rating;

        return {
          id: show.id,
          mediaType: MediaTypes.tv,
          title: show.name,
          overview: show.overview,
          poster: show.poster_path,
          backdrop: show.backdrop_path,
          rating: show.vote_average,
          releaseDate: show.first_air_date,
          certification,
        };
      }),
    );

    return detailedShows.filter(Boolean) as Media[];
  } catch (error) {
    console.log(error);
    return [];
  }
});
