import { TMDB } from '@lorenzopant/tmdb';
import { cache } from 'react';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const tmdb = new TMDB(TMDB_TOKEN!);

export const getTrendingMedia = cache(async () => {
  try {
    const trending = (await tmdb.trending.all({ time_window: 'week' })).results;
    return trending;
  } catch (error) {
    return [];
  }
});
