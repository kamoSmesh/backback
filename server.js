const app = require("./app");
const http = require("http");

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("Running on port 8000");
});
