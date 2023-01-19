import { Car, Winner } from '../car.model'
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

  async createCar(name: string, color: string) {
    return fetch(`${this.url}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ name, color })
    });
  }

  async updateCar(name: string, color: string, id: number) {
    return fetch(`${this.url}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ name, color})
    });
  }

  mapToWinnersModel(data: Winner[], cars: Car[]): Winner[] {
    data.map((winner) => {
      const carName = cars.filter(c => c.id === winner.id)[0].name;
      return winner.name = carName;
    })
    return data;
  }
}
