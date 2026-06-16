import { Librarian } from "./Persons";
import { Book, BookItem } from "./Book";

export default class Library {
  private librarian: Librarian | null;
  private books: Book[];

  constructor() {
    this.librarian = null;
    this.books = [];
  }

  setLibrarian(librarian: Librarian): void {
    this.librarian = librarian;
  }

  addBook(title: string, author: string, numCopies?: number): void {
    if (numCopies === undefined) numCopies = 1;
    const book = new Book(title, author, numCopies);
    this.books.push(book);
    console.log("Added book to library");
  }

  displayCatalog(): void {
    this.books.forEach((book) => book.listCopies());
  }

  loanBook(title: string): BookItem | undefined {
    const book = this.books.find((book) => book.getTitle() === title);
    if (book === undefined) {
      console.log("No such book in the library");
      return;
    }

    const bookItem = book.loan();
    if (bookItem === undefined) {
      console.log("No copies available to loan at the moment");
      return;
    }

    return bookItem;
  }
}
