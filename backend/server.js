const app = require("./app");
const http = require("http");
const { initializeSocket } = require("./socket");
const port = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
