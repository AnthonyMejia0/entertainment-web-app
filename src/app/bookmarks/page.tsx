'use client';

import MediaPreview from '@/components/MediaPreview';
import HomeLayout from '@/layouts/HomeLayout';
import {
  getBookmarkedMovies,
  getBookmarkedShows,
} from '@/lib/tmdb/getBookmarkedMedia';
import { useBookmarkStore } from '@/stores/bookmark-store';
import { Media } from '@/types/media';
import { useCallback, useEffect, useState } from 'react';

export default function Bookmarks() {
  const bookmarks = useBookmarkStore((s) => s.bookmarks);
  const [movies, setMovies] = useState<Media[]>([]);
  const [shows, setShows] = useState<Media[]>([]);

  const fetchBookmarks = useCallback(async () => {
    const fetchedMovies = await getBookmarkedMovies(bookmarks);
    const fetchedShows = await getBookmarkedShows(bookmarks);

    setMovies([...fetchedMovies]);
    setShows([...fetchedShows]);
  }, [bookmarks]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <HomeLayout>
      <div className={`w-full h-full overflow-x-hidden`}>
        {movies.length > 0 && (
          <>
            <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">
              Bookmarked Movies
            </h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
              {movies.map((movie) => (
                <MediaPreview
                  key={movie.id}
                  mediaId={movie.id}
                  mediaType={movie.mediaType}
                />
              ))}
            </div>
          </>
        )}
        {shows.length > 0 && (
          <>
            <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">
              Bookmarked TV Series
            </h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
              {shows.map((show) => (
                <MediaPreview
                  key={show.id}
                  mediaId={show.id}
                  mediaType={show.mediaType}
                />
              ))}
            </div>
          </>
        )}
        {movies.length === 0 && shows.length === 0 && (
          <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">
            No bookmarks yet
          </h1>
        )}
      </div>
    </HomeLayout>
  );
}
