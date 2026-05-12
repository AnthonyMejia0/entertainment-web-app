'use client';

import Logo from '@/assets/logo.svg';
import Home from '@/assets/icon-nav-home.svg';
import Movies from '@/assets/icon-nav-movies.svg';
import TV from '@/assets/icon-nav-tv-series.svg';
import Bookmarks from '@/assets/icon-nav-bookmark.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '@/types/routes';

function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between lg:justify-start lg:space-y-18 items-center lg:flex-col w-full lg:w-24 h-14 md:h-18 lg:h-full lg:max-h-240 md:rounded-[10px] lg:rounded-[20px] bg-blue-900 p-4 md:p-5 lg:p-7">
      <Link href={routes.HOME}>
        <Logo />
      </Link>
      <div className="flex flex-row items-center lg:flex-col space-x-6 space-y-0 md:space-x-8 lg:space-x-0 lg:space-y-10">
        <Link href={routes.HOME}>
          <Home
            className={`text-blue-500 hover:text-red-500 ${pathname === routes.HOME && 'text-white'}`}
          />
        </Link>
        <Link href={routes.MOVIES}>
          <Movies
            className={`text-blue-500 hover:text-red-500 ${pathname === routes.MOVIES && 'text-white'}`}
          />
        </Link>
        <Link href={routes.TV}>
          <TV
            className={`text-blue-500 hover:text-red-500 ${pathname === routes.TV && 'text-white'}`}
          />
        </Link>
        <Link href={routes.BOOKMARKS}>
          <Bookmarks
            className={`text-blue-500 hover:text-red-500 ${pathname === routes.BOOKMARKS && 'text-white'}`}
          />
        </Link>
      </div>
      <div className="w-6 md:w-8 lg:w-10 h-auto aspect-square rounded-full border border-white lg:mt-auto">
        <img src="/assets/image-avatar.png" alt="User Avatar" />
      </div>
    </div>
  );
}

export default NavBar;
