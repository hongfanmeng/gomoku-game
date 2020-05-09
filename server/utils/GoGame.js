class GoGame {
  constructor() {
    this.size = 0;
    this.players = [];
    this.board = new Array(20).fill(0).map(() => new Array(20).fill(0));
    this.turn = 1;
    this.gameOver = 0; //-1 disconnect | 0 default | 1 black win | 2 white win | 3 noone win
  }
  getAnother(player) {
    if (player == this.players[0]) return this.players[1];
    else return this.players[0];
  }
  addPlayer(player) {
    this.size += 1;
    if (this.size == 1) player.color = 1;
    else player.color = 2;
    this.players.push(player);
  }
  isFull() {
    return this.size >= 2;
  }
  addCell(x, y, status) {
    this.board[x][y] = status;
  }
  judge(x, y) {
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = 0; dy <= 1; dy++) {
        if (dx == 0 && dy == 0) continue;
        let cnt = 0;
        for (let i = -4; i <= 4; i++) {
          if (
            1 <= x + dx * i &&
            x + dx * i <= 15 &&
            1 <= y + dy * i &&
            y + dy * i <= 15
          ) {
            //console.log(x + dx * i, y + dy * i);
            if (this.board[x + dx * i][y + dy * i] == this.board[x][y]) cnt++;
            else cnt = 0;
            if (cnt >= 5) this.gameOver = this.board[x][y];
          }
        }
      }

    return this.gameOver;
  }
  round(color) {
    return this.turn == color;
  }
  nextRound() {
    if (this.turn == 1) this.turn = 2;
    else this.turn = 1;
  }
  emitAll(eventName, content) {
    this.players.forEach((player) => {
      player.socket.emit(eventName, content);
    });
  }
}
class Player {
  constructor(id, socket) {
    this.id = id;
    this.color = 0;
    this.socket = socket;
  }
  setColor(color) {
    this.color = color;
  }
}
module.exports.GoGame = GoGame;
module.exports.Player = Player;
