class Person {
  private name: string;
  private email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

class Member extends Person {
  //check catalog
  //borrow a book
  //reserve a book
  //extend book reservation
  //return a book
}

export class Librarian extends Person {}
