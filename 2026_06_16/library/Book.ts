import { BookStatus } from "./constants";

export class BookItem {
  private id: number;
  private status: BookStatus;
  private daysLeft: number;

  constructor(id: number) {
    this.id = id;
    this.status = BookStatus.AVAILABLE;
    this.daysLeft = 0;
  }

  getId(): number {
    return this.id;
  }

  getStatus(): BookStatus {
    return this.status;
  }

  getDaysLeft(): number {
    return this.daysLeft;
  }

  isAvailable(): boolean {
    return this.status === BookStatus.AVAILABLE;
  }

  markLost(): void {
    this.status = BookStatus.LOST;
    console.log("Copy lost");
  }

  reserve(): void {
    if (this.status == BookStatus.LOANED || this.status == BookStatus.LOST) {
      console.log("can't reserve this book");
      return;
    }
    this.status = BookStatus.RESERVED;
    console.log("Copy reserved");
  }

  loan(): void {
    if (this.status == BookStatus.AVAILABLE) {
      this.status = BookStatus.LOANED;
      this.daysLeft = 10;
      console.log("Copy loaned");
    }
  }

  returnCopy(): void {
    if (
      this.status == BookStatus.LOANED ||
      this.status == BookStatus.RESERVED
    ) {
      this.status = BookStatus.AVAILABLE;
      this.daysLeft = 0;
      console.log("Copy returned");
    }
  }
}

export class Book {
  private title: string;
  private author: string;
  private copies: BookItem[];

  //to help number copy
  private static id: number = 1;

  constructor(title: string, author: string, numCopies: number) {
    this.title = title;
    this.author = author;
    this.copies = [];
    for (let i = 0; i < numCopies; i++) {
      this.copies.push(new BookItem(Book.id++));
    }
  }

  getTitle(): string {
    return this.title;
  }

  listCopies(): void {
    console.log(`${this.title} by ${this.author} : `);

    this.copies.forEach((copy) => {
      if (copy.getStatus() == BookStatus.AVAILABLE) {
        console.log(`COPY${copy.getId()} : AVAILABLE`);
      } else if (copy.getStatus() == BookStatus.LOANED) {
        console.log(
          `COPY${copy.getId()} : LOANED. Available in ${copy.getDaysLeft()}days`,
        );
      } else if (copy.getStatus() == BookStatus.RESERVED) {
        console.log(`COPY${copy.getId()} : RESERVED`);
      }
    });
  }

  numFreeCopies(): number {
    let result: number = 0;
    this.copies.forEach((cpy) => {
      if (cpy.isAvailable()) result++;
    });

    return result;
  }

  addCopy(): number {
    const bookItem = new BookItem(Book.id++);
    this.copies.push(bookItem);
    return bookItem.getId();
  }

  getFreeCopy(): BookItem | undefined {
    return this.copies.find((copy) => copy.isAvailable() === true);
  }

  loan(): BookItem | undefined {
    if (this.numFreeCopies() == 0) {
      console.log("No copies of this book can be loaned at the moment");
      return undefined;
    }

    const bookItem = this.getFreeCopy();
    if (bookItem === undefined) {
      console.log("No copies of this book can be loaned at the moment");
      return undefined;
    }

    bookItem.loan();
    return bookItem;
  }

  reserve(): BookItem | undefined {
    const bookItem = this.copies.find((copy) => {
      copy.getStatus() === BookStatus.LOANED;
    });

    if (bookItem === undefined) {
      return undefined;
    }

    bookItem.reserve();
    return bookItem;
  }

  returnCopy(id: number): void {
    const bookItem = this.copies.find((cpy) => cpy.getId() === id);
    if (bookItem === undefined) {
      console.log("No such copy exists");
      return;
    }

    bookItem.returnCopy();
  }
}
