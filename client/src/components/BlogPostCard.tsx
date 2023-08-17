import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Entry } from '../lib/types';

type props = {
  entry: Entry;
};

export default function BlogPostCard({ entry }: props) {
  const date = new Date(entry.date);

  return (
    <div className="h-60 md:h-48 border-b border-black mt-3 group">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span className="text-sm md:text-md">
            Article by{' '}
            <Link
              to={`/profiles/${entry.username}`}
              className="underline cursor-pointer">
              {entry.username}
            </Link>{' '}
            •{' '}
            <span className="text-xs text-gray-500">
              {date.toDateString().slice(3)}
            </span>
          </span>
        </div>
      </div>
      <Link to={`/post/${entry.entryId}`}>
        <div className="flex flex-wrap h-32 cursor-pointer">
          <div className="basis-full md:basis-1/3 h-full">
            <img
              className="object-cover w-full h-full"
              src={entry.photoURL}
              alt={entry.photoAlt}
            />
          </div>
          <div className="px-1 md:py-3 md:px-4 font-lato flex flex-wrap md:basis-2/3">
            <div className="basis-full">
              <h1 className="md:group-hover:underline md:text-2xl font-extrabold">
                {entry.title}
              </h1>
              <h2 className="text-sm md:text-xl font-medium">
                {entry.subtitle}
              </h2>
            </div>
            <div className="flex bg-primary text-white items-center rounded-lg px-2">
              <FaLocationDot className="text-sm md:text-md mr-1" />
              <span className="text-sm">{entry.location}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
