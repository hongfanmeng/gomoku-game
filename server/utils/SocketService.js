const { GoGame, Player } = require("./GoGame");
let newGame;

module.exports = function SocketService(socket, io) {
  let id = socket.id;
  let player = new Player(id, socket);
  if (!newGame) newGame = new GoGame();
  if (newGame.gameOver != 0 || newGame.isFull()) newGame = new GoGame();

  newGame.addPlayer(player);
  socket.emit("color", player.color);
  if (newGame.isFull()) {
    newGame.emitAll("round", newGame.turn);
  }

  let currentGame = newGame;
  socket.on("position", (data) => {
    data = {
      x: data.x,
      y: data.y,
    };
    /*add something to judge x y here*/
    if (!currentGame) return;
    if (currentGame.gameOver) return;
    if (!currentGame.isFull()) return;
    if (currentGame.board[data.x][data.y] != 0) return; //if useds
    if (!currentGame.round(player.color)) return;

    data["status"] = player.color;
    currentGame.addCell(data.x, data.y, data.status);
    socket.emit("position", data);
    currentGame.getAnother(player).socket.emit("position", data);

    if (currentGame.judge(data.x, data.y)) {
      currentGame.emitAll("gameOver", currentGame.gameOver);
    }
    //console.log(currentGame.gameOver);
    currentGame.nextRound();
    currentGame.emitAll("round", currentGame.turn);
  });

  socket.on("disconnect", () => {
    currentGame.gameOver = -1; //disconnectx
    let another = currentGame.getAnother(player);
    if (another) another.socket.emit("gameOver", -1);
  });
};
