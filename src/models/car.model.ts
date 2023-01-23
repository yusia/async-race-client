export class Car {
  constructor(public name: string, public color: string, public id?: number) { }
}

export class Winner extends Car {
  constructor(public name: string, public id: number, color: string, public time: number, public wins: number) {
    super(name, color, id);
  }
}

export class CarModel extends Car {
  constructor(public name: string, public color: string, public id?: number) {
    super(name, color, id);
  }
  async start(): Promise<Response> {
    return new Promise<Response> (()=>"");
  }
}