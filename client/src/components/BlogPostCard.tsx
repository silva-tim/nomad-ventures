import { FaLocationDot } from 'react-icons/fa6';
import { PiHeartFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { Entry } from '../lib/types';

type props = {
  entry: Entry;
};

export default function BlogPostCard({ entry }: props) {
  return (
    <div className="h-48 border-b border-black mt-3 group">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span>
            Article by{' '}
            <Link
              to={`/profiles/${entry.username}`}
              className="underline cursor-pointer">
              {entry.username}
            </Link>
          </span>
        </div>
        <div className="flex">
          <PiHeartFill className="text-2xl mr-1 text-red-600" />
          <span>232</span>
        </div>
      </div>
      <Link to={`/post/${entry.entryId}`}>
        <div className="flex h-32 cursor-pointer">
          <div className="basis-1/3 h-full">
            <img
              className="object-cover w-full h-full"
              src={entry.photoURL}
              alt={entry.photoAlt}
            />
          </div>
          <div className="py-3 px-4 font-lato flex flex-wrap">
            <div className="basis-full">
              <h1 className="group-hover:underline text-2xl font-extrabold">
                {entry.title}
              </h1>
              <h2 className="text-xl font-medium">{entry.subtitle}</h2>
            </div>
            <div className="flex bg-primary text-white items-center rounded-lg px-2">
              <FaLocationDot className="mr-1" />
              <span className="text-sm">{entry.location}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
