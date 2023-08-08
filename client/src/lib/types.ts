export type Entry = {
  title: string;
  subtitle: string;
  location: string;
  body: string;
  photoURL: string;
  photoAlt: string;
  photoAuthor: string;
  photoAuthorLink: string;
  entryId: number | undefined;
  userId: number | undefined;
  username: string | undefined;
};

export type Photo = {
  id: string;
  urls: { regular: string };
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
  token: string | undefined;
  userId: number | undefined;
};
