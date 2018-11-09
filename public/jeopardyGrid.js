function displayClue() {
  console.log(event.target.cellInstance.answer);
  if (!event.target.classList.contains("cell")) return;
  let clueElement = document.getElementById("displayClickedClueFooter");
  clueElement.innerHTML = event.target.cellInstance.question;
}

function toggleColor() {
  event.target.style.background = "black";
}

function toggleClue() {
  event.target.removeEventListener("click", function() {
    displayClue();
    toggleColor();
  });
}

function resetBoard() {
  let newBoard = document.getElementById("jeopardyClues");
  newBoard.innerHTML = "";
  let blankClue = document.getElementById("displayClickedClueFooter");
  blankClue.innerHTML = "(Click on a Jeopardy cell)";
  const newJeopardyBoard = new JeopardyGrid({
    numberOfRows: 5,
    numberOfColumns: categories.length,
    parentContainerId: "jeopardyClues",
    categoryIDs: categories
  });
  return newJeopardyBoard;
}

class JeopardyGrid extends Grid {
  constructor(options) {
    super(options);
    this.categoryIDs = options.categoryIDs;
    this.getCategoryInfo(options.categoryIDs);
    this.selectClue();
    // this.toggleClue()
    // this.addEventListener()
    // this.submitAnswer()
  }

  addClueToCell(cell, clue) {
    cell.pointValue = clue.value;
    cell.question = clue.question;
    cell.answer = clue.answer;
    cell.cellElement.innerHTML = `$${cell.pointValue}`;
  }

  loopOverCategories(categories) {
    for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
      for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
        const cell = this.gridArray[rowIndex][colIndex];
        const category = categories[colIndex];
        const clue = category.clues[rowIndex];
        this.addClueToCell(cell, clue);
      }
    }
  }

  selectClue() {
    this.gridContainer.addEventListener("click", function() {
      displayClue();
      toggleColor();
      toggleClue();
    });
  }

  //     toggleClue() {
  //         this.gridContainer.addEventListener("click", function changeColor () {
  //             if (!event.target.classList.contains('cell')) return;
  //             event.target.style.background= "black";
  //     })
  // }

  async getCategoryInfo(categoryIDs) {
    const categoriesInfo = categoryIDs.map(categoryID => {
      return fetch("http://localhost:3001/api/category/" + categoryID).then(
        res => res.json()
      );
    });
    const categories = await Promise.all(categoriesInfo);

    this.loopOverCategories(categories);
  }
}

class JeopardyHeaderGrid extends JeopardyGrid {
  constructor(options) {
    super(options);
  }

  addCategoryToCell(cell, category) {
    cell.cellElement.innerHTML = category.title;
  }

  loopOverCategories(categories) {
    for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
      const cell = this.gridArray[0][colIndex];
      const category = categories[colIndex];
      this.addCategoryToCell(cell, category);
    }
  }
}

const categories = [777, 136, 780, 21, 105, 25];

const jeopardyGrid = new JeopardyHeaderGrid({
  numberOfRows: 1,
  numberOfColumns: categories.length,
  parentContainerId: "categoryTitle",
  categoryIDs: categories
});

const jeopardyClues = new JeopardyGrid({
  numberOfRows: 5,
  numberOfColumns: categories.length,
  parentContainerId: "jeopardyClues",
  categoryIDs: categories
});
// console.log(jeopardyClues)
// console.log(jeopardyClues)

// async fruitRandomClue() {
//     const fruitFetchHydrated = await fetch("http://jservice.io/api/category?id=777").then(fruitFetchHydrated => fruitFetchHydrated.json())
//     let categoryFruitTitle = fruitFetchHydrated.title

//     let categoryFruit = document.getElementById("0,0")
//     let fruitCategory = document.createTextNode(categoryFruitTitle)
//     categoryFruit.appendChild(fruitCategory)
// }

// function postToDOM(cellElementId) {
//     let categoryName = document.getElementById(cellElementId)
//     let categoryNode = document.createTextNode(categoryFruitTitle)
//     categoryName.appendChild(fruitCategory)
// }

// let categoryTitle = categoriesInfo.title
// let categoryElement = document.getElementById("categories")
// let categoryNode = document.createTextNode(categoryTitle)
// categoryElement.appendChild(categoryNode)
