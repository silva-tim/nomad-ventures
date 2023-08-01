import { Photo } from '../lib/types';

type props = {
  onPhotoClick: (photo: Photo) => void;
  photos: Array<Photo>;
};

export default function UnsplashGallery({ photos, onPhotoClick }: props) {
  return (
    <div className="h-full">
      <div className="flex flex-wrap">
        {photos.map((index) => (
          <div className="basis-1/4 p-1" key={index.id}>
            <img
              onClick={() => onPhotoClick(index)}
              className="object-cover h-full hover:border-green-400 border-2 border-white cursor-pointer hover:brightness-75"
              src={`${index.urls.regular}`}
              alt={`${index.alt_description}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
