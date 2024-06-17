const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () =>
    `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

function handleFormSubmit(e) {
  e.preventDefault();

  dialog.showModal();
}

const dialog = document.querySelector(".new-book");
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", handleFormSubmit);
