export type Entry = {
  title: string;
  subtitle: string;
  location: string;
  body: string;
  url: string;
  photographer: string;
  photographerURL: string;
  alt: string;
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
