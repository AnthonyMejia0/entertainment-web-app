import { create } from 'zustand';

type SearchStoreState = {
  input: string;
};

type SearchStoreActions = {
  setInput: (search: string) => void;
};

type SearchStore = SearchStoreState & SearchStoreActions;

export const useSearchStore = create<SearchStore>()((set) => ({
  input: '',
  setInput: (search) => {
    set((state) => ({
      input: search,
    }));
  },
}));
