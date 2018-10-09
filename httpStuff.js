// const downloadCategoriesFromJservice = require("/jservice-client.js")
// const categoriesIDS = [777, 136, 780, 21, 105, 25]
// downloadCategoriesFromJservice(categoriesIDS, categoriesFilePath)

const express = require("express")
const server = express()
const categories = ("./categories")
const port = 3000

server.use(express.json())
server.use(express.static("public"))

server.get("/api/category/:id", (request, response) => {
    const requestedCategory = categories.find(category => category.id == request.params.id)
        response.send(requestedCategory)
    })
        
    server.listen(port, () => console.log("I did it! I am god"))