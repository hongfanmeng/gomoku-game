const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const SocketService = require("./utils/SocketService");

io.on("connection", (socket) => {
  SocketService(socket, io);
});

app.use(express.static(path.join(__dirname, "../public")));

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));
