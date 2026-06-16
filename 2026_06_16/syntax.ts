/*
- constructor keyword not the class name for it
- no need of function key word for methods
- access modifier - name - type
*/

class Mammal {
  protected name: string;

  constructor() {
    this.name = "mammal";
  }

  blink() {
    console.log(`${this.name} blinks`);
  }

  eat() {
    console.log(`${this.name} eats`);
  }
}

class Human extends Mammal {
  constructor() {
    super();
    this.name = "human";
  }
}

class Dog extends Mammal {
  constructor() {
    super();
    this.name = "dog";
  }
}

const d: Dog = new Dog();
d.blink();
d.eat();

const h: Human = new Human();
h.blink();
h.eat();

const m: Mammal = new Human();
m.blink(); //human blinks
m.eat(); //human eats
