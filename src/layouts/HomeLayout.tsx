import NavBar from '@/components/NavBar';
import SearchBar from '@/components/SearchBar';
import React from 'react';

type HomeLayoutProps = {
  children: React.ReactNode;
};

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="w-full min-h-dvh flex flex-col lg:flex-row bg-blue-950">
      <nav className="p-0 md:p-6 lg:p-8">
        <NavBar />
      </nav>
      <main className="flex flex-col w-full min-h-full flex-1 py-6 md:pt-8 lg:pt-10 pl-4 md:pl-6.25 lg:pl-9">
        <div className="w-full pr-4 md:pr-6.25 lg:pr-9 mb-6 md:mb-8 lg:mb-10">
          <SearchBar />
        </div>
        {children}
      </main>
    </div>
  );
}

export default HomeLayout;
