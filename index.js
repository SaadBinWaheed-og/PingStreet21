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
                       <img src="trophy.svg" alt="Trophy" width="40" height="40" style="margin-right: 8px;">
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

  function fetchAndDisplayMatches() {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        const matchesContainer = document.getElementById('matchesList');
        matchesContainer.innerHTML = ''; // Clear previous content
  
        // Create a title for the matches section
        const matchesTitle = document.createElement('h2');
        matchesTitle.textContent = 'Matches List';
        matchesContainer.appendChild(matchesTitle);
  
        // Generate cards for each match
        data.matches.forEach((match) => {
          const matchCard = document.createElement('div');
          matchCard.classList.add('match-card');
  
          // Determine if Player 1 or Player 2 is the winner
          const player1Class = match.winner === match.player1 ? 'sparkly-border' : '';
          const player2Class = match.winner === match.player2 ? 'sparkly-border' : '';
  
          // Card content
          matchCard.innerHTML = `
            <div class="match-date">${match.date}</div>
            <div class="match-players">
              <span class="player-name ${player1Class}">${match.player1}</span>
              <span class="vs-text">VS</span>
              <span class="player-name ${player2Class}">${match.player2}</span>
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
      .catch((error) => console.error('Error fetching matches:', error));
  }

  document.addEventListener('mousemove', (event) => {
    // Create the star element
    const star = document.createElement('div');
    star.classList.add('star-sparkle');
  
    // Add the star SVG as background
    star.style.left = `${event.pageX}px`;
    star.style.top = `${event.pageY}px`;
    star.style.background = `
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="hotpink"><path d="M12 .587l3.668 7.511L24 9.765l-6 5.827L19.335 24 12 19.911 4.665 24 6 15.592 0 9.765l8.332-1.667z"/></svg>')
    `;
    star.style.backgroundSize = 'contain';
    star.style.backgroundRepeat = 'no-repeat';
  
    // Append the star to the body
    document.body.appendChild(star);
  
    // Remove the star after the animation ends
    setTimeout(() => {
      star.remove();
    }, 1200); // Matches the animation duration
  });
  
  fetchAndDisplayMatches();
  