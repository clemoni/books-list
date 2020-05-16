//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
// set of prototype method related to UI (add, book, delete book)
function UI() {}

//Add method to prototyp class UI
UI.prototype.addBook = function (book) {
  const bookList = document.getElementById("books-list");
  // create a tr element
  const row = document.createElement("tr");

  // inset col
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;

  bookList.appendChild(row);
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//show alert
UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  //add class
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  //get the parent
  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");

  //insert alert
  container.insertBefore(div, form);

  //   timeOut after 3second
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  if (target.className == "delete") {
    target.parentElement.parentElement.remove();
  }
};

// variable
const bookList = document.getElementById("books-list");

//Eventlistener
document.getElementById("book-form").addEventListener("submit", function (e) {
  // fetch value from form
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // instanciation of a book
  const book = new Book(title, author, isbn);

  // istanciation of a new ui
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    // show alert

    ui.showAlert("Please fill up al fields", "error");
  } else {
    // add book reference to the class UI to be added to table
    ui.addBook(book);

    // clear value of the fiels by calling method clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

bookList.addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Remove", "success");
  e.preventDefault();
});

bookList.addEventListener("mouseover", function (e) {
  if (e.target.parentElement.tagName.toLowerCase() == "tr") {
    e.target.parentElement.style.backgroundColor = "rgba(48, 34, 38, 0.1)";
  }
});
bookList.addEventListener("mouseout", function (e) {
  if (e.target.parentElement.tagName.toLowerCase() == "tr") {
    e.target.parentElement.style.backgroundColor = "white";
  }
});
