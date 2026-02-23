export const matchesService = {
  getMatches,
};

async function getMatches() {
  try {
    // On the server (getInitialProps), load the JSON directly — no HTTP call needed.
    // On the client, use the API route.
    if (typeof window === 'undefined') {
      return require('../pages/api/results.json');
    }
    const response = await fetch('/api/matches');
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}