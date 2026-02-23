import getConfig from 'next/config';
import { fetchWrapper } from 'src/helpers';

export const matchesService = {
  getMatches,
};

function getMatches() {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = `${publicRuntimeConfig.apiUrl}/matches`;
  return fetchWrapper.get(baseUrl);
}