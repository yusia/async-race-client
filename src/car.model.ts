export class Car {
  constructor(public name: string, public id: number, public color: string) { }
}

export class Winner extends Car {
  constructor(public name: string, public id: number, color: string, public time: number, public wins: number) {
    super(name, id, color);
  }
}