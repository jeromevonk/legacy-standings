export const matchesService = {
  getMatches,
  getCurrentRound,
  getStartedMatchesInDescendingOrder,
  getMatchesFromTeam,
};

async function getMatches() {
  try {
    // On the server (getInitialProps), read JSON files directly — no HTTP call needed.
    // On the client, use the API route.
    if (typeof window === 'undefined') {
      return await getMatchesFromFiles();
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

async function getMatchesFromFiles() {
  const fs = await import('fs');
  const path = await import('path');
  const match_helper = await import('../helpers/match_helper');

  const responseData = {};
  const requests = [];

  for (let i = 1; i <= 38; i++) {
    requests.push(
      (async (round) => {
        const filePath = path.join(process.cwd(), `src/pages/api/data/${round}.json`);
        if (fs.existsSync(filePath)) {
          const data = fs.readFileSync(filePath, 'utf8');
          responseData[round] = JSON.parse(data);
        } else {
          responseData[round] = await match_helper.getRoundFromAPI(round);
        }
      })(i)
    );
  }

  await Promise.all(requests);
  return responseData;
}


function getCurrentRound(matches) {
  for (let i = 38; i > 0; i--) {
    // Get a round
    const round = matches[i]

    // Look all the matches, check if at least one has started
    for (let match of round) {
      if (match.started) {
        // Found a match that has started. Return this as the current round
        return i;
      }
    }
  }


  // If nothing started, return round 1
  return 1
}

function getStartedMatchesInDescendingOrder(matches) {
  // Flatten the matches
  const matchesArray = Object.values(matches).flat();

  // Sort by date descending
  return matchesArray
    .filter(item => item.started)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getMatchesFromTeam(matches, team) {
  // Flatten the matches
  const matchesArray = Object.values(matches).flat();

  // Sort by date ascending
  return matchesArray
    .filter(item => [item.homeTeam, item.awayTeam].includes(team))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}
