'use client';

import { useSearchStore } from '@/stores/search-store';
import SearchIcon from '@/assets/icon-search.svg';

function SearchBar() {
  const searchInput = useSearchStore((s) => s.input);
  const setSearchInput = useSearchStore((s) => s.setInput);

  return (
    <div className="relative w-full md:max-w-1/2 h-6 md:h-8 flex flex-row space-x-4 md:space-x-6 lg:space-x-8 items-center">
      <SearchIcon className="absolute left-0 top-1/2 translate-y-[-50%]" />
      <input
        type="text"
        name="search"
        id="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for movies or TV series"
        className="p2-light text-white w-full pl-12"
      />
    </div>
  );
}

export default SearchBar;
