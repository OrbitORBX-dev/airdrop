// Function to handle the bet selection (remains the same)
function selectMatch(matchName, odds) {
    alert(`You selected a bet on ${matchName} with odds of ${odds}`);
}

// Function to render the matches in the DOM (remains the same)
function renderMatches(matches) {
    const container = document.getElementById("matches");
    container.innerHTML = ''; // Clear previous content

    matches.forEach(m => {
        const div = document.createElement("div");
        div.className = "match";
        div.innerHTML = `
            <strong>${m.match}</strong><br/>
            Odds: ${m.odds}<br/>
            <button class="bet-button" data-match-name="${m.match}" data-odds="${m.odds}">Bet</button>
        `;
        container.appendChild(div);
    });
}

// Helper function to fetch data for a single league ID
async function fetchLeagueFixtures(leagueId, season, apiKey, headers) {
    const API_URL = `v3.football.api-sports.io{leagueId}&season=${season}&next=10`; // Get next 10 fixtures
    
    try {
        const response = await fetch(API_URL, { headers });
        if (!response.ok) {
            throw new Error(`Failed to fetch league ${leagueId}: ${response.status}`);
        }
        const result = await response.json();
        
        // Map the results to a consistent format
        return result.response.map(fixture => {
            const homeTeam = fixture.teams.home.name;
            const awayTeam = fixture.teams.away.name;
            // Odds are in a separate API call (/odds endpoint), this is a placeholder
            const oddsPlaceholder = "N/A - Fetch Odds Separately"; 

            return {
                id: fixture.fixture.id,
                match: `${homeTeam} vs ${awayTeam}`,
                odds: oddsPlaceholder
            };
        });
    } catch (error) {
        console.error(error.message);
        return []; // Return empty array on failure
    }
}

// Main function to fetch all top 7 leagues
async function loadAllTopLeagues() {
    const API_KEY = "77579ed6da06f7857f330257212a7a2a"; // Replace with your actual key
    const CURRENT_SEASON = 2024; // Use the relevant season, e.g., 2024

    const headers = new Headers();
    headers.append("x-apisports-key", API_KEY);
    headers.append("x-apisports-host", "v3.football.api-sports.io");

    const topLeagueIds = [39, 135, 140, 78, 61, 196, 94]; // EPL, Serie A, La Liga, etc.
    const fetchPromises = topLeagueIds.map(id => fetchLeagueFixtures(id, CURRENT_SEASON, API_KEY, headers));

    try {
        // Wait for all requests to complete concurrently
        const resultsByLeague = await Promise.all(fetchPromises);
        
        // Flatten the array of arrays into a single list of all matches
        const allMatches = resultsByLeague.flat();
        
        renderMatches(allMatches);

    } catch (error) {
        console.error("Error loading all leagues:", error);
    }
}

// Add event listener for the bet buttons (remains the same)
document.getElementById("matches").addEventListener('click', function(event) {
    if (event.target && event.target.matches('.bet-button')) {
        const matchName = event.target.getAttribute('data-match-name');
        const odds = event.target.getAttribute('data-odds'); 
        selectMatch(matchName, odds);
    }
});

// Call the new function to load all matches when the script runs
loadAllTopLeagues();
