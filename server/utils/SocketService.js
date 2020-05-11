const { GoGame, Player } = require("./GoGame");
let newGame;
let players = {};

function judge(nickname) {
  if (!nickname || !nickname.length) return 1;
  //invalid name
  else if (players[nickname]) return 2; //same name
  return 0;
}
module.exports = function SocketService(socket, io) {
  //new player
  let id = socket.id;
  let player = new Player(id, socket);
  if (!newGame) newGame = new GoGame();
  if (newGame.gameOver != 0 || newGame.isFull()) newGame = new GoGame();
  let currentGame = newGame;

  //nickname query socket
  socket.on("nickname", (nickname) => {
    let errCode = judge(nickname);
    socket.emit("err", errCode);
    if (errCode) return;
  });
  socket.on("ready", (nickname) => {
    //handling error
    let errCode = judge(nickname);
    socket.emit("err", errCode);
    if (errCode) return;

    //handling nickname
    players[nickname] = 1;
    if (player.nickname) delete players[player.nickname];
    player.nickname = nickname;

    //starting the game
    currentGame.addPlayer(player);
    socket.emit("color", player.color);
    if (currentGame.isFull()) {
      socket.emit("nickname", currentGame.getAnother(player).nickname);
      currentGame.getAnother(player).socket.emit("nickname", player.nickname);
      currentGame.emitAll("round", currentGame.turn);
    }
  });

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
    currentGame.nextRound();
    currentGame.emitAll("round", currentGame.turn);
  });

  socket.on("disconnect", () => {
    currentGame.gameOver = -1; //disconnect
    if (player.nickname) delete players[player.nickname];
    let another = currentGame.getAnother(player);
    if (another) another.socket.emit("gameOver", -1);
  });
};
