import { fetchWrapper } from 'src/helpers';

export const matchesService = {
  getMatches,
};

function getMatches() {
  return fetchWrapper.get('/api/matches');
}