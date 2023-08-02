export default function MoreOptions() {
  return (
    <div className="z-10 bg-white rounded-lg drop-shadow-lg w-44 absolute">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Edit
          </span>
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
