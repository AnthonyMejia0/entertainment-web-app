import { Media, MediaTypes } from '@/types/media';
import Image from 'next/image';
import MovieIcon from '@/assets/icon-nav-movies-resize.svg';
import TvIcon from '@/assets/icon-nav-tv-series-resize.svg';

type MediaPreviewProps = {
  media: Media;
  isTrending?: boolean;
};

const BASE_URL = 'https://image.tmdb.org/t/p/original';

const regularDimensions = 'w-41 h-39.5 md:w-55 md:h-48.75 lg:w-70 lg:h-57.25';
const trendingDimensions = 'w-60 h-35 md:w-117.5 md:h-57.5';

function MediaPreview({ media, isTrending = false }: MediaPreviewProps) {
  const formatMediaType = (mediaType: string) => {
    return mediaType === MediaTypes.movie ? 'Movie' : 'TV';
  };

  return (
    <div>
      <div
        className={`relative rounded-lg flex flex-col justify-end overflow-hidden ${isTrending ? trendingDimensions : regularDimensions}`}
      >
        <Image
          src={`${BASE_URL}${media.backdrop}`}
          alt={media.title}
          fill
          sizes="470px"
          className="object-cover w-full h-full opacity-70"
        />
        {isTrending && (
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
              {media.certification !== '' && ` • ${media.certification}`}
            </p>
            <p className="p2-med text-white mt-2 w-full truncate">
              {media.title}
            </p>
          </div>
        )}
      </div>
      {!isTrending && (
        <div className="z-10 w-full flex flex-col mt-2">
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
            {media.certification !== '' && ` • ${media.certification}`}
          </p>
          <p className="p3 text-white mt-2 w-full truncate">{media.title}</p>
        </div>
      )}
    </div>
  );
}

export default MediaPreview;
