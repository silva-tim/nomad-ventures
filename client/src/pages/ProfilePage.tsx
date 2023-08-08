import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';
import { Entry } from '../lib/types';

export default function ProfilePage() {
  const [entries, setEntries] = useState<Entry[]>();
  const [error, setError] = useState<unknown>();
  const { username } = useParams();

  useEffect(() => {
    async function getEntries() {
      try {
        const result = await fetch(`/api/profiles/${username}`);
        const entriesJSON = await result.json();

        setEntries(entriesJSON);
      } catch (err) {
        setError(err);
      }
    }
    getEntries();
  }, [username]);

  if (error) {
    return (
      <div>
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </div>
    );
  }

  if (!entries) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="max-w-screen-lg m-auto border-b border-black h-36 flex justify-center items-center">
        <span className="text-3xl">{username}</span>
      </div>
      <div className="max-w-screen-md m-auto pt-3">
        {entries.map((index) => (
          <BlogPostCard key={index.entryId} entry={index} />
        ))}
      </div>
    </>
  );
}
