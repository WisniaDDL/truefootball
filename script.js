let homeGoals = 0;
let awayGoals = 0;
let currentMinute = 0;
let matchInterval;

function simulateMatch() {
  homeGoals = 0;
  awayGoals = 0;
  currentMinute = 0;
  document.getElementById("result").innerText = "Wynik: 0 - 0";
  document.getElementById("clock").innerText = "Czas: 0'";
  clearInterval(matchInterval);

  matchInterval = setInterval(() => {
    currentMinute++;
    document.getElementById("clock").innerText = `Czas: ${currentMinute}'`;

    // Szansa na bramkę co minutę (5%)
    if (Math.random() < 0.05) {
      const strzelilDom = Math.random() < 0.5;
      if (strzelilDom) {
        homeGoals++;
      } else {
        awayGoals++;
      }
      document.getElementById("result").innerText = `Wynik: ${homeGoals} - ${awayGoals}`;
    }

    if (currentMinute >= 90) {
      clearInterval(matchInterval);
      zapiszDoHistorii(homeGoals, awayGoals);
    }
  }, 100); // 100ms = 1 minuta gry
}

function zapiszDoHistorii(home, away) {
  const historia = document.getElementById("history");
  const nowyMecz = document.createElement("li");
  const data = new Date().toLocaleTimeString();
  nowyMecz.innerText = `${data} — FC Testowa ${home} - ${away} GKS Demo`;
  historia.prepend(nowyMecz);
}
