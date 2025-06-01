var myLibrary;

if(JSON.parse(localStorage.getItem("myLibrary")) == null){
    myLibrary = []
}
else{
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
}

loadBooks()

function Book(title, author, pages, read, currently, image) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.currently = currently
    this.image = image
    this.id = crypto.randomUUID()
}

function addBookToLibrary() {
    let title = document.querySelector(".title-input").value
    let author = document.querySelector(".author-input").value
    let pages = document.querySelector(".pages-input").value
    let read = document.querySelector("input[name='read']:checked").value
    let image = document.querySelector(".image-input").files[0]

    let newBook = new Book(title, author, pages, read, image)
    myLibrary.push(newBook)

    let myLibrarySerialized = JSON.stringify(myLibrary)

    localStorage.setItem("myLibrary", myLibrarySerialized)
}

function loadBooks() {

    myLibrary.forEach((item) => {
        let title = item["title"]
        let author = item["author"]
        let pages = item["pages"]
        let read = item["read"]
        let currently = item["currently"]
        let image = item["image"]

        let booksDiv = document.querySelector(".books")

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

const body = document.querySelector("body")
const newBookButton = document.querySelector(".new-book")
const landingRight = document.querySelector(".landing-right")

// create a form container
let form = document.createElement("form")

// creating all the input field with this structure --> div --> label, input
// the label and input gets added to the div and the div gets added to the form

// title input
let titleContainer = document.createElement("div")
titleContainer.className = "title-container"
let titleLabel = document.createElement("label")
titleLabel.textContent = "Title"
titleLabel.htmlFor = "title"
let titleInput = document.createElement("input")
titleInput.id = "title"
titleInput.className = "title-input"

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

pagesContainer.appendChild(pagesLabel)
pagesContainer.appendChild(pagesInput)


// read input
let readContainer = document.createElement("div")
readContainer.className = "read-container"

let readLabelYes = document.createElement("label")
readLabelYes.textContent = "Yes"
readLabelYes.htmlFor = "yes"
let readLabelNo = document.createElement("label")
readLabelNo.textContent = "No"
readLabelNo.htmlFor = "no"

let readInputYes = document.createElement("input")
readInputYes.id = "yes"
readInputYes.type = "radio"
readInputYes.name = "read"
readInputYes.value = "yes"
let readInputNo = document.createElement("input")
readInputNo.id = "no"
readInputNo.type = "radio"
readInputNo.name = "read"
readInputNo.value = "no"

readContainer.appendChild(readLabelYes)
readContainer.appendChild(readLabelNo)
readContainer.appendChild(readInputYes)
readContainer.appendChild(readInputNo)


// currently input
let currentlyContainer = document.createElement("div")
currentlyContainer.className = "currently-container"

let currentlyLabelYes = document.createElement("label")
currentlyLabelYes.textContent = "Yes"
currentlyLabelYes.htmlFor = "yes"
let currentlyLabelNo = document.createElement("label")
currentlyLabelNo.textContent = "No"
currentlyLabelNo.htmlFor = "no"

let currentlyInputYes = document.createElement("input")
currentlyInputYes.id = "yes"
currentlyInputYes.type = "radio"
currentlyInputYes.name = "currently"
currentlyInputYes.value = "yes"
let currentlyInputNo = document.createElement("input")
currentlyInputNo.id = "no"
currentlyInputNo.type = "radio"
currentlyInputNo.name = "currently"
currentlyInputNo.value = "no"

currentlyContainer.appendChild(currentlyLabelYes)
currentlyContainer.appendChild(currentlyLabelNo)
currentlyContainer.appendChild(currentlyInputYes)
currentlyContainer.appendChild(currentlyInputNo)


// image upload
let imageContainer = document.createElement("div")
imageContainer.className = "image-container"
let imageLabel = document.createElement("label")
imageLabel.htmlFor = "img-upload"
imageLabel.textContent = "Upload Image"
let imageInput = document.createElement("input")
imageInput.id = "img-upload"
imageInput.type = "file"
imageInput.accept = "image/png, image/jpeg"
imageInput.className = "image-input"

imageContainer.appendChild(imageLabel)
imageContainer.appendChild(imageInput)


// submit
let submitContainer = document.createElement("div")
submitContainer.className = "submit"
let submit = document.createElement("input")
submit.type = "submit"

submitContainer.appendChild(submit)


// append everything to the form
form.appendChild(titleContainer)
form.appendChild(authorContainer)
form.appendChild(pagesContainer)
form.appendChild(readContainer)
form.appendChild(currentlyContainer)
form.appendChild(imageContainer)
form.appendChild(submitContainer)

// new button clicked --> input form --> add Book
newBookButton.addEventListener("click", () => {
    landingRight.appendChild(form)
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault()
        addBookToLibrary()
        loadBooks()
        landingRight.removeChild(form)
        form.reset()
    })
})