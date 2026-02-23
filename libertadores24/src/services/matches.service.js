import getConfig from 'next/config';

export const matchesService = {
  getMatches,
};

async function getMatches() {
  try {
    const { publicRuntimeConfig } = getConfig();
    const baseUrl = `${publicRuntimeConfig.apiUrl}/matches`;
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}