import { Media, MediaTypes } from '@/types/media';
import { TMDB } from '@lorenzopant/tmdb';
import { cache } from 'react';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const tmdb = new TMDB(TMDB_TOKEN!);

export const getRecommendedMedia = cache(async () => {
  try {
    const popularMovies = (
      await tmdb.discover.movie({ sort_by: 'popularity.desc' })
    ).results;
    const popularShows = (
      await tmdb.discover.tv({ sort_by: 'popularity.desc' })
    ).results;

    const combinedMedia = [
      ...popularMovies.map((movie) => ({
        ...movie,
        media_type: MediaTypes.movie,
      })),
      ...popularShows.map((show) => ({ ...show, media_type: MediaTypes.tv })),
    ];

    const shuffledMedia = combinedMedia.sort(() => Math.random() - 0.5);

    return shuffledMedia;
  } catch (error) {
    return [];
  }
});
