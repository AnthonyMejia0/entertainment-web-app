import { SearchAPI } from '@lorenzopant/tmdb';
import { cache } from 'react';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

const search = new SearchAPI(TMDB_TOKEN!);

export const getSearchResultsMovie = cache(async (searchQuery: string) => {
  try {
    const movieResults = (
      await search.movies({
        query: searchQuery,
      })
    ).results;

    return movieResults;
  } catch (error) {
    return [];
  }
});

export const getSearchResultsShows = cache(async (searchQuery: string) => {
  try {
    const showResults = (
      await search.tv_series({
        query: searchQuery,
      })
    ).results;

    return showResults;
  } catch (error) {
    return [];
  }
});
