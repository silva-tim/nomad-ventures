import { Entry } from './types';

let key: string;

export async function createEntry(
  entryInput: Entry,
  token: string | undefined
) {
  if (!token) {
    throw new Error('Unauthorized. Must be signed in to do this.');
  }
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entryInput),
  };
  const res = await fetch('/api/entries', req);
  if (!res.ok) {
    throw new Error(`fetch Error ${res.status}`);
  }
  return await res.json();
}

export async function updateEntry(
  entryInput: Entry,
  token: string | undefined
) {
  if (!token) {
    throw new Error('Unauthorized. Must be signed in to do this.');
  }
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entryInput),
  };
  const res = await fetch(`/api/entries/${entryInput.entryId}`, req);
  if (!res.ok) {
    throw new Error(`fetch Error ${res.status}`);
  }
  return;
}

export async function deleteEntry(
  entryInput: Entry,
  token: string | undefined
) {
  if (!token) {
    throw new Error('Unauthorized. Must be signed in to do this.');
  }
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
