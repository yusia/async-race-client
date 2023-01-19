import {Car,Winner} from '../car.model'
export class DataService {
  constructor(private url: string) {
  }

  async getGarage() {
    return fetch(`${this.url}/garage`).then((value) => value.json());
  }

  async getWinners() {
    const cars: Car[] = await this.getGarage();
    return fetch(`${this.url}/winners`)
      .then((value) => value.json())
      .then((data: Winner[]) => this.mapToWinnersModel(data, cars));

  }

  mapToWinnersModel(data: Winner[], cars: Car[]): Winner[] {
    data.map((winner) => {
      const carName= cars.filter(c => c.id === winner.id)[0].name;
      return winner.name = carName;
    })
    return data;
  }
}
