import DataService from "../../services/data.service";
import WinnersController from '../winners/winners.controller';
import GarageController from '../garage/garage.controller';
import CarService from "../../services/car.service";

export default class App {
  private dataService: DataService;
  private garage: GarageController;
  private winners: WinnersController;
  carService: CarService;
  constructor() {
    this.dataService = new DataService();
    this.carService = new CarService();
    this.garage = new GarageController(this.dataService, this.carService);
    this.winners = new WinnersController(this.dataService);
  }

  async render() {
    document.body.append(this.getAppElement());
    this.addChangeViewListeners();

    this.garage.renderView();
  }

  addChangeViewListeners() {
    const buttonGarage = document.getElementById('garage');
    buttonGarage?.addEventListener('click', () => {
      this.garage.renderView();
    });

    const winnersGarage = document.getElementById('winners');
    winnersGarage?.addEventListener('click', () => {
      this.winners.renderView();
    });
  }

  getAppElement(): HTMLElement {
    const markup = `
    <div class="buttons">
      <button id="garage">Garage</button>
      <button id="winners">Winners</button>
    </div>
    <div id="viewContainer"></div>`;

    const views = document.createElement('div');
    views.classList.add("container");
    views.innerHTML = markup;
    return views;
  }

}