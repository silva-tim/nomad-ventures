import { AiOutlineLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { Entry, Photo } from '../lib/types';
import { FormEvent, useState } from 'react';
import UnsplashGallery from './UnsplashGallery';
import { createEntry, searchUnsplash } from '../lib/fetchFunctions';
import { PiSpinnerGap } from 'react-icons/pi';

type props = {
  entry: Entry | undefined;
};

export default function BlogPostForm({ entry }: props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(entry?.title ?? '');
  const [subtitle, setSubtitle] = useState(entry?.subtitle ?? '');
  const [location, setLocation] = useState(entry?.location ?? '');
  const [photoInfo, setPhotoInfo] = useState(
    entry
      ? {
          urls: { regular: entry.photoURL },
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
  const [body, setBody] = useState(entry?.body);
  const [error, setError] = useState<unknown>();
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState<Photo[]>();
  const [missingPhoto, setMissingPhoto] = useState(entry ? false : undefined);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

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
        urls: { regular },
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
        photoURL: regular,
        photoAuthor: name,
        photoAuthorLink: html,
        photoAlt: alt_description,
        entryId: undefined,
      };
      const entryReturn = await createEntry(entryInput);
      navigate(`/post/${entryReturn[0].entryId}`);
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
      setMissingPhoto(false);
    } catch (err) {
      setError(err);
    }
  }

  function handlePhotoClick(photo: Photo) {
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
    <form onSubmit={handleSubmit}>
      <div className="flex pt-4 justify-between">
        <Link to="/">
          <div className="flex">
            <AiOutlineLeft className="text-xl m-0.5" />
            <span className="hover:underline">cancel</span>
          </div>
        </Link>
        <div>
          <button type="submit" className="bg-green-400 px-7 rounded-3xl">
            {entry ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>
      {photoInfo && (
        <div className="h-max-content flex justify-center mt-4">
          {missingPhoto && <span>Please add a photo.</span>}
          <img
            className="object-cover h-96"
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
      <div className="flex mt-4">
        <div className="basis-1/2 bg-secondary me-1 flex justify-between">
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            className="p-3 outline-0 bg-secondary text-xl basis-full"
            required
          />
          <FaLocationDot className="text-3xl mr-1 mt-3" />
        </div>
        <div className="basis-1/2 bg-secondary flex justify-between">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search Unsplash for Image"
            className="p-3 outline-0 bg-secondary text-xl basis-full"
          />
          <button
            onClick={handleSearch}
            type="button"
            className={`bg-primary bg-opacity-90 text-white px-3 w-24 ${
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
