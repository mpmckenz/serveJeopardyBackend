const axios = require("axios")
const fs = require("fs")

module.exports = function (categoryIDS, categoriesFilePath)  {

const categoryResponsePromises = categoryIDS.map(
    id => axios.get("http://jservice.io/api/category" + id)
)

Promise.all(categoryResponsePromises)
    .then(categoriesResponses => {
        const categories = categoriesResponses.map(res => res.data)
        fs.writeFileSync(categoriesFilePath, JSON.stringify(categories))
    })
}