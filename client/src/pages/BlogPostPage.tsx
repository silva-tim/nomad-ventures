import {
  PiBookmarksSimple,
  PiDotsThreeCircleFill,
  PiHeartLight,
} from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';
import { Entry } from '../lib/types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BlogPostPage() {
  const { id: entryId } = useParams();
  const [error, setError] = useState<unknown>();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    async function getEntry() {
      try {
        const res = await fetch(`/api/entries/${entryId}`);
        if (!res.ok) {
          throw new Error(`fetch Error ${res.status}`);
        }
        const entryJSON = await res.json();
        setEntry(entryJSON);
      } catch (err) {
        setError(err);
      }
    }
    getEntry();
  }, [entryId]);

  if (error) {
    return (
      <div>
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </div>
    );
  }

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen font-lato">
      <div
        className="w-full bg-center bg-cover h-1/2 flex flex-wrap content-end"
        style={{
          backgroundImage: `url(${entry.photoURL})`,
        }}>
        <div className="max-w-screen-lg w-full m-auto text-left text-white text-shadow font-bold">
          <div className="basis-full">
            <h1 className="text-5xl pb-4">{entry.title}</h1>
          </div>
          <div className="basis-full">
            <h2 className="text-4xl pb-3">{entry.subtitle}</h2>
          </div>
          <div className="flex justify-between basis-full pb-4">
            <span className="text-xl">{`by ${entry.photoAuthor}`}</span>
            <div className="flex">
              <FaLocationDot className="text-2xl mr-1" />
              <span className="text-xl">{entry.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg w-full m-auto pt-1">
        <div className="text-center text-sm">
          <span>
            Photo by{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href={`${entry.photoAuthorLink}?utm_source=nomad-ventures&utm_medium=referral`}>
              {entry.photoAuthor}
            </a>{' '}
            on{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://unsplash.com/?utm_source=nomad-ventures&utm_medium=referral">
              Unsplash
            </a>
          </span>
        </div>
        <div className="pt-2">
          <div className="border-y border-primary py-2 text-3xl flex justify-between">
            <PiHeartLight className="cursor-pointer" />
            <div className="flex">
              <PiBookmarksSimple className="cursor-pointer" />
              <PiDotsThreeCircleFill className="cursor-pointer" />
            </div>
          </div>
          <div className="pt-2 text-lg">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:font-serif">
              {entry.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
