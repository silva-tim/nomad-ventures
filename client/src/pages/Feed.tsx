import { useEffect, useState } from 'react';
import BlogPostCard from '../components/BlogPostCard';
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
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-md m-auto">
      {entries.map((index) => (
        <BlogPostCard key={index.entryId} entry={index} />
      ))}
    </div>
  );
}
