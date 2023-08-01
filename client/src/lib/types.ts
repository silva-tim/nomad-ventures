export type Entry = {
  title: string;
  subtitle: string;
  location: string;
  photoInfo: Photo;
  body: string;
  url: string;
  author: string;
  authorURL: string;
  alt: string;
};

export type Photo = {
  id: string;
  urls: { regular: string };
  user: {
    name: string;
    links: {
      self: string;
    };
  };
  alt_description: string;
};
