// 'use client';

// import { Media } from '@/types/media';
// import { useCallback, useEffect, useState } from 'react';
// import MediaPreview from './MediaPreview';
// import { useSearchStore } from '@/stores/search-store';
// import {
//   getSearchResultsMovie,
//   getSearchResultsShows,
// } from '@/lib/tmdb/getSearchResults';

// function SearchResults() {
//   const search = useSearchStore((s) => s.input);
//   const [searchResults, setSearchResults] = useState<Media[]>([]);
//   const [movies, setMovies] = useState<Media[]>([]);
//   const [shows, setShows] = useState<Media[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSearchResults = useCallback(async () => {
//     const fetchedMovies = await getSearchResultsMovie(search);
//     const fetchedShows = await getSearchResultsShows(search);

//     setMovies([...fetchedMovies]);
//     setShows([...fetchedShows]);
//     setSearchResults([...fetchedMovies, ...fetchedShows]);
//   }, [search]);

//   useEffect(() => {
//     fetchSearchResults();
//   }, [fetchSearchResults]);

//   return (
//     <div className={`w-full h-full`}>
//       <h1 className="p1 text-white mb-4 md:mb-6">
//         {searchResults.length > 0
//           ? `Found ${searchResults.length} results for '${search}'`
//           : 'No results found'}
//         {searchResults.length === 0 && loading && `Searching for ${search}...`}
//       </h1>
//       <div className="flex flex-row space-x-4 md:space-x-10 max-w-full overflow-x-scroll pr-4 md:pr-6.25 lg:pr-9">
//         {searchResults.map((media) => (
//           <MediaPreview key={media.id} media={media} isTrending />
//         ))}
//       </div>
//       {movies.length > 0 && (
//         <>
//           <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">Movies</h1>
//           <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
//             {movies.map((movie) => (
//               <MediaPreview key={movie.id} media={movie} />
//             ))}
//           </div>
//         </>
//       )}
//       {shows.length > 0 && (
//         <>
//           <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">
//             TV Series
//           </h1>
//           <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
//             {shows.map((movie) => (
//               <MediaPreview key={movie.id} media={movie} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default SearchResults;

'use client';

import { Media, MediaTypes } from '@/types/media';
import { useEffect, useState } from 'react';
import MediaPreview from './MediaPreview';
import { useSearchStore } from '@/stores/search-store';
import {
  getSearchResultsMovie,
  getSearchResultsShows,
} from '@/lib/tmdb/getSearchResults';
import { MovieResultItem, TVSeriesResultItem } from '@lorenzopant/tmdb';

function SearchResults() {
  const search = useSearchStore((s) => s.input);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [searchResults, setSearchResults] = useState<
    (MovieResultItem | TVSeriesResultItem)[]
  >([]);
  const [movies, setMovies] = useState<MovieResultItem[]>([]);
  const [shows, setShows] = useState<TVSeriesResultItem[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) {
      setMovies([]);
      setShows([]);
      setSearchResults([]);
      return;
    }

    let active = true;

    const run = async () => {
      const [fetchedMovies, fetchedShows] = await Promise.all([
        getSearchResultsMovie(debouncedSearch),
        getSearchResultsShows(debouncedSearch),
      ]);

      if (!active) return;

      setMovies(fetchedMovies);
      setShows(fetchedShows);
      setSearchResults([...fetchedMovies, ...fetchedShows]);
    };

    run();

    return () => {
      active = false;
    };
  }, [debouncedSearch]);

  return (
    <div className="w-full h-auto">
      <h1 className="p1 text-white mb-4 md:mb-6">
        {debouncedSearch
          ? `Found ${searchResults.length} results for '${debouncedSearch}'`
          : 'Start typing to search'}
      </h1>

      {movies.length > 0 && (
        <>
          <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">Movies</h1>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
            {movies.map((movie) => (
              <MediaPreview
                key={movie.id}
                mediaId={movie.id}
                mediaType={MediaTypes.movie}
              />
            ))}
          </div>
        </>
      )}

      {shows.length > 0 && (
        <>
          <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">
            TV Series
          </h1>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
            {shows.map((show) => (
              <MediaPreview
                key={show.id}
                mediaId={show.id}
                mediaType={MediaTypes.tv}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults;
