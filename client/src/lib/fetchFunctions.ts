import { Entry } from './types';

export async function submitEntry(
  entryInput: Entry,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryInput),
    };
    const res = await fetch('/api/entries', req);
    if (!res.ok) {
      throw new Error(`fetch Error ${res.status}`);
    }
  } catch (err) {
    setError(true);
  }
}
