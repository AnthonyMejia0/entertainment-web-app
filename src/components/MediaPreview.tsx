'use client';

import { Media, MediaTypes } from '@/types/media';
import Image from 'next/image';
import MovieIcon from '@/assets/icon-nav-movies-resize.svg';
import TvIcon from '@/assets/icon-nav-tv-series-resize.svg';
import BookmarkIconEmpty from '@/assets/icon-bookmark-empty.svg';
import BookmarkIconFull from '@/assets/icon-bookmark-full.svg';
import { useBookmarkStore } from '@/stores/bookmark-store';
import { Bookmark } from '@/types/bookmark';
import { MediaType } from '@lorenzopant/tmdb';
import { useState } from 'react';
import { useInView, useOnInView } from 'react-intersection-observer';
import { getMovieDetails, getShowDetails } from '@/lib/tmdb/getMediaDetails';

type MediaPreviewProps = {
  mediaId: number;
  mediaType: 'movie' | 'tv' | 'person';
  isTrending?: boolean;
};

const BASE_URL = 'https://image.tmdb.org/t/p/original';

const regularDimensions = 'w-full aspect-video';
const trendingDimensions = 'w-60 h-35 md:w-117.5 md:h-57.5';

function MediaPreview({
  mediaId,
  mediaType,
  isTrending = false,
}: MediaPreviewProps) {
  const bookmarks = useBookmarkStore((s) => s.bookmarks);
  const toggleBookmark = useBookmarkStore((s) => s.toggleBookmark);
  const isBookmarked = bookmarks.some(
    (b) => b.mediaId === mediaId && b.mediaType === mediaType,
  );
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(false);

  const inViewRef = useOnInView(
    async (inView) => {
      if (inView && !media) {
        setLoading(true);
        if (mediaType === MediaTypes.movie) {
          const movieDetails = await getMovieDetails(mediaId);
          setMedia(movieDetails);
        } else if (mediaType === MediaTypes.tv) {
          const showDetails = await getShowDetails(mediaId);
          setMedia(showDetails);
        }
        setLoading(false);
      }
    },
    {
      rootMargin: '0px 0px 140px 0px',
      threshold: 0.25,
    },
  );

  const formatMediaType = (mediaType: string) => {
    return mediaType === MediaTypes.movie ? 'Movie' : 'TV';
  };

  return (
    <div>
      <div
        ref={inViewRef}
        className={`relative rounded-lg flex flex-col justify-end overflow-hidden bg-blue-900 ${isTrending ? trendingDimensions : regularDimensions} ${loading && 'animate-pulse'}`}
      >
        <button
          onClick={() => toggleBookmark(mediaId, mediaType)}
          className="absolute z-10 top-2 right-2 w-max p-3 hover:opacity-75 rounded-full flex justify-center items-center bg-blue-950"
        >
          {isBookmarked ? <BookmarkIconFull /> : <BookmarkIconEmpty />}
        </button>
        {(media?.backdrop || media?.poster) && (
          <Image
            src={`${BASE_URL}${media.backdrop ?? media.poster}`}
            alt={media.title}
            fill
            sizes="470px"
            className="object-cover w-full h-full opacity-70 text-white"
            loading="eager"
          />
        )}
        {isTrending && media && (
          <div
            className="z-10 w-full flex flex-col px-4 py-3.5 md:px-6 md:py-5.25"
            style={{
              background: 'rgba(0,0,0,0.25)',
            }}
          >
            <p className="text-white p4 opacity-75 flex flex-row items-center">
              {media.releaseDate.substring(0, 4)} •{' '}
              <span className="text-inherit flex flex-row mx-1 items-center">
                {media.mediaType === MediaTypes.movie ? (
                  <MovieIcon className="w-3 h-3 mr-1" />
                ) : (
                  <TvIcon className="w-3 h-3 mr-1" />
                )}{' '}
                {formatMediaType(media.mediaType)}
              </span>
              {media.certification !== undefined && ` • ${media.certification}`}
            </p>
            <p className="p2-med text-white mt-2 w-full truncate">
              {media.title}
            </p>
          </div>
        )}
      </div>
      {!isTrending && media && (
        <div className="z-10 w-full flex flex-col mt-3">
          <p className="text-white p5 opacity-75 flex flex-row items-center">
            {media.releaseDate.substring(0, 4)} •{' '}
            <span className="text-inherit flex flex-row mx-1 items-center">
              {media.mediaType === MediaTypes.movie ? (
                <MovieIcon className="w-3 h-3 mr-1" />
              ) : (
                <TvIcon className="w-3 h-3 mr-1" />
              )}{' '}
              {formatMediaType(media.mediaType)}
            </span>
            {media.certification !== undefined && ` • ${media.certification}`}
          </p>
          <p className="p3 text-white mt-2 w-full truncate">{media.title}</p>
        </div>
      )}
    </div>
  );
}

export default MediaPreview;
