export class Car {
  constructor(public name: string, public id: number) { }
}

export class Winner extends Car {
  constructor(public name: string, public id: number, public time: number, public wins: number) {
    super(name, id);
  }
}