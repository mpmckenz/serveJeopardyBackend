const categories = require("./categories");
const express = require("express");
const server = express();
const port = 3001;
server.use(express.json());
server.use(express.static("public"));

server.get("/api/category/:id", (request, response) => {
  const requestedCategory = categories.find(
    category => category.id == request.params.id
  );
  response.send(requestedCategory);
});

server.listen(port, () => console.log("It worked"));
