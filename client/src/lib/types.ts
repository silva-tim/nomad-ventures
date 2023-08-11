export type Entry = {
  title: string;
  subtitle: string;
  location: string;
  body: string;
  photoURL: string;
  photoURLBig: string;
  photoAlt: string;
  photoAuthor: string;
  photoAuthorLink: string;
  entryId: number | undefined;
  userId: number | undefined;
  username: string | undefined;
  date: string;
};

export type Photo = {
  id: string;
  urls: {
    full: string;
    regular: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  alt_description: string;
};

export type User = {
  username: string | undefined;
  userId: number | undefined;
};

export type Auth = {
  user: User;
  token: string;
};
