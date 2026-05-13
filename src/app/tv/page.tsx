import MediaPreview from '@/components/MediaPreview';
import HomeLayout from '@/layouts/HomeLayout';
import { getTvShows } from '@/lib/tmdb/getTvShows';
import { MediaTypes } from '@/types/media';

export default async function TV() {
  const shows = await getTvShows(3);

  return (
    <HomeLayout>
      <div className={`w-full h-full overflow-x-hidden`}>
        <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">TV Series</h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
          {shows.map((show) => (
            <MediaPreview
              key={show.id}
              mediaId={show.id}
              mediaType={MediaTypes.tv}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
