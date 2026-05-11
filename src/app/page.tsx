import HomeLayout from '@/layouts/HomeLayout';
import { TMDB } from '@lorenzopant/tmdb';
import './globals.css';
import MediaPreview from '@/components/MediaPreview';
import { getTrendingMedia } from '@/lib/tmdb/getTrendingMedia';

export default async function Home() {
  const trending = await getTrendingMedia();

  return (
    <HomeLayout>
      <div className="w-full h-full flex-1 overflow-x-hidden">
        <h1 className="p1 text-white mb-4 md:mb-6">Trending</h1>
        <div className="flex flex-row space-x-4 md:space-x-10 max-w-full overflow-x-scroll pr-4 md:pr-6.25 lg:pr-9">
          {trending.map((media) => (
            <MediaPreview key={media.id} media={media} isTrending />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
