import { AiOutlineLeft } from 'react-icons/ai';
import { FaLocationDot } from 'react-icons/fa6';
import { PiSpinnerGap } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { Entry, Photo } from '../lib/types';
import UnsplashGallery from './UnsplashGallery';
import { useUser } from './UserContext';
import {
  createEntry,
  searchUnsplash,
  updateEntry,
} from '../lib/fetchFunctions';

type props = {
  entry: Entry | undefined;
};

export default function BlogPostForm({ entry }: props) {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const [title, setTitle] = useState(entry?.title || '');
  const [subtitle, setSubtitle] = useState(entry?.subtitle || '');
  const [location, setLocation] = useState(entry?.location || '');
  const [body, setBody] = useState(entry?.body || '');
  const [entryId] = useState(entry?.entryId);
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState<Photo[]>();
  const [missingPhoto, setMissingPhoto] = useState(entry ? false : undefined);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [error, setError] = useState<unknown>();
  const [photoInfo, setPhotoInfo] = useState<Photo | undefined>(
    entry
      ? {
          id: 'original',
          urls: {
            full: entry.photoURLBig,
            regular: entry.photoURL,
          },
          user: {
            name: entry.photoAuthor,
            links: {
              html: entry.photoAuthorLink,
            },
          },
          alt_description: entry.photoAlt,
        }
      : undefined
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!photoInfo) {
      setMissingPhoto(true);
      return;
    }
    try {
      if (!title || !subtitle || !location || !body) {
        throw new Error('Error: 400 invalid request');
      }
      const {
        urls: { full, regular },
        user: {
          name,
          links: { html },
        },
        alt_description,
      } = photoInfo;
      const entryInput: Entry = {
        title,
        subtitle,
        location,
        body,
        entryId,
        photoURL: regular,
        photoURLBig: full,
        photoAuthor: name,
        photoAuthorLink: html,
        photoAlt: alt_description,
        userId: entry?.userId,
        username: undefined,
        date: '',
      };
      if (!entryId) {
        entryInput.userId = user?.userId;
        const entryReturn = await createEntry(entryInput, token);
        navigate(`/post/${entryReturn[0].entryId}`);
      } else {
        await updateEntry(entryInput, token);
        navigate(`/post/${entryId}`);
      }
    } catch (err) {
      setError(err);
    }
  }

  async function handleSearch() {
    setLoadingAnimation(true);
    try {
      if (!search) {
        throw new Error('400', { cause: 'invalid request' });
      }
      const resultJSON = await searchUnsplash(search);
      setPhotoInfo(undefined);
      setPhotos(resultJSON.results);
      setSearch('');
      setLoadingAnimation(false);
    } catch (err) {
      setError(err);
    }
  }

  function handlePhotoClick(photo: Photo) {
    console.log(photo.urls.full);
    setPhotoInfo(photo);
    setMissingPhoto(false);
    setPhotos(undefined);
  }

  if (error) {
    return (
      <div>
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="flex pt-4 justify-between">
        <Link to="/">
          <div className="flex">
            <AiOutlineLeft className="text-xl m-0.5" />
            <span className="hover:underline">cancel</span>
          </div>
        </Link>
        {missingPhoto && <span>Please add a photo.</span>}
        <div>
          <button
            type="submit"
            className="bg-custGreen text-primary px-7 rounded-3xl">
            {entry ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>
      {photoInfo && (
        <div className="h-max-content flex justify-center mt-4">
          <img
            className="object-cover h-40 md:h-96"
            src={photoInfo?.urls.regular}
            alt={photoInfo?.alt_description}
          />
        </div>
      )}
      {photos && (
        <UnsplashGallery
          photos={photos}
          onPhotoClick={(photo) => handlePhotoClick(photo)}
        />
      )}
      <div className="flex mt-4 flex-wrap justify-between">
        <div className="basis-full md:basis-1/2 bg-secondary flex justify-between">
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            className="p-3 outline-0 bg-secondary md:text-xl basis-full"
            required
          />
          <FaLocationDot className="text-3xl mr-1 mt-3" />
        </div>
        <div className="basis-full md:basis-1/2 bg-secondary flex justify-between">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search Unsplash for Image"
            className="p-3 outline-0 bg-secondary md:text-xl basis-full"
          />
          <button
            onClick={handleSearch}
            type="button"
            className={`bg-primary bg-opacity-90 text-white px-3 md:w-24 ${
              search && `hover:bg-tertiary `
            }`}
            disabled={search ? false : true}>
            {loadingAnimation && <PiSpinnerGap className="animate-spin ml-5" />}
            {!loadingAnimation && 'Search'}
          </button>
        </div>
      </div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        className="w-full p-3 mt-2 outline-0 text-4xl"
        required
      />
      <input
        onChange={(e) => setSubtitle(e.target.value)}
        value={subtitle}
        type="text"
        name="subtitle"
        id="subtitle"
        placeholder="Subtitle"
        className="w-full p-3 mt-2 outline-0 text-2xl"
        required
      />
      <textarea
        onChange={(e) => setBody(e.target.value)}
        value={body}
        name="body"
        id="body"
        placeholder="Tell your adventure..."
        className="w-full p-3 mt-2 outline-0 text-lg h-96 resize-none"
        required
      />
    </form>
  );
}
