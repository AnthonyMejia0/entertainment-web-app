import { Media, MediaTypes } from '@/types/media';
import { TMDB } from '@lorenzopant/tmdb';
import { cache } from 'react';
import { Bookmark } from '@/types/bookmark';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const tmdb = new TMDB(TMDB_TOKEN!);

export const getBookmarkedMovies = cache(async (bookmarks: Bookmark[]) => {
  const media = await Promise.all(
    bookmarks.map(async (item) => {
      if (item.mediaType === 'movie') {
        const movie = await tmdb.movies.details({
          movie_id: item.mediaId,
        });

        const releaseDates = (
          await tmdb.movies.release_dates({
            movie_id: item.mediaId,
          })
        ).results;

        const usRelease = releaseDates.find((r) => r.iso_3166_1 === 'US');

        const certification = usRelease?.release_dates.find(
          (d) => d.certification,
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
      }

      return null;
    }),
  );

  return media.filter(Boolean) as Media[];
});

export const getBookmarkedShows = cache(async (bookmarks: Bookmark[]) => {
  const media = await Promise.all(
    bookmarks.map(async (item) => {
      if (item.mediaType === 'tv') {
        const tv = await tmdb.tv_series.details({ series_id: item.mediaId });
        const contentRatings = (
          await tmdb.tv_series.content_ratings({ series_id: item.mediaId })
        ).results;
        const certification = contentRatings.find(
          (rating) => rating.iso_3166_1 === 'US',
        )?.rating;

        return {
          id: tv.id,
          mediaType: 'tv',
          title: tv.name,
          overview: tv.overview,
          poster: tv.poster_path,
          backdrop: tv.backdrop_path,
          rating: tv.vote_average,
          releaseDate: tv.first_air_date,
          certification,
        };
      }

      return null;
    }),
  );

  return media.filter(Boolean) as Media[];
});
