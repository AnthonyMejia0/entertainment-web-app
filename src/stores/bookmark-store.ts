import { Bookmark } from '@/types/bookmark';
import { MediaType } from '@lorenzopant/tmdb';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type BookmarkStoreState = {
  bookmarks: Bookmark[];
};

type BookmarkStoreActions = {
  toggleBookmark: (id: number, type: 'movie' | 'tv' | 'person') => void;
  clearBookmarks: () => void;
};

type BookmarkStore = BookmarkStoreState & BookmarkStoreActions;

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarks: [],

      toggleBookmark: (id, type) => {
        set((state) => {
          const exists = state.bookmarks.some(
            (b) => b.mediaId === id && b.mediaType === type,
          );

          return {
            bookmarks: exists
              ? state.bookmarks.filter(
                  (b) => !(b.mediaId === id && b.mediaType === type),
                )
              : [
                  ...state.bookmarks,
                  { mediaId: id, mediaType: type } as Bookmark,
                ],
          };
        });
      },

      clearBookmarks: () => {
        set({ bookmarks: [] });
      },
    }),
    {
      name: 'bookmark-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
