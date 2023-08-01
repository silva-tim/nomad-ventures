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

// export const placeholderPhoto: Photo = {
//   id: "1",
//   urls: {regular: '../../public/neom-llB7NfKnS8A-unsplash.jpg'},
//   user: {
//     name: '',
//     links: {
//       self: ''
//     }
//   },
//   alt_description: 'placeholder image'
// }
