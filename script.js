function simulateMatch() {
  const homeTeam = document.getElementById('homeTeamSelect').value;
  const awayTeam = document.getElementById('awayTeamSelect').value;

  if (homeTeam === awayTeam) {
    alert("Wybierz dwie różne drużyny.");
    return;
  }

  let time = 0;
  let homeScore = 0;
  let awayScore = 0;

  let shotsHome = 0;
  let shotsAway = 0;
  let yellowHome = 0;
  let yellowAway = 0;
  let redHome = 0;
  let redAway = 0;

  let commentary = document.getElementById('commentary');
  commentary.innerHTML = "";

  document.getElementById('clock').textContent = "Czas: 0'";
  document.getElementById('result').textContent = `Wynik: 0 - 0`;

  updateStats(0, 0, 0, 0, 0, 0);

  const interval = setInterval(() => {
    time++;
    document.getElementById('clock').textContent = `Czas: ${time}'`;

    if (Math.random() < 0.05) {
      let isHome = Math.random() < 0.5;
      if (isHome) {
        homeScore++;
        shotsHome++;
        addCommentary(`${homeTeam} zdobywa bramkę! (${time}')`);
      } else {
        awayScore++;
        shotsAway++;
        addCommentary(`${awayTeam} zdobywa bramkę! (${time}')`);
      }
      document.getElementById('result').textContent = `Wynik: ${homeScore} - ${awayScore}`;
      showGoalAnimation();
    }

    // Losowe kartki
    if (Math.random() < 0.02) {
      let isHome = Math.random() < 0.5;
      if (Math.random() < 0.7) {
        if (isHome) yellowHome++;
        else yellowAway++;
        addCommentary(`${isHome ? homeTeam : awayTeam} otrzymuje żółtą kartkę! (${time}')`);
      } else {
        if (isHome) redHome++;
        else redAway++;
        addCommentary(`${isHome ? homeTeam : awayTeam} otrzymuje czerwoną kartkę! (${time}')`);
      }
    }

    updateStats(shotsHome, shotsAway, yellowHome, yellowAway, redHome, redAway);

    if (time >= 90) {
      clearInterval(interval);
      addCommentary("Koniec meczu!");
      addToHistory(homeTeam, awayTeam, homeScore, awayScore);
    }
  }, 200);
}

function updateStats(shHome, shAway, yHome, yAway, rHome, rAway) {
  document.getElementById('shotsHome').textContent = shHome;
  document.getElementById('shotsAway').textContent = shAway;
  document.getElementById('yellowCardsHome').textContent = yHome;
  document.getElementById('yellowCardsAway').textContent = yAway;
  document.getElementById('redCardsHome').textContent = rHome;
  document.getElementById('redCardsAway').textContent = rAway;

  const posHome = 50 + Math.floor(Math.random() * 11 - 5); // losowe odchylenie
  const posAway = 100 - posHome;

  document.getElementById('possessionHome').textContent = posHome;
  document.getElementById('possessionAway').textContent = posAway;
}

function addCommentary(text) {
  const li = document.createElement('li');
  li.textContent = text;
  document.getElementById('commentary').appendChild(li);
}

function addToHistory(home, away, homeGoals, awayGoals) {
  const li = document.createElement('li');
  li.textContent = `${home} ${homeGoals} - ${awayGoals} ${away}`;
  document.getElementById('history').appendChild(li);
}

function showGoalAnimation() {
  const goalDiv = document.getElementById('goalAnimation');
  goalDiv.classList.add('show');
  setTimeout(() => {
    goalDiv.classList.remove('show');
  }, 1500);
}
