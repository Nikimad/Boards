import jsonServer from "json-server";

export const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(jsonServer.defaults());
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);
server.listen(3000);
