const baseUrl = `${typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api' : '/api'}/matches`;

export const matchesService = {
  getMatches,
};

async function getMatches() {
  try {
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