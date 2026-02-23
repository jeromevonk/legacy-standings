import { fetchWrapper } from 'src/helpers';

const baseUrl = `${typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api' : '/api'}/matches`;

export const matchesService = {
  getMatches,
};

function getMatches() {
  return fetchWrapper.get(baseUrl);
}