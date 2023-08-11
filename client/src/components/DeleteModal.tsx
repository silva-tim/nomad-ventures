import { AiOutlineClose } from 'react-icons/ai';
import { PiTrash } from 'react-icons/pi';

type props = {
  onCancel: () => void;
  onDelete: () => void;
};

export default function DeleteModal({ onCancel, onDelete }: props) {
  return (
    <div className="fixed top-0 bg-black bg-opacity-40 w-full h-full z-20">
      <div className="relative top-1/4 md:left-1/3 bg-white text-primary w-full md:w-5/12 rounded">
        <div className="flex justify-end">
          <AiOutlineClose
            onClick={onCancel}
            className="text-xl mt-2 mr-3 cursor-pointer"
          />
        </div>
        <div className="flex justify-center pt-2">
          <PiTrash className="text-3xl md:text-4xl lg:text-5xl" />
        </div>
        <div className="text-center pt-5">
          <span className="text-sm md:text-lg lg:text-xl">
            Are you sure you want to delete this entry?
          </span>
        </div>
        <div className="flex justify-around py-7 lg:pt-9">
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 py-3 px-7 rounded text-white">
            Delete
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-secondary py-3 px-7 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
