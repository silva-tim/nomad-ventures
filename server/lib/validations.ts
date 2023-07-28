import ClientError from './client-error.js';

export function validateTitle(title: string): void {
  if (!title) {
    throw new ClientError(400, `"title" is required`);
  }
}

export function validateSubtitle(subTitle: string): void {
  if (!subTitle) {
    throw new ClientError(400, `"subtitle" is required`);
  }
}

export function validateLocation(location: string): void {
  if (!location) {
    throw new ClientError(400, `"location" is required`);
  }
}

export function validatePhotoURL(photoURL: string): void {
  if (!photoURL) {
    throw new ClientError(400, `"photoURL" is required`);
  }
}

export function validateBody(body: string): void {
  if (!body) {
    throw new ClientError(400, `"body" is required`);
  }
}
