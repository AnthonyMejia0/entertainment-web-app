export type Media = {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  overview: string;
  poster: string | null;
  backdrop: string | null;
  rating: number;
  releaseDate: string;
  certification: string;
};

export enum MediaTypes {
  movie = 'movie',
  tv = 'tv',
  person = 'person',
}
