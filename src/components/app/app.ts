import { DataService } from "../../services/data.service";
import WinnersController from '../winners/winners.controller';
import GarageController from '../garage/garage.controller';
import CarService from "../../services/car.service";

export default class App {
  private dataService: DataService;
  private garage: GarageController;
  private winners: WinnersController;
  carService: CarService;
  constructor() {
    const url = 'http://localhost:3000';
    this.dataService = new DataService(url);
    this.carService = new CarService();
    this.garage = new GarageController(this.dataService, this.carService);
    this.winners = new WinnersController(this.dataService);
  }

  async render() {
    const markup = `
    <div class="buttons">
      <button id="garage">Garage</button>
      <button id="winners">Winners</button>
    </div>
    <div id="viewContainer"></div>`;
    const views = document.createElement('div');
    views.classList.add("container");
    views.innerHTML = markup;
    const body = document.getElementById('bodyId') as HTMLBodyElement;
    body.append(views);

    this.garage.renderView();

    const buttonGarage = document.getElementById('garage');
    buttonGarage?.addEventListener('click', () => {
      this.garage.renderView();
    });

    const winnersGarage = document.getElementById('winners');
    winnersGarage?.addEventListener('click', () => {
      this.winners.renderView();
    });
  }

}