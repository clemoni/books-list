//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
// set of prototype method related to UI (add, book, delete book)
function UI() {}
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

  console.log(book);
  e.preventDefault();
});
