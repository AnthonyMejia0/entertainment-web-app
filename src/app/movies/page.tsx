import MediaPreview from '@/components/MediaPreview';
import HomeLayout from '@/layouts/HomeLayout';
import { getMovies } from '@/lib/tmdb/getMovies';

export default async function Movies() {
  const movies = await getMovies();

  return (
    <HomeLayout>
      <div className={`w-full h-full overflow-x-hidden`}>
        <h1 className="p1 text-white mb-4 md:mb-6 mt-6 md:mt-10">Movies</h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-10 pr-4 md:pr-6.25 lg:pr-9">
          {movies.map((movie) => (
            <MediaPreview key={movie.id} media={movie} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
