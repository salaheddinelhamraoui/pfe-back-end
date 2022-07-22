require("dotenv").config();
const http = require("http");
const app = require("./config/server");

const ENV = process.env;

function startServer() {
  const server = http.createServer(app);
  server.listen(ENV.PORT || 5000, () => {
    console.log(`Listening to PORT => ${ENV.PORT || 5000}`);
  });
}

startServer();
