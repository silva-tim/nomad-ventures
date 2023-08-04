import { Link } from 'react-router-dom';
import { Entry } from '../lib/types';
type props = {
  entry: Entry;
  onOpenModal: () => void;
  onCloseOptions: () => void;
};

export default function MoreOptions({
  entry,
  onOpenModal,
  onCloseOptions,
}: props) {
  return (
    <>
      <div
        onClick={onCloseOptions}
        className="fixed top-0 left-0 z-10 h-screen w-screen"
      />
      <div className="z-20 bg-white rounded-lg drop-shadow-lg w-44 absolute">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li onClick={onCloseOptions}>
            <Link
              to={'/edit-adventure'}
              state={{ entry }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Edit
            </Link>
          </li>
          <li onClick={onCloseOptions}>
            <span
              onClick={onOpenModal}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
              Delete
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
