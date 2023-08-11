import { useEffect, useState } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import Loading from '../components/Loading';
import { Entry } from '../lib/types';

export default function Feed() {
  const [entries, setEntries] = useState<Entry[]>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function getEntries() {
      try {
        const result = await fetch('/api/entries');
        const entriesJSON = await result.json();
        setEntries(entriesJSON);
      } catch (err) {
        setError(err);
      }
    }
    getEntries();
  }, []);

  if (error) {
    return (
      <div>
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </div>
    );
  }

  if (!entries) {
    return <Loading />;
  }

  return (
    <>
      <div className="max-w-screen-md w-11/12 m-auto">
        <div className="w-full p-2 text-center text-white bg-primary">
          <span className="text-xl">Newest Adventures</span>
        </div>
        {entries.map((index) => (
          <BlogPostCard key={index.entryId} entry={index} />
        ))}
      </div>
    </>
  );
}
