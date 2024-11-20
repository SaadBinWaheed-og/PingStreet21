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

      // Apply color to the top 3 players
      if (index === 0) row.style.backgroundColor = '#FFD70090'; // Gold for 1st
      else if (index === 1)
        row.style.backgroundColor = '#C0C0C080'; // Silver for 2nd

      // Add trophy for the top player
      if (index === 0 && player?.points > 0) {
        row.innerHTML = `
          <td style="display: flex; align-items: center; justify-content: center;">
            <img src="trophy.svg" alt="Trophy" width="20" height="20" style="margin-right: 8px;">
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
