"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Book_1 = require("./Book");
var Library = /** @class */ (function () {
    function Library() {
        this.librarian = null;
        this.books = [];
    }
    Library.prototype.setLibrarian = function (librarian) {
        this.librarian = librarian;
    };
    Library.prototype.addBook = function (title, author, numCopies) {
        if (numCopies === undefined)
            numCopies = 1;
        var book = new Book_1.Book(title, author, numCopies);
        this.books.push(book);
        console.log("Added book to library");
    };
    Library.prototype.displayCatalog = function () {
        this.books.forEach(function (book) { return book.listCopies(); });
    };
    Library.prototype.loanBook = function (title) {
        var book = this.books.find(function (book) { return book.getTitle() === title; });
        if (book === undefined) {
            console.log("No such book in the library");
            return;
        }
        var bookItem = book.loan();
        if (bookItem === undefined) {
            console.log("No copies available to loan at the moment");
            return;
        }
        return bookItem;
    };
    return Library;
}());
exports.default = Library;
