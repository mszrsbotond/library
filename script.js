var myLibrary;

if (JSON.parse(localStorage.getItem("myLibrary")) == null) {
    myLibrary = []
}
else {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
}


const body = document.querySelector("body")
const newBookButton = document.querySelector(".new-book")
const landingRight = document.querySelector(".landing-right")
let currentlyReadingBook = document.querySelector(".currently-reading-book")

let booksDiv = document.querySelector(".books")
// create a form container
let form = document.createElement("form")

loadBooks()
loadCovers()

function Book(title, author, pages, currStatus, pagesRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.currStatus = currStatus
    this.pagesRead = pagesRead
    this.id = crypto.randomUUID()
}

function addBookToLibrary() {
    let title = document.querySelector(".title-input").value
    let author = document.querySelector(".author-input").value
    let pages = document.querySelector(".pages-input").value
    let reading = document.getElementById("reading")
    let read = document.getElementById("read")
    let planned = document.getElementById("planned")



    if (reading.checked) {
        currStatus = "reading"
    }
    else if (read.checked) {
        currStatus = "read"
    }
    else {
        currStatus = "planned"
    }

    let pagesReadInput = document.querySelector(".pages-read-input")
    var pagesRead;

    if (pagesReadInput == null) {
        if (currStatus == "read") {
            pagesRead = pages
        }
        else {
            pagesRead = 0
        }
    }
    else {
        pagesRead = pagesReadInput.value
    }




    let newBook = new Book(title, author, pages, currStatus, pagesRead)
    myLibrary.push(newBook)

    let myLibrarySerialized = JSON.stringify(myLibrary)

    localStorage.setItem("myLibrary", myLibrarySerialized)
}



function loadBooks() {

    booksDiv.innerHTML = ""
    currentlyReadingBook.innerHTML = ""

    myLibrary.forEach((item) => {
        let title = item["title"]
        let author = item["author"]
        let currStatus = item["currStatus"]
        let pages = item["pages"]
        let pagesRead = item["pagesRead"]



        let bookDiv = document.createElement("div")
        bookDiv.classList.add("book")

        let bookImg = document.createElement("img")
        bookImg.src = "book.png"

        let bookTextDiv = document.createElement("div")
        bookTextDiv.classList.add("book-text")

        let bookTitle = document.createElement("p")
        bookTitle.classList.add("title")
        bookTitle.textContent = title

        let bookAuthor = document.createElement("p")
        bookAuthor.classList.add("author")
        bookAuthor.textContent = author

        let pagesContainer = document.createElement("div")
        pagesContainer.classList.add("pages")

        let per = document.createElement("p")
        per.classList.add("per")
        per.textContent = "/"

        let pagesReadContainer = document.createElement("p")
        pagesReadContainer.classList.add("pages-read")
        pagesReadContainer.textContent = pagesRead

        let pagesTotalContainer = document.createElement("p")
        pagesTotalContainer.classList.add("pages-total")
        pagesTotalContainer.textContent = pages

        let plusButton = document.createElement("button")
        plusButton.textContent = "+"
        plusButton.classList.add("plus-button")

        let minusButton = document.createElement("button")
        minusButton.textContent = "-"
        minusButton.classList.add("minus-button")

        pagesContainer.appendChild(minusButton)
        pagesContainer.appendChild(pagesReadContainer)
        pagesContainer.appendChild(per)
        pagesContainer.appendChild(pagesTotalContainer)
        pagesContainer.appendChild(plusButton)


        let deleteButton = document.createElement("button")
        deleteButton.classList.add("delete")
        let deleteButtonImg = document.createElement("img")
        deleteButtonImg.src = "delete.svg"

        deleteButton.appendChild(deleteButtonImg)

        bookTextDiv.appendChild(bookTitle)
        bookTextDiv.appendChild(bookAuthor)
        bookTextDiv.appendChild(pagesContainer)
        bookTextDiv.appendChild(deleteButton)

        bookDiv.appendChild(bookImg)
        bookDiv.appendChild(bookTextDiv)

        booksDiv.appendChild(bookDiv)
        if (currStatus == "reading") {
            currentlyReadingBook.appendChild(bookDiv)
        }

        loadCovers()
    })
}

