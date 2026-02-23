import { fetchWrapper } from 'src/helpers';

export const matchesService = {
  getMatches,
};

async function getMatches() {
  // On the server (getInitialProps), load the JSON directly — no HTTP call needed.
  // On the client, use the API route via fetchWrapper.
  if (typeof window === 'undefined') {
    return require('../pages/api/results.json');
  }
  return fetchWrapper.get('/api/matches');
}