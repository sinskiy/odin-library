const savedLibrary = localStorage.library;
const library = savedLibrary ? JSON.parse(savedLibrary) : [];
const books = document.querySelector("#books");

handleLibraryChange();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  library.push(book);
  handleLibraryChange();
}
function deleteBookByIndex(index) {
  library.splice(index, 1);
  handleLibraryChange();
}
function toggleBookStateByIndex(index) {
  library[index].read = !library[index].read;
  handleLibraryChange();
}
function handleLibraryChange() {
  if (library.length === 0) {
    createInitialLibrary();
  }

  localStorage.library = JSON.stringify(library);
  updateBooks();
}

function updateBooks() {
  // delete all children
  books.innerHTML = "";

  for (const i in library) {
    const bookElement = document.createElement("article");
    bookElement.classList.add("card");

    const contentElement = document.createElement("div");
    contentElement.classList.add("card-content");

    const index = Number(i);
    const book = library[index];

    const titleElement = document.createElement("h2");
    titleElement.classList.add("title");
    titleElement.innerText = book.title;

    const authorElement = document.createElement("span");
    authorElement.classList.add("author");
    authorElement.innerText = `by ${book.author}`;

    const pagesElement = document.createElement("small");
    pagesElement.classList.add("pages");
    pagesElement.innerText = `${book.pages} ${
      book.pages === 1 ? "page" : "pages"
    }`;

    contentElement.append(titleElement, authorElement, pagesElement);

    const actionsElement = document.createElement("div");
    actionsElement.classList.add("card-actions");

    const deleteElement = document.createElement("button");
    deleteElement.addEventListener("click", () => deleteBookByIndex(index));
    deleteElement.classList.add("secondary");
    deleteElement.innerText = "delete";

    const stateElement = document.createElement("button");
    stateElement.addEventListener("click", () => toggleBookStateByIndex(index));
    stateElement.innerText = `${book.read ? "read" : "not read"}`;

    actionsElement.append(deleteElement, stateElement);

    bookElement.append(contentElement, actionsElement);
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

  const newBook = new Book(
    title.value,
    author.value,
    Number(pages.value),
    false
  );
  addBookToLibrary(newBook);

  handleDialogClose();
}
function handleDialogClose() {
  title.value = author.value = pages.value = "";

  dialog.close();
}

const newBookForm = dialog.querySelector("form");
newBookForm.addEventListener("submit", handleNewBookSubmit);

const title = newBookForm.querySelector("#title");
const author = newBookForm.querySelector("#author");
const pages = newBookForm.querySelector("#pages");

function createInitialLibrary() {
  const atlasShrugged = new Book("Atlas Shrugged", "Ayn Rand", 1168, false);
  const fahrenheit = new Book("Fahrenheit 451", "Ray Bradbury", 156, true);
  addBookToLibrary(atlasShrugged);
  addBookToLibrary(fahrenheit);
}