function loadCovers() {
    let bookCovers = document.querySelectorAll(".currently-reading-book > .book > .book-text")
    bookCovers.forEach((cover) => {
        let pagesRead = parseInt(cover.querySelector(".pages-read").textContent)
        let pagesTotal = parseInt(cover.querySelector(".pages-total").textContent)
        let coverPercentage = (pagesRead / pagesTotal) * 95
        cover.style.setProperty('--fill-height', `${coverPercentage}%`)
    })
}


// creating all the input field with this structure --> div --> label, input
// the label and input gets added to the div and the div gets added to the form

// input-fields
let inputFields = document.createElement("div")
inputFields.classList.add("input-fields")


// close
let closeForm = document.createElement("button")
closeForm.classList.add("close")
let closeFormImg = document.createElement("img")
closeFormImg.src = "close.svg"

closeForm.appendChild(closeFormImg)

// title input
let titleContainer = document.createElement("div")
titleContainer.className = "title-container"
let titleLabel = document.createElement("label")
titleLabel.textContent = "Title"
titleLabel.htmlFor = "title"
let titleInput = document.createElement("input")
titleInput.id = "title"
titleInput.className = "title-input"
titleInput.required = true

titleContainer.appendChild(titleLabel)
titleContainer.appendChild(titleInput)


// author input
let authorContainer = document.createElement("div")
authorContainer.className = "author-container"
let authorLabel = document.createElement("label")
authorLabel.textContent = "Author"
authorLabel.htmlFor = "author"
let authorInput = document.createElement("input")
authorInput.id = "author"
authorInput.className = "author-input"
authorInput.required = true

authorContainer.appendChild(authorLabel)
authorContainer.appendChild(authorInput)


// pages input
let pagesContainer = document.createElement("div")
pagesContainer.className = "pages-container"
let pagesLabel = document.createElement("label")
pagesLabel.textContent = "Pages"
pagesLabel.htmlFor = "pages"
let pagesInput = document.createElement("input")
pagesInput.id = "pages"
pagesInput.type = "number"
pagesInput.className = "pages-input"
pagesInput.required = true

pagesContainer.appendChild(pagesLabel)
pagesContainer.appendChild(pagesInput)

// stats
// currently reading / planned / read

let statusDiv = document.createElement("div")
statusDiv.classList.add("status")

let statusTitle = document.createElement("h3")
statusTitle.textContent = "Status"

let statusButtons = document.createElement("div")
statusButtons.classList.add("status-buttons")

// reading
let readingButtonInput = document.createElement("input")
readingButtonInput.type = "radio"
readingButtonInput.name = "status"
readingButtonInput.id = "reading"
readingButtonInput.required = true

let readingButtonLabel = document.createElement("label")
readingButtonLabel.htmlFor = "reading"
readingButtonLabel.textContent = "Reading"

// planned
let plannedButtonInput = document.createElement("input")
plannedButtonInput.type = "radio"
plannedButtonInput.name = "status"
plannedButtonInput.id = "planned"

let plannedButtonLabel = document.createElement("label")
plannedButtonLabel.htmlFor = "planned"
plannedButtonLabel.textContent = "Planned"

// read
let readButtonInput = document.createElement("input")
readButtonInput.type = "radio"
readButtonInput.name = "status"
readButtonInput.id = "read"

let readButtonLabel = document.createElement("label")
readButtonLabel.htmlFor = "read"
readButtonLabel.textContent = " Read"


statusButtons.appendChild(readingButtonInput)
statusButtons.appendChild(readingButtonLabel)
statusButtons.appendChild(readButtonInput)
statusButtons.appendChild(readButtonLabel)
statusButtons.appendChild(plannedButtonInput)
statusButtons.appendChild(plannedButtonLabel)


statusDiv.appendChild(statusTitle)
statusDiv.appendChild(statusButtons)


// pages read
let pagesReadContainer = document.createElement("div")
pagesReadContainer.className = "pages-read-container"
let pagesReadLabel = document.createElement("label")
pagesReadLabel.textContent = "Pages Read"
pagesReadLabel.htmlFor = "pages-read"
let pagesReadInput = document.createElement("input")
pagesReadInput.id = "pages-read"
pagesReadInput.type = "number"
pagesReadInput.className = "pages-read-input"
pagesReadInput.required = true

pagesReadContainer.appendChild(pagesReadLabel)
pagesReadContainer.appendChild(pagesReadInput)


// submit
let submitContainer = document.createElement("div")
submitContainer.className = "submit"
let submit = document.createElement("input")
submit.type = "submit"
submit.value = "Add Book"

submitContainer.appendChild(submit)


