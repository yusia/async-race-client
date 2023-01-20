import { Car } from '../models/car.model';

export default class CarService {

  generateRandomCars(count: number = 100): Car[] {
    let cars = new Array<Car>(count).fill(this.randomCar());
    return cars.map((car) => this.randomCar());
  }

  private randomCar(): Car {
    const brands = ['Tesla', 'BMW', 'Ferrari', 'Ford', 'Porsche', 'Volkswagen', 'Honda', 'Volvo', 'Kia', 'Lexus', 'Mercedes', 'Nissan'];
    const models = ['Polo', 'X5', '311', 'Passat', 'Alpina', 'Fiesta', 'Model Y', 'General', 'Favorit', 'Lotus', 'Sierra', 'Sedan'];

    const randomBrand=brands[Math.floor(Math.random() * brands.length)];
    const randomModel=models[Math.floor(Math.random() * models.length)];
    return new Car(`${randomBrand} ${randomModel}`, this.getRandomColor());
  }

  private getRandomColor() {
    var hexSymbols = '0123456789ABCDEF';
    var randomColor = '';
    for (var i = 0; i < 6; i++) {
      randomColor += hexSymbols[Math.floor(Math.random() * 16)];
    }
    return `#${randomColor}`;
  }
}