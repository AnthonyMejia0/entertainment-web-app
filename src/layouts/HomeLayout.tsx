'use client';

import NavBar from '@/components/NavBar';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { useSearchStore } from '@/stores/search-store';
import React from 'react';

type HomeLayoutProps = {
  children: React.ReactNode;
};

function HomeLayout({ children }: HomeLayoutProps) {
  const search = useSearchStore((s) => s.input);

  return (
    <div className="h-dvh w-full flex flex-col lg:flex-row overflow-hidden bg-blue-950">
      <nav className="p-0 md:p-6 lg:p-8 lg:w-max lg:h-dvh shrink-0">
        <NavBar />
      </nav>

      <main className="flex flex-col flex-1 min-w-0 min-h-0 pl-4 md:pl-6.25 lg:pl-9">
        <div className="shrink-0 w-full pr-4 md:pr-6.25 lg:pr-9 py-6 md:pt-8 lg:pt-10">
          <SearchBar />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pb-10">
          {search ? <SearchResults /> : children}
        </div>
      </main>
    </div>
  );
}

export default HomeLayout;
