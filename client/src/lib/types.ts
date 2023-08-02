export type Entry = {
  title: string;
  subtitle: string;
  location: string;
  body: string;
  photoURL: string;
  photoAlt: string;
  photoAuthor: string;
  photoAuthorLink: string;
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
