import { Media, MediaTypes } from '@/types/media';
import { TMDB } from '@lorenzopant/tmdb';
import { cache } from 'react';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const tmdb = new TMDB(TMDB_TOKEN!);

export const getRecommendedMedia = cache(async () => {
  const [popularMovies, popularTv] = await Promise.all([
    tmdb.discover.movie({
      sort_by: 'popularity.desc',
    }),

    tmdb.discover.tv({
      sort_by: 'popularity.desc',
    }),
  ]);

  const combinedMedia = [
    ...popularMovies.results.map((media) => ({
      ...media,
      media_type: MediaTypes.movie,
    })),
    ...popularTv.results.map((media) => ({
      ...media,
      media_type: MediaTypes.tv,
    })),
  ];

  // Shuffle recommendations
  const shuffledMedia = combinedMedia.sort(() => Math.random() - 0.5);

  const detailedRecommendations = await Promise.all(
    shuffledMedia.map(async (media) => {
      if (media.media_type === MediaTypes.movie) {
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
      }

      if (media.media_type === MediaTypes.tv) {
        const tv = await tmdb.tv_series.details({
          series_id: media.id,
        });

        const contentRatings = (
          await tmdb.tv_series.content_ratings({
            series_id: media.id,
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
        };
      }

      return null;
    }),
  );

  return detailedRecommendations.filter(Boolean) as Media[];
});
