class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book) {
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
  }

  duplicateBook(book) {
    const bookListTR = document.querySelectorAll("#books-list tr");
    bookListTR.forEach(function (tr) {
      if (book.isbn === tr.lastElementChild.previousElementSibling.innerText) {
        confirm(`Add duplicate isbn ${book.isbn} to the list?`);
      }
    });
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className == "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBook() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI();
      //add book
      ui.addBook(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (ref, index) {
      if (ref.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM EVENT
document.addEventListener("DOMContentLoaded", Store.displayBook);

document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value,
    ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please ensure to answer all fields", "error");
  } else {
    const book = new Book(title, author, isbn);

    ui.duplicateBook(book);

    ui.addBook(book);

    Store.addBook(book);

    ui.showAlert(`${book.title} added to the list.`, "success");

    ui.clearFields();
    e.preventDefault();
  }
});

const booksList = document.getElementById("books-list");

booksList.addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  e.preventDefault();
});
booksList.addEventListener("mouseover", function (e) {
  if (e.target.parentElement.tagName.toLowerCase() == "tr") {
    e.target.parentElement.style.backgroundColor = "rgba(48, 34, 38, 0.1)";
  }
});
booksList.addEventListener("mouseout", function (e) {
  if (e.target.parentElement.tagName.toLowerCase() == "tr") {
    e.target.parentElement.style.backgroundColor = "white";
  }
});
