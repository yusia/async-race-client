import { DataService } from "../../services/data.service";
import GarageController from '../garage/garage.controller';

export default class App {
  private dataService: DataService;
  garage: GarageController;
  constructor() {
    const url = 'http://localhost:3000';
    this.dataService = new DataService(url);
    this.garage= new GarageController();
  }

  async render() {
    //const cars = await this.dataService.getGarage();
  }
}