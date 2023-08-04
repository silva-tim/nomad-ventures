import { Entry } from './types';

let key: string;

export async function createEntry(entryInput: Entry) {
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
  return await res.json();
}

export async function updateEntry(entryInput: Entry) {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entryInput),
  };
  const res = await fetch(`/api/entries/${entryInput.entryId}`, req);
  if (!res.ok) {
    throw new Error(`fetch Error ${res.status}`);
  }
  return;
}

export async function searchUnsplash(search: string) {
  if (!key) {
    const res = await fetch('/api/key');
    key = await res.json();
  }
  const result = await fetch(
    `https://api.unsplash.com/search/photos?query=${search}&orientation=landscape&per_page=12&client_id=${key}`
  );
  return await result.json();
}

export async function deleteEntry(entryId: number) {}
