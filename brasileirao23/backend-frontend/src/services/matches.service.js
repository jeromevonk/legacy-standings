import { fetchWrapper } from 'src/helpers';

// fetch() in Node.js (SSR/getInitialProps) requires an absolute URL.
// On the client, a relative path is sufficient.
function getApiUrl() {
  if (typeof window !== 'undefined') return '/api/matches';
  const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  return `${host}/api/matches`;
}

export const matchesService = {
  getMatches,
};

function getMatches() {
  return fetchWrapper.get(getApiUrl());
}