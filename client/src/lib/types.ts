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
  userId: number | undefined;
};

export type Auth = {
  user: User;
  token: string;
};

export type UserContextValues = {
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (auth: Auth) => void;
};
