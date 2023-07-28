import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function NewPost() {
  return (
    <div className="w-8/12 m-auto">
      <form action="">
        <div className="flex pt-4 justify-between">
          <Link to="/">
            <div className="flex">
              <AiOutlineLeft className="text-xl m-0.5" />
              <span className="hover:underline">cancel</span>
            </div>
          </Link>
          <div>
            <button type="submit" className="bg-green-400 px-7 rounded-3xl">
              Publish
            </button>
          </div>
        </div>
        <input
          type="text"
          name=""
          id=""
          placeholder="Title"
          className="w-full p-3 bg-secondary mt-3 outline-0"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Subtitle"
          className="w-full p-3 bg-secondary mt-2 outline-0"
        />
        <div className="flex relative">
          <input
            type="text"
            name=""
            id=""
            placeholder="Location"
            className="basis-2/3 p-3 bg-secondary me-1 mt-2 outline-0"
          />
          <FaLocationDot className="absolute text-2xl right-1/3 mr-4 top-5" />
          <button
            type="button"
            className="basis-1/3 text-center p-3 bg-secondary mt-2">
            Search Unsplash for Image
          </button>
        </div>
      </form>
    </div>
  );
}
