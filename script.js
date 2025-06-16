let homeGoals = 0;
let awayGoals = 0;
let currentMinute = 0;
let matchInterval;

let shotsHome = 0;
let shotsAway = 0;
let possessionHome = 50;
let possessionAway = 50;
let yellowCardsHome = 0;
let yellowCardsAway = 0;
let redCardsHome = 0;
let redCardsAway = 0;

const homeTeam = "FC Testowa";
const awayTeam = "GKS Demo";

window.onload = () => {
  loadHistoryFromStorage();
};

function simulateMatch() {
  homeGoals = 0;
  awayGoals = 0;
  currentMinute = 0;
  shotsHome = 0;
  shotsAway = 0;
  possessionHome = 50;
  possessionAway = 50;
  yellowCardsHome = 0;
  yellowCardsAway = 0;
  redCardsHome = 0;
  redCardsAway = 0;

  document.getElementById("result").innerText = `Wynik: 0 - 0`;
  document.getElementById("clock").innerText = "Czas: 0'";
  document.getElementById("commentary").innerHTML = "";
  updateStatsDisplay();

  clearInterval(matchInterval);

  matchInterval = setInterval(() => {
    currentMinute++;
    document.getElementById("clock").innerText = `Czas: ${currentMinute}'`;

    if(currentMinute % 10 === 0){
      const change = Math.floor(Math.random() * 11) - 5;
      possessionHome = Math.min(100, Math.max(0, possessionHome + change));
      possessionAway = 100 - possessionHome;
    }

    if (Math.random() < 0.15) {
      const shotHome = Math.random() < 0.5;
      if(shotHome) shotsHome++;
      else shotsAway++;

      if(Math.random() < 0.3){
        if(shotHome){
          homeGoals++;
          showGoalAnimation();
          dodajKomentarz(`${currentMinute}' GOL! ${homeTeam} zdobywa bramkę.`);
        } else {
          awayGoals++;
          showGoalAnimation();
          dodajKomentarz(`${currentMinute}' GOL! ${awayTeam} trafia do siatki.`);
        }
      } else {
        dodajKomentarz(`${currentMinute}' Strzał ${shotHome ? homeTeam : awayTeam}, ale bez gola.`);
      }
      updateStatsDisplay();
      document.getElementById("result").innerText = `Wynik: ${homeGoals} - ${awayGoals}`;
    }

    if(Math.random() < 0.02){
      const cardHome = Math.random() < 0.5;
      const yellowOrRed = Math.random() < 0.8 ? "żółtą" : "czerwoną";
      if(cardHome){
        if(yellowOrRed === "żółtą") yellowCardsHome++;
        else redCardsHome++;
        dodajKomentarz(`${currentMinute}' ${homeTeam} otrzymuje ${yellowOrRed} kartkę.`);
      } else {
        if(yellowOrRed === "żółtą") yellowCardsAway++;
        else redCardsAway++;
        dodajKomentarz(`${currentMinute}' ${awayTeam} otrzymuje ${yellowOrRed} kartkę.`);
      }
      updateStatsDisplay();
    }

    if (currentMinute >= 90) {
      clearInterval(matchInterval);
      zapiszDoHistorii(homeTeam, awayTeam, homeGoals, awayGoals);
      dodajKomentarz(`Koniec meczu. Wynik: ${homeGoals} - ${awayGoals}`);
    }
  }, 100);
}

function dodajKomentarz(tresc) {
  const komentarz = document.createElement("li");
  komentarz.innerText = tresc;
  document.getElementById("commentary").appendChild(komentarz);
}

function showGoalAnimation() {
  const anim = document.getElementById("goalAnimation");
  anim.style.display = "block";
  setTimeout(() => {
    anim.style.display = "none";
  }, 1000);
}

function updateStatsDisplay() {
  document.getElementById("shotsHome").innerText = shotsHome;
  document.getElementById("shotsAway").innerText = shotsAway;
  document.getElementById("possessionHome").innerText = possessionHome;
  document.getElementById("possessionAway").innerText = possessionAway;
  document.getElementById("yellowCardsHome").innerText = yellowCardsHome;
  document.getElementById("yellowCardsAway").innerText = yellowCardsAway;
  document.getElementById("redCardsHome").innerText = redCardsHome;
  document.getElementById("redCardsAway").innerText = redCardsAway;
}

function zapiszDoHistorii(homeTeam, awayTeam, home, away) {
  const historia = document.getElementById("history");
  const data = new Date().toLocaleTimeString();
  const nowyMeczTekst = `${data} - ${homeTeam} ${home} : ${away} ${awayTeam}`;
  const li = document.createElement("li");
  li.innerText = nowyMeczTekst;
  historia.appendChild(li);

  // LocalStorage
  const zapisane = JSON.parse(localStorage.getItem("history")) || [];
  zapisane.push(nowyMeczTekst);
  localStorage.setItem("history", JSON.stringify(zapisane));
}

function loadHistoryFromStorage() {
  const historia = document.getElementById("history");
  const zapisane = JSON.parse(localStorage.getItem("history")) || [];
  zapisane.forEach(text => {
    const li = document.createElement("li");
    li.innerText = text;
    historia.appendChild(li);
  });
}
