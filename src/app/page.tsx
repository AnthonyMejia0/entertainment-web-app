import HomeLayout from '@/layouts/HomeLayout';
import MediaPreview from '@/components/MediaPreview';
import { getTrendingMedia } from '@/lib/tmdb/getTrendingMedia';
import { getRecommendedMedia } from '@/lib/tmdb/getRecommendedMedia';
import './globals.css';

export default async function Home() {
  const trending = await getTrendingMedia();
  const recommended = await getRecommendedMedia();

  return (
    <HomeLayout>
      <div className={`w-full h-full`}>
        <h1 className="p1 text-white mb-4 md:mb-6">Trending</h1>
        <div className="flex flex-row space-x-4 md:space-x-10 max-w-full overflow-x-scroll pr-4 md:pr-6.25 lg:pr-9">
          {trending.map((media) => (
            <MediaPreview key={media.id} media={media} isTrending />
          ))}
        </div>
        <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">
          Recommended for you
        </h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
          {recommended.map((media) => (
            <MediaPreview key={media.id} media={media} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
