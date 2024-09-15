const http = require("http");
const getUsers = require("./modules/users");
const { URL } = require("url");

const server = http.createServer((request, response) => {
  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);
  const helloValue = url.searchParams.get("hello");

  if (helloValue) {
    response.statusCode = 200;
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${helloValue}!`);
    response.end();

    return;
  }

  if (request.url === "/?users") {
    response.statusCode = 200;
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  }

  if (request.url === "/?hello") {
    response.statusCode = 400;
    response.header = "Content-Type: text/plain";
    response.write(`Enter a name`);
    response.end();
    return;
  }

  if (request.url === "/") {
    response.statusCode = 200;
    response.header = "Content-Type: text/plain";
    response.write("Hello, World!");
    response.end();
    return;
  }

  response.statusCode = 500;
  response.header = "Content-Type: text/plain";
  response.write("{}");
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
