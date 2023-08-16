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
import Loading from './Loading';

type props = {
  entry: Entry | undefined;
};

export default function BlogPostForm({ entry }: props) {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState<Photo[]>();
  const [missingPhoto, setMissingPhoto] = useState(false);
  const [searchingAnimation, setSearchingAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [fullEntry, setFullEntry] = useState(
    entry ||
      ({
        title: '',
        subtitle: '',
        location: '',
        body: '',
        photoURL: '',
        photoURLBig: '',
        photoAlt: '',
        photoAuthor: '',
        photoAuthorLink: '',
        entryId: undefined,
        userId: user?.userId,
        username: user?.username,
        date: '',
      } as Entry)
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      if (!fullEntry.photoURL) {
        setMissingPhoto(true);
        return;
      }
      if (!fullEntry) {
        throw new Error('All fields must be filled.');
      }
      if (!fullEntry.entryId) {
        const entryReturn = await createEntry(fullEntry, token);
        navigate(`/post/${entryReturn.entryId}`);
      } else {
        await updateEntry(fullEntry, token);
        navigate(`/post/${fullEntry.entryId}`);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    setSearchingAnimation(true);
    try {
      const resultJSON = await searchUnsplash(search);
      setPhotos(resultJSON.results);
      setSearch('');
    } catch (err) {
      setError(err);
    } finally {
      setSearchingAnimation(false);
    }
  }

  function handlePhotoClick(photo: Photo) {
    setFullEntry({
      ...fullEntry,
      photoURL: photo.urls.regular,
      photoURLBig: photo.urls.full,
      photoAuthor: photo.user.name,
      photoAuthorLink: photo.user.links.html,
      photoAlt: photo.alt_description,
    });
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
      {loading && <Loading />}
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
      {fullEntry.photoURL && (
        <div className="h-max-content flex justify-center mt-4">
          <img
            className="object-cover h-40 md:h-96"
            src={fullEntry.photoURL}
            alt={fullEntry.photoAlt}
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
            onChange={(e) =>
              setFullEntry({ ...fullEntry, location: e.target.value })
            }
            value={fullEntry.location}
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            className="p-3 outline-0 bg-secondary md:text-xl basis-full"
            maxLength={25}
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
            {searchingAnimation && (
              <PiSpinnerGap className="animate-spin ml-5" />
            )}
            {!searchingAnimation && 'Search'}
          </button>
        </div>
      </div>
      <input
        onChange={(e) => setFullEntry({ ...fullEntry, title: e.target.value })}
        value={fullEntry.title}
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        className="w-full p-3 mt-2 outline-0 text-4xl"
        maxLength={25}
        required
      />
      <input
        onChange={(e) =>
          setFullEntry({ ...fullEntry, subtitle: e.target.value })
        }
        value={fullEntry.subtitle}
        type="text"
        name="subtitle"
        id="subtitle"
        placeholder="Subtitle"
        className="w-full p-3 mt-2 outline-0 text-2xl"
        maxLength={25}
        required
      />
      <textarea
        onChange={(e) => setFullEntry({ ...fullEntry, body: e.target.value })}
        value={fullEntry.body}
        name="body"
        id="body"
        placeholder="Tell your adventure..."
        className="w-full p-3 mt-2 outline-0 text-lg h-96 resize-none"
        required
      />
    </form>
  );
}
