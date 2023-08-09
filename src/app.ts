interface Score {
  id: number;
  name: string;
  point: number;
  rankings: boolean;
}

// * get data from localStorage
let scoreBoard: Score[] = JSON.parse(localStorage.getItem("scorePlayer") || "[]");

//* save data to localStorage
function savePlayerToLocalStorage() {
  localStorage.setItem("scorePlayer", JSON.stringify(scoreBoard));
}

function renderScoreBoard(key: any[]) {
  let result = scoreBoard.reduce((x, y) => {
    return x + y.point;
  }, 0);

  //   console.log(result);
  let pointBoardElement = document.querySelector(".point-board") as HTMLElement;
  let pointBoardElementContent = "";
  pointBoardElementContent += `<table>
    <tr>
        <td>Players:</td>
        <td>${scoreBoard.length}</td>
    </tr>
    <tr>
        <td>Total Points:</td>
        <td> ${result} </td>
    </tr>
  </table>`;

  let mainElement = document.querySelector("main") as HTMLElement;
  let mainElementContent = "";
  key.forEach((item, index) => {
    mainElementContent += `<section class="player-info">
  <div class="group-icon">
      <i class="fa-solid fa-xmark" onclick="deletePlayer(${item.id})"></i>
      <i class="fa-solid fa-trophy ${item.rankings}"
      id="${item.id}"></i>
      <p class="player-name">${item.name}</p>
  </div>

  <div class="point-grade">
  <div class="point-grade">
  <i class="fa-solid fa-minus pg icon-minus" onclick="handleDec(${index}, '-')"></i>
  <span class="point pg">${item.point}</span>
  <i class="fa-solid fa-plus pg" onclick="handleInc(${index}, '+')"></i>
</div>
  </div>
</section>`;
  });
  pointBoardElement.innerHTML = pointBoardElementContent;
  mainElement.innerHTML = mainElementContent;
  higherPlayer();
}

renderScoreBoard(scoreBoard);

// * hàm thêm người chơi
function handleAdd() {
  let inputPlayerName = document.querySelector(".input-player") as HTMLInputElement;

  let inputPlayer: Score = {
    id: scoreBoard.length > 0 ? scoreBoard[scoreBoard.length - 1].id + 1 : scoreBoard.length,
    name: inputPlayerName.value,
    point: 0,
    rankings: false,
  };

  if (inputPlayer.name !== "") {
    scoreBoard.push(inputPlayer);
    inputPlayerName.value = "";
  } else {
    alert(` mời nhập tên người chơi  `);
  }

  savePlayerToLocalStorage();
  renderScoreBoard(scoreBoard);
}

function handleDec(id: number, action: string) {
  console.log(action);
  const point = scoreBoard.find((score) => score.id === id);
  console.log(point);

  if (point && point.point > 0) {
    point.point -= 1;
  } else {
    alert(`người chơi ${point?.name} ko thể trừ ở điểm dưới 0 `);
  }
  renderScoreBoard(scoreBoard);
  savePlayerToLocalStorage();
}

function handleInc(id: number, action: string) {
  console.log(action);
  const point = scoreBoard.find((score) => score.id === id);

  if (point) {
    point.point += 1;
  }
  renderScoreBoard(scoreBoard);
  savePlayerToLocalStorage();
}

function deletePlayer(id: number) {
  scoreBoard = scoreBoard.filter((p) => p.id !== id);
  savePlayerToLocalStorage();
  renderScoreBoard(scoreBoard);
}

function higherPlayer() {
  const allScore = scoreBoard.map((item: any) => item.point);

  const maxScore: number = Math.max(...allScore);

  if (maxScore > 0) {
    let trophy = scoreBoard.filter((item: any) => item.point === maxScore);

    for (let index = 0; index < trophy.length; index++) {
      console.log(trophy[index].id);
      const nameElement = document.getElementById(`${trophy[index].id}`) as HTMLElement;
      nameElement.style.color = "red";
    }
  }
}