// append everything to the inputfield
inputFields.appendChild(closeForm)
inputFields.appendChild(titleContainer)
inputFields.appendChild(authorContainer)
inputFields.appendChild(pagesContainer)
inputFields.appendChild(statusDiv)

// append to form
form.appendChild(inputFields)
form.appendChild(submitContainer)

// new button clicked --> input form --> add Book
newBookButton.addEventListener("click", () => {
    landingRight.innerHTML = ""
    landingRight.appendChild(form)
    const formElements = document.querySelectorAll("form > div")
    formElements.forEach(formElement => {
        formElement.addEventListener("input", () => {
            let reading = document.getElementById("reading")

            if (reading.checked) {
                if (!inputFields.contains(pagesReadContainer)) {
                    inputFields.appendChild(pagesReadContainer)
                }
            }
            else {
                if (inputFields.contains(pagesReadContainer)) {
                    inputFields.removeChild(pagesReadContainer)
                }
            }

            if (form.checkValidity()) {
                submit.style["background-color"] = "rgba(51, 35, 132, 1)"
                submit.style["color"] = "white"
                submit.classList.add("submit-hover")
                submit.classList.add("submit-active")
            }
            else {
                submit.style["background-color"] = "rgba(201, 201, 201, 0.1)"
                submit.style["color"] = "rgba(70, 70, 70, 0.3)"
                submit.classList.remove("submit-hover")
                submit.classList.remove("submit-active")
            }

        })
    })
    loadCovers()
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault()
        location.reload()
        addBookToLibrary()
        loadBooks()
        landingRight.removeChild(form)
        form.reset()
        landingRight.appendChild(currentlyReadingBook)
    })

    document.querySelector(".close").addEventListener("click", () => {
        landingRight.removeChild(form)
        form.reset()
        landingRight.appendChild(currentlyReadingBook)
    })
})

document.querySelectorAll(".minus-button").forEach((minusButton) => {
    minusButton.addEventListener("click", (event) => {
        let currentBook = event.currentTarget.closest(".book-text")
        let num = currentBook.querySelector(".pages-read").textContent
        let numInt = parseInt(num) - 1
        event.currentTarget.closest(".book-text").querySelector(".pages-read").textContent = numInt
        currentTitle = currentBook.querySelector(".title").textContent
        let pagesRead = parseInt(currentBook.querySelector(".pages-read").textContent)
        let pagesTotal = parseInt(currentBook.querySelector(".pages-total").textContent)
        let coverPercentage = (pagesRead / pagesTotal) * 95
        currentBook.style.setProperty('--fill-height', `${coverPercentage}%`)
        myLibrary.forEach((book) => {
            if (book["title"] == currentTitle) {
                book["pagesRead"] = numInt
                if (numInt > 0) {
                    book["currStatus"] = "reading"
                }
                else if (numInt == 0) {
                    book["currStatus"] = "planned"
                }
                else if (numInt == parseInt(book["pages"])) {
                    book["currStatus"] = "read"
                }
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            }
        })
    })
})

document.querySelectorAll(".plus-button").forEach((plusButton) => {
    plusButton.addEventListener("click", (event) => {
        let currentBook = event.currentTarget.closest(".book-text")
        let num = currentBook.querySelector(".pages-read").textContent
        let numInt = parseInt(num) + 1
        event.currentTarget.closest(".book-text").querySelector(".pages-read").textContent = numInt
        currentTitle = currentBook.querySelector(".title").textContent
        let pagesRead = parseInt(currentBook.querySelector(".pages-read").textContent)
        let pagesTotal = parseInt(currentBook.querySelector(".pages-total").textContent)
        let coverPercentage = (pagesRead / pagesTotal) * 95
        currentBook.style.setProperty('--fill-height', `${coverPercentage}%`)
        myLibrary.forEach((book) => {
            if (book["title"] == currentTitle) {
                book["pagesRead"] = numInt
                if (numInt > 0) {
                    book["currStatus"] = "reading"
                }
                else if (numInt == 0) {
                    book["currStatus"] = "planned"
                }
                else if (numInt == parseInt(book["pages"])) {
                    book["currStatus"] = "read"
                }
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            }
        })
    })
})

document.querySelectorAll(".delete").forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
        let TitleToDelete = event.currentTarget.closest(".book-text").querySelector(".title").textContent
        let index = myLibrary.findIndex(book => book.title == TitleToDelete)

        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
        loadBooks()
        location.reload()
    })
})