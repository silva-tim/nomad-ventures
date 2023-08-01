import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { Entry, Photo } from '../lib/types';
import { FormEvent, useState } from 'react';
import UnsplashGallery from './UnsplashGallery';

type props = {
  entry: Entry | undefined;
};

export default function BlogPostForm({ entry }: props) {
  const [title, setTitle] = useState(entry?.title ?? '');
  const [subtitle, setSubtitle] = useState(entry?.subtitle ?? '');
  const [location, setLocation] = useState(entry?.location ?? '');
  const [photoInfo, setPhotoInfo] = useState(entry?.photoInfo ?? undefined);
  const [body, setBody] = useState(entry?.body);
  const [error, setError] = useState<unknown>();
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState<Array<Photo>>();
  const [missingPhoto, setMissingPhoto] = useState(entry ? false : undefined);

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
          links: { self },
        },
        alt_description,
      } = photoInfo;
      const entryInput: Entry = {
        title,
        subtitle,
        location,
        photoInfo,
        body,
        url: regular,
        author: name,
        authorURL: self,
        alt: alt_description,
      };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryInput),
      };
      const res = await fetch('/api/entries', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
    } catch (err) {
      setError(err);
    }
  }

  async function handleSearch() {
    try {
      if (!search) {
        throw new Error('400', { cause: 'invalid request' });
      }
      const res = await fetch('/api/key');
      const key = await res.json();
      const result = await fetch(
        `https://api.unsplash.com/search/photos?query=${search}&orientation=landscape&per_page=12&client_id=${key}`
      );
      const resultJSON = await result.json();
      setPhotoInfo(undefined);
      setPhotos(resultJSON.results);
      setSearch('');
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
        <div className="basis-1/2 bg-secondary me-1 flex justify-between">
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
            className="bg-primary bg-opacity-90 text-white px-3"
            disabled={search ? false : true}>
            Search
          </button>
        </div>
      </div>
      <div className="h-max-content flex justify-center">
        {missingPhoto && <span>Please add a photo.</span>}
        {photoInfo && (
          <img
            className="object-cover h-full"
            src={photoInfo?.urls.regular}
            alt={photoInfo?.alt_description}
          />
        )}
      </div>
      {photos && (
        <UnsplashGallery
          photos={photos}
          onPhotoClick={(photo) => handlePhotoClick(photo)}
        />
      )}
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
