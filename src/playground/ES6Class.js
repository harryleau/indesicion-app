// old syntax to define constructor and methods, use bind() to keep the context of 'this' keyword
class Old {
  constructor() {
    this.name = 'harry';
    this.getGreeting = this.getGreeting.bind(this);
  }
  getGreeting() {
    return `Hi, my name is ${this.name}`;
  }
}

const old = new Old();
const getGreeting = old.getGreeting;
console.log(getGreeting());

// new syntax, no need to bind methods as 'this' context is maintained
class New {
  name = 'amy';
  getGreeting = () => {
    return `Hi, my name is ${this.name}`;
  }
}

const newClass = new New();
const newGetGreeting = newClass.getGreeting;
console.log(newGetGreeting());