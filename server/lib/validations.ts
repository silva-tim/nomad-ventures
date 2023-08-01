import ClientError from './client-error.js';

export function validateInput(input: string): void {
  if (!input) {
    throw new ClientError(400, `"body" is required`);
  }
}
