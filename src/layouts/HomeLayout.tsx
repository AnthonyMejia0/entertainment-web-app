import NavBar from '@/components/NavBar';
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
      <main>{children}</main>
    </div>
  );
}

export default HomeLayout;
