import { Link } from 'react-router-dom';
import { Entry } from '../lib/types';
type props = {
  entry: Entry;
};

export default function MoreOptions({ entry }: props) {
  return (
    <div className="z-10 bg-white rounded-lg drop-shadow-lg w-44 absolute">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <Link
            to={'/edit-adventure'}
            state={{ entry }}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Edit
          </Link>
        </li>
        <li>
          <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Delete
          </span>
        </li>
      </ul>
    </div>
  );
}
