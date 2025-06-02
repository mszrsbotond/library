var myLibrary;

if (JSON.parse(localStorage.getItem("myLibrary")) == null) {
    myLibrary = []
}
else {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
}

console.log(myLibrary)


const body = document.querySelector("body")
const newBookButton = document.querySelector(".new-book")
const landingRight = document.querySelector(".landing-right")
let booksDiv = document.querySelector(".books")
// create a form container
let form = document.createElement("form")

loadBooks()

function Book(title, author, pages, currStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.currStatus = currStatus
    this.id = crypto.randomUUID()
}

function addBookToLibrary() {
    let title = document.querySelector(".title-input").value
    let author = document.querySelector(".author-input").value
    let pages = document.querySelector(".pages-input").value

    let reading = document.getElementById("reading")
    let read = document.getElementById("read")
    let planned = document.getElementById("planned")

    if(reading.checked){
        currStatus = "reading"
    }
    else if(read.checked){
        currStatus = "read"
    }
    else{
        currStatus = "planned"
    }

    let newBook = new Book(title, author, pages, currStatus)
    myLibrary.push(newBook)

    let myLibrarySerialized = JSON.stringify(myLibrary)

    localStorage.setItem("myLibrary", myLibrarySerialized)
}

function loadBooks() {

    booksDiv.innerHTML = ""

    myLibrary.forEach((item) => {
        let title = item["title"]
        let author = item["author"]
        let pages = item["pages"]
        let read = item["read"]
        let currently = item["currently"]


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

        bookTextDiv.appendChild(bookTitle)
        bookTextDiv.appendChild(bookAuthor)


        bookDiv.appendChild(bookImg)
        bookDiv.appendChild(bookTextDiv)

        booksDiv.appendChild(bookDiv)
    })
}



// creating all the input field with this structure --> div --> label, input
// the label and input gets added to the div and the div gets added to the form

let closeForm = document.createElement("button")
closeForm.textContent = "X"
closeForm.classList.add("close")

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

// submit
let submitContainer = document.createElement("div")
submitContainer.className = "submit"
let submit = document.createElement("input")
submit.type = "submit"
submit.value = "Add Book"

submitContainer.appendChild(submit)


// append everything to the form
form.appendChild(closeForm)
form.appendChild(titleContainer)
form.appendChild(authorContainer)
form.appendChild(pagesContainer)
form.appendChild(statusDiv)
form.appendChild(submitContainer)

// new button clicked --> input form --> add Book
newBookButton.addEventListener("click", () => {
    landingRight.innerHTML = ""
    landingRight.appendChild(form)
    const formElements = document.querySelectorAll("form > div")
    formElements.forEach(formElement => {
        formElement.addEventListener("input", () => {
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
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault()
        addBookToLibrary()
        loadBooks()
        landingRight.removeChild(form)
        form.reset()
    })

    document.querySelector(".close").addEventListener("click", () => {
        landingRight.removeChild(form)
        form.reset()
    })
})