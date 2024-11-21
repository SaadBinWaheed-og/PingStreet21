// Fetch data from JSON file and populate the table
fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.getElementById('leagueTable');

    // Calculate points and add them to the player objects
    const playersWithPoints = data.players.map((player) => ({
      ...player,
      points: player.wins * 2, // 2 points per win
    }));

    // Sort players by points (descending)
    playersWithPoints.sort((a, b) => b.points - a.points);

    // Add rows to the table
    playersWithPoints.forEach((player, index) => {
      const row = document.createElement('tr');

      // Add trophy for the top player
      if (index === 0 && player?.points > 0) {
        row.innerHTML = `
          <td style="display: flex; align-items: center; justify-content: center;">
            ${player.name}
          </td>
          <td>${player.matches}</td>
          <td>${player.wins}</td>
          <td>${player.losses}</td>
          <td>${player.points}</td>
        `;
      } else {
        row.innerHTML = `
          <td>${player.name}</td>
          <td>${player.matches}</td>
          <td>${player.wins}</td>
          <td>${player.losses}</td>
          <td>${player.points}</td>
        `;
      }
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error('Error loading data:', error));


// Fetch and display matches as VS cards
function fetchAndDisplayMatches() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const matchesContainer = document.getElementById('matchesList');
      matchesContainer.innerHTML = ''; // Clear previous content

      // Create a title for the matches section
      const matchesTitle = document.createElement('h2');
      matchesTitle.textContent = 'Matches List';
      matchesContainer.appendChild(matchesTitle);

      // Generate cards for each match
      data.matches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.classList.add('match-card');

        // Card content
        matchCard.innerHTML = `
          <div class="match-date">${match.date}</div>
          <div class="match-players">
            <span class="player-name">${match.player1}</span>
            <span class="vs-text">VS</span>
            <span class="player-name">${match.player2}</span>
          </div>
          <div class="match-winner">
            Winner: <span class="${match.winner ? 'winner-name' : 'tbd'}">
              ${match.winner || 'TBD'}
            </span>
          </div>
        `;
        matchesContainer.appendChild(matchCard);
      });
    })
    .catch(error => console.error('Error fetching matches:', error));
}

// Call this function after the league table is rendered
fetchAndDisplayMatches();
