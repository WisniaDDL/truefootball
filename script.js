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
  document.getElementById("commentary").innerHTML = "";
  clearInterval(matchInterval);

  matchInterval = setInterval(() => {
    currentMinute++;
    document.getElementById("clock").innerText = `Czas: ${currentMinute}'`;

    if (Math.random() < 0.05) {
      const strzelilDom = Math.random() < 0.5;
      if (strzelilDom) {
        homeGoals++;
        dodajKomentarz(`${currentMinute}' GOL! FC Testowa zdobywa bramkę.`);
      } else {
        awayGoals++;
        dodajKomentarz(`${currentMinute}' GOL! GKS Demo trafia do siatki.`);
      }
      document.getElementById("result").innerText = `Wynik: ${homeGoals} - ${awayGoals}`;
    }

    if (currentMinute >= 90) {
      clearInterval(matchInterval);
      zapiszDoHistorii(homeGoals, awayGoals);
      dodajKomentarz(`Koniec meczu. Wynik: ${homeGoals} - ${awayGoals}`);
    }
  }, 100);
}

function zapiszDoHistorii(home, away) {
  const historia = document.getElementById("history");
  const nowyMecz = document.createElement("li");
  const data = new Date().toLocaleTimeString();
  nowyMecz.innerText = `${data} — FC Testowa ${home} - ${away} GKS Demo`;
  historia.prepend(nowyMecz);
}

function dodajKomentarz(tekst) {
  const komentarze = document.getElementById("commentary");
  const nowy = document.createElement("li");
  nowy.innerText = tekst;
  komentarze.prepend(nowy);
}
