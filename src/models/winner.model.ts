import Car from './car.model';

export default class Winner extends Car {
  constructor(
    public name: string,
    public id: number,
    color: string,
    public time: number,
    public wins: number,
  ) {
    super(name, color, id);
  }
}
