export class Car {
  constructor(public name: string, public color: string, public id?: number) { }
}

export class Winner extends Car {
  constructor(public name: string, public id: number, color: string, public time: number, public wins: number) {
    super(name, color, id);
  }
}