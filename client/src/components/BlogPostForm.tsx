import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { Entry } from '../lib/types';
import { useState } from 'react';
import { submitEntry } from '../lib/fetchFunctions';

type props = {
  entry: Entry | undefined;
  isNew: boolean;
};
export default function BlogPostForm({ entry, isNew }: props) {
  const [title, setTitle] = useState(entry?.title);
  const [subtitle, setSubtitle] = useState(entry?.subtitle);
  const [location, setLocation] = useState(entry?.location);
  const [photoURL, setPhotoURL] = useState(entry?.photoURL);
  const [body, setBody] = useState(entry?.body);
  const [error, setError] = useState(false);

  // async function handleSubmit(event: Event) {
  //   event.preventDefault();
  //   if (!title || !subtitle || !location || !photoURL || !body) {
  //     throw new Error('400', { cause: 'invalid request' });
  //   }

  //   const entryInput: Entry = { title, subtitle, location, photoURL, body };
  //   if (entry) {
  //     updateEntry(entryInput, setError);
  //   } else {
  //     submitEntry(entryInput, setError)
  //   }
  // }

  return (
    <form>
      <div className="flex pt-4 justify-between">
        <Link to="/">
          <div className="flex">
            <AiOutlineLeft className="text-xl m-0.5" />
            <span className="hover:underline">cancel</span>
          </div>
        </Link>
        <div>
          <button type="submit" className="bg-green-400 px-7 rounded-3xl">
            {isNew ? 'Publish' : 'Update'}
          </button>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="basis-1/2 bg-secondary me-1 flex justify-between">
          <input
            type="text"
            name=""
            id=""
            placeholder="Location"
            className="p-3 outline-0 bg-secondary text-xl basis-full"
          />
          <FaLocationDot className="text-3xl mr-1 mt-3" />
        </div>
        <div className="basis-1/2 bg-secondary me-1 flex justify-between">
          <input
            type="text"
            placeholder="Search Unsplash for Image"
            className="p-3 outline-0 bg-secondary text-xl basis-full"
          />
          <button
            type="button"
            className="bg-primary bg-opacity-90 text-white px-3">
            Search
          </button>
        </div>
      </div>
      <input
        type="text"
        name=""
        id=""
        placeholder="Title"
        className="w-full p-3 mt-2 outline-0 text-4xl"
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Subtitle"
        className="w-full p-3 mt-2 outline-0 text-2xl"
      />
      <textarea
        name=""
        id=""
        placeholder="Tell your adventure..."
        className="w-full p-3 mt-2 outline-0 text-lg h-96 resize-none"
      />
    </form>
  );
}
