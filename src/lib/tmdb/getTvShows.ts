import { Media, MediaTypes } from '@/types/media';
import { TMDB } from '@lorenzopant/tmdb';
import { cache } from 'react';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const tmdb = new TMDB(TMDB_TOKEN!);

export const getTvShows = cache(async () => {
  const shows = await tmdb.discover.tv({
    watch_region: 'US',
    include_adult: false,
    with_original_language: 'en',
    with_origin_country: 'US',
    sort_by: 'popularity.desc',
  });

  const detailedShows = await Promise.all(
    shows.results.map(async (show) => {
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

  return detailedShows as Media[];
});
