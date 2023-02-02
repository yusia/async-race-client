import Car from '../models/car.model';
import Winner from '../models/winner.model';
import EngineStatus from '../enums/engineStatus.enum';

export const url = 'http://localhost:3000';

export default class DataService {
  private url = url;

  async getGarage() {
    return fetch(`${this.url}/garage`)
      .then((value) => value.json());
  }

  async getWinners(): Promise<Winner[]> {
    const cars: Car[] = await this.getGarage();
    return fetch(`${this.url}/winners`)
      .then((value) => value.json())
      .then((data: Winner[]) => this.mapToWinnersModel(data, cars));
  }

  async createCar(name: string, color: string) {
    return fetch(`${this.url}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ name, color }),
    });
  }

  async createCarsBanch(cars: Car[]) {
    const requests = cars.map((car) => this.createCar(car.name, car.color));
    return Promise.all(requests);
  }

  async updateCar(name: string, color: string, id: number) {
    return fetch(`${this.url}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ name, color }),
    });
  }

  async deleteCar(id: number) {
    return Promise.all([this.deleteCarFromGarage(id), this.deleteWinner(id)]);
  }

  async deleteCarFromGarage(id: number) {
    return fetch(`${this.url}/garage/${id}`, {
      method: 'DELETE',
    });
  }

  async deleteWinner(id: number) {
    return fetch(`${this.url}/winners/${id}`, {
      method: 'DELETE',
    });
  }

  async startStopEngine(id: number, status: EngineStatus) {
    return fetch(`${this.url}/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
  }

  mapToWinnersModel(data: Winner[], cars: Car[]): Winner[] {
    data.map((winner: Winner) => {
      const car = cars.filter((c) => c.id === winner.id)[0];
      return new Winner(car.name, winner.id, car.color, winner.time, winner.wins);
    });
    return data;
  }
}
