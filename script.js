const savedLibrary = localStorage.library;
const library = savedLibrary ? JSON.parse(savedLibrary) : [];
const books = document.querySelector("#books");
library.length === 0 && createInitialLibrary();

updateBooks();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () =>
    `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
}

function addBookToLibrary(book) {
  library.push(book);
  localStorage.library = JSON.stringify(library);
  updateBooks();
}

function updateBooks() {
  // delete all children
  books.innerHTML = "";

  for (const book of library) {
    const bookElement = document.createElement("article");
    bookElement.classList.add("card");

    const contentElement = document.createElement("div");
    contentElement.classList.add("card-content");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("title");
    titleElement.innerText = book.title;

    const authorElement = document.createElement("span");
    authorElement.classList.add("author");
    authorElement.innerText = book.author;

    const pagesElement = document.createElement("small");
    pagesElement.classList.add("pages");
    pagesElement.innerText = `${book.pages} pages`;

    contentElement.append(titleElement, authorElement, pagesElement);
    bookElement.appendChild(contentElement);
    books.appendChild(bookElement);
  }
}

function handleOpenDialog(e) {
  e.preventDefault();

  dialog.showModal();
}
const dialog = document.querySelector(".new-book");
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", handleOpenDialog);

function handleNewBookSubmit(e) {
  e.preventDefault();

  const newBook = new Book(title.value, author.value, Number(pages.value));
  addBookToLibrary(newBook);

  title.value = author.value = pages.value = "";

  dialog.close();
}

const newBookForm = dialog.querySelector("form");
newBookForm.addEventListener("submit", handleNewBookSubmit);

const title = newBookForm.querySelector("#title");
const author = newBookForm.querySelector("#author");
const pages = newBookForm.querySelector("#pages");

function createInitialLibrary() {
  const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
  const fahrenheit = new Book("Fahrenheit 451", "I have no idea", 150, true);
  addBookToLibrary(theHobbit);
  addBookToLibrary(fahrenheit);
}
