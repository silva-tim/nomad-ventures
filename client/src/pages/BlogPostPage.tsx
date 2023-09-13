import { PiDotsThreeCircleFill, PiDotsThreeCircleLight } from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';
import { Entry } from '../lib/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MoreOptions from '../components/MoreOptions';
import DeleteModal from '../components/DeleteModal';
import { deleteEntry } from '../lib/fetchFunctions';
import { useUser } from '../components/UserContext';
import Loading from '../components/Loading';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const { entryId } = useParams();
  const [error, setError] = useState<unknown>();
  const [entry, setEntry] = useState<Entry>();
  const [moreOptions, setMoreOptions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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

  async function handleDelete() {
    try {
      if (!entry) {
        return;
      }
      await deleteEntry(entry, token);
      navigate('/');
    } catch (err) {
      setError(err);
    }
  }

  if (error) {
    return (
      <div>
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </div>
    );
  }

  if (!entry) {
    return <Loading />;
  }

  return (
    <div className="h-screen font-lato">
      {deleteModal && (
        <DeleteModal
          onCancel={() => setDeleteModal(false)}
          onDelete={() => handleDelete()}
        />
      )}
      <div
        className="w-full bg-center bg-cover h-1/2 md:h-2/3 flex flex-wrap content-end"
        style={{
          backgroundImage: `url(${entry.photoURLBig})`,
        }}>
        <div className="max-w-screen-lg w-11/12 m-auto text-left text-white text-shadow font-bold">
          <div className="basis-full">
            <h1 className="text-2xl md:text-5xl pb-4">{entry.title}</h1>
          </div>
          <div className="basis-full">
            <h2 className="text-xl md:text-4xl pb-3">{entry.subtitle}</h2>
          </div>
          <div className="flex justify-between basis-full pb-4">
            <span className="text-sm md:text-xl">
              by{' '}
              <Link
                to={`/profiles/${entry.username}`}
                className="underline cursor-pointer">
                {entry.username}
              </Link>
            </span>
            <div className="flex">
              <FaLocationDot className="text-md md:text-2xl mr-1" />
              <span className="text-sm md:text-xl">{entry.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg w-11/12 m-auto pt-1">
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
          <div className="border-y border-primary py-2 text-3xl flex justify-end">
            {user?.userId === entry.userId && (
              <>
                {moreOptions ? (
                  <PiDotsThreeCircleFill
                    onClick={() => setMoreOptions(!moreOptions)}
                    className="cursor-pointer"
                  />
                ) : (
                  <PiDotsThreeCircleLight
                    onClick={() => setMoreOptions(!moreOptions)}
                    className="cursor-pointer"
                  />
                )}
              </>
            )}
          </div>
          <div className="relative flex justify-end">
            {moreOptions && (
              <MoreOptions
                onCloseOptions={() => setMoreOptions(false)}
                entry={entry}
                onOpenModal={() => setDeleteModal(true)}
              />
            )}
          </div>
          <div className="pt-2 pb-10 text-lg">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:font-serif">
              <ReactMarkdown>{entry.body}</ReactMarkdown>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
