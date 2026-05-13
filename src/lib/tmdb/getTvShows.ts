import { TMDB } from '@lorenzopant/tmdb';
import { cache } from 'react';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const tmdb = new TMDB(TMDB_TOKEN!);

export const getTvShows = cache(async (pages = 1) => {
  const responses = await Promise.all(
    Array.from({ length: pages }, (_, i) =>
      tmdb.discover.tv({
        page: i + 1,
        watch_region: 'US',
        include_adult: false,
        with_original_language: 'en',
        with_origin_country: 'US',
        sort_by: 'popularity.desc',
      }),
    ),
  );

  return Array.from(
    new Map(
      responses.flatMap((res) => res.results).map((show) => [show.id, show]),
    ).values(),
  );
});
