const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = crypto.randomUUID()
}

function addBookToLibrary() {
}

const body = document.querySelector("body")
const newBookButton = document.querySelector(".new-book")

// create a form container
const form = document.createElement("div")
form.className = "form"

// creating all the input field with this structure --> div --> label, input
// the label and input gets added to the div and the div gets added to the form

// title input
const titleContainer = document.createElement("div")
titleContainer.className = "title-container"
const titleLabel = document.createElement("label")
titleLabel.textContent = "Title"
titleLabel.htmlFor = "title"
const titleInput = document.createElement("input")
titleInput.id = "title"

titleContainer.appendChild(titleLabel)
titleContainer.appendChild(titleInput)


// author input
const authorContainer = document.createElement("div")
authorContainer.className = "author-container"
const authorLabel = document.createElement("label")
authorLabel.textContent = "Author"
authorLabel.htmlFor = "author"
const authorInput = document.createElement("input")
authorInput.id = "author"

authorContainer.appendChild(authorLabel)
authorContainer.appendChild(authorInput)


// pages input
const pagesContainer = document.createElement("div")
pagesContainer.className = "pages-container"
const pagesLabel = document.createElement("label")
pagesLabel.textContent = "Pages"
pagesLabel.htmlFor = "pages"
const pagesInput = document.createElement("input")
pagesInput.id = "pages"

pagesContainer.appendChild(pagesLabel)
pagesContainer.appendChild(pagesInput)


// read input
const readContainer = document.createElement("div")
readContainer.className = "read-container"

const readLabelYes = document.createElement("label")
readLabelYes.textContent = "Yes"
readLabelYes.htmlFor = "yes"
const readLabelNo = document.createElement("label")
readLabelNo.textContent = "No"
readLabelNo.htmlFor = "no"

const readInputYes = document.createElement("input")
readInputYes.id = "yes"
readInputYes.type = "radio"
readInputYes.name = "read"
const readInputNo = document.createElement("input")
readInputNo.id = "no"
readInputNo.type = "radio"
readInputNo.name = "read"

readContainer.appendChild(readLabelYes)
readContainer.appendChild(readLabelNo)
readContainer.appendChild(readInputYes)
readContainer.appendChild(readInputNo)


// submit
const submitContainer = document.createElement("div")
submitContainer.className = "submit"
const submit = document.createElement("input")
submit.type = "submit"

submitContainer.appendChild(submit)


// append everything to the form
form.appendChild(titleContainer)
form.appendChild(authorContainer)
form.appendChild(pagesContainer)
form.appendChild(readContainer)
form.appendChild(submitContainer)

// new button clicked --> input form
newBookButton.addEventListener("click", () => {
    body.removeChild(newBookButton)
    body.appendChild(form)
})