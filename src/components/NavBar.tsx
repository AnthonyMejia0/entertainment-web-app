import Logo from '@/assets/logo.svg';
import Home from '@/assets/icon-nav-home.svg';
import Movies from '@/assets/icon-nav-movies.svg';
import TV from '@/assets/icon-nav-tv-series.svg';
import Bookmarks from '@/assets/icon-nav-bookmark.svg';
import Link from 'next/link';

function NavBar() {
  return (
    <div className=" flex flex-row justify-between items-center lg:flex-col w-full lg:w-24 h-14 md:h-18 lg:h-full md:rounded-[10px] lg:rounded-[20px] bg-blue-900 p-4 md:p-5 lg:p-7">
      <Logo />
      <div className="flex flex-row items-center lg:flex-col space-x-6 space-y-0 md:space-x-8 lg:space-x-0 lg:space-y-10">
        <Link href="/">
          <Home />
        </Link>
        <Link href="/movies">
          <Movies />
        </Link>
        <Link href="/tv">
          <TV />
        </Link>
        <Link href="/bookmarks">
          <Bookmarks />
        </Link>
      </div>
      <div className="w-6 md:w-8 lg:w-10 h-auto aspect-square rounded-full border border-white">
        <img src="/assets/image-avatar.png" alt="User Avatar" />
      </div>
    </div>
  );
}

export default NavBar;
