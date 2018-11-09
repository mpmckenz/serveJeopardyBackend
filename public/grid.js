class Grid {
    constructor(options) {
        this.gridArray = []
        this.numberOfRows = options.numberOfRows
        this.numberOfColumns = options.numberOfColumns
        this.gridContainer = document.getElementById(options.parentContainerId)
        this.createRows()
        this.createGridElement()
    }

    createGridElement() {
        this.element = document.createElement("div")
    }

    createRows() {
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.rowIndex = rowIndex
            this.rowArray = []
            this.gridArray.push(this.rowArray)
            this.rowElement = document.createElement("section")
            this.gridContainer.appendChild(this.rowElement)
            // this.rowElement.classList = rowIndex
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                const cell = new Cell(rowIndex, columnIndex, this.rowElement)
                this.rowArray.push(cell)
            }
        }
    }
}

class Cell {
    constructor(rowIndex, columnIndex, rowParent) {
        this.cellArray = []
        this.rowIndex = rowIndex
        this.columnIndex = columnIndex
        this.rowParent = rowParent
        this.createCell()
    }
    createCell() {
        this.cellElement = document.createElement("article")
        this.cellElement.cellInstance = this
        this.cellElement.dataset.rowIndex = this.rowIndex
        this.cellElement.classList.add('cell')
        // this.cellElement.onclick = onclick
        this.cellElement.dataset.columnIndex = this.columnIndex
        this.cellElement.id = `${this.columnIndex},${this.rowIndex}`
        this.rowParent.appendChild(this.cellElement)
    }
}

