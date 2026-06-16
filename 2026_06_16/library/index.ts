import Library from "./Library";
import { Librarian } from "./Persons";

const library: Library = new Library();

const librarian: Librarian = new Librarian("Manu", "manu@gmail.com");

library.setLibrarian(librarian);

library.addBook("God of Small Things", "Arundathi Roy", 5);
library.addBook("Midnight's Children", "Salman Rushdie", 2);
library.addBook("White Tiger", "Aravind Adiga");
library.displayCatalog();

library.loanBook("White Tiger");

library.displayCatalog();
