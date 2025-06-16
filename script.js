function simulateMatch() {
  const homeGoals = Math.floor(Math.random() * 5);
  const awayGoals = Math.floor(Math.random() * 5);
  const resultText = `Wynik: FC Testowa ${homeGoals} - ${awayGoals} GKS Demo`;

  document.getElementById("result").innerText = resultText;
}
