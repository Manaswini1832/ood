"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BookItem = void 0;
var constants_1 = require("./constants");
var BookItem = /** @class */ (function () {
    function BookItem(id) {
        this.id = id;
        this.status = constants_1.BookStatus.AVAILABLE;
        this.daysLeft = 0;
    }
    BookItem.prototype.getId = function () {
        return this.id;
    };
    BookItem.prototype.getStatus = function () {
        return this.status;
    };
    BookItem.prototype.getDaysLeft = function () {
        return this.daysLeft;
    };
    BookItem.prototype.isAvailable = function () {
        return this.status === constants_1.BookStatus.AVAILABLE;
    };
    BookItem.prototype.markLost = function () {
        this.status = constants_1.BookStatus.LOST;
        console.log("Copy lost");
    };
    BookItem.prototype.reserve = function () {
        if (this.status == constants_1.BookStatus.LOANED || this.status == constants_1.BookStatus.LOST) {
            console.log("can't reserve this book");
            return;
        }
        this.status = constants_1.BookStatus.RESERVED;
        console.log("Copy reserved");
    };
    BookItem.prototype.loan = function () {
        if (this.status == constants_1.BookStatus.AVAILABLE) {
            this.status = constants_1.BookStatus.LOANED;
            this.daysLeft = 10;
            console.log("Copy loaned");
        }
    };
    BookItem.prototype.returnCopy = function () {
        if (this.status == constants_1.BookStatus.LOANED ||
            this.status == constants_1.BookStatus.RESERVED) {
            this.status = constants_1.BookStatus.AVAILABLE;
            this.daysLeft = 0;
            console.log("Copy returned");
        }
    };
    return BookItem;
}());
exports.BookItem = BookItem;
var Book = /** @class */ (function () {
    function Book(title, author, numCopies) {
        this.title = title;
        this.author = author;
        this.copies = [];
        for (var i = 0; i < numCopies; i++) {
            this.copies.push(new BookItem(Book.id++));
        }
    }
    Book.prototype.getTitle = function () {
        return this.title;
    };
    Book.prototype.listCopies = function () {
        console.log("".concat(this.title, " by ").concat(this.author, " : "));
        this.copies.forEach(function (copy) {
            if (copy.getStatus() == constants_1.BookStatus.AVAILABLE) {
                console.log("COPY".concat(copy.getId(), " : AVAILABLE"));
            }
            else if (copy.getStatus() == constants_1.BookStatus.LOANED) {
                console.log("COPY".concat(copy.getId(), " : LOANED. Available in ").concat(copy.getDaysLeft(), "days"));
            }
            else if (copy.getStatus() == constants_1.BookStatus.RESERVED) {
                console.log("COPY".concat(copy.getId(), " : RESERVED"));
            }
        });
    };
    Book.prototype.numFreeCopies = function () {
        var result = 0;
        this.copies.forEach(function (cpy) {
            if (cpy.isAvailable())
                result++;
        });
        return result;
    };
    Book.prototype.addCopy = function () {
        var bookItem = new BookItem(Book.id++);
        this.copies.push(bookItem);
        return bookItem.getId();
    };
    Book.prototype.getFreeCopy = function () {
        return this.copies.find(function (copy) { return copy.isAvailable() === true; });
    };
    Book.prototype.loan = function () {
        if (this.numFreeCopies() == 0) {
            console.log("No copies of this book can be loaned at the moment");
            return undefined;
        }
        var bookItem = this.getFreeCopy();
        if (bookItem === undefined) {
            console.log("No copies of this book can be loaned at the moment");
            return undefined;
        }
        bookItem.loan();
        return bookItem;
    };
    Book.prototype.reserve = function () {
        var bookItem = this.copies.find(function (copy) {
            copy.getStatus() === constants_1.BookStatus.LOANED;
        });
        if (bookItem === undefined) {
            return undefined;
        }
        bookItem.reserve();
        return bookItem;
    };
    Book.prototype.returnCopy = function (id) {
        var bookItem = this.copies.find(function (cpy) { return cpy.getId() === id; });
        if (bookItem === undefined) {
            console.log("No such copy exists");
            return;
        }
        bookItem.returnCopy();
    };
    //to help number copy
    Book.id = 1;
    return Book;
}());
exports.Book = Book;
