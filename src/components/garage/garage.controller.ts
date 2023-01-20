import { Car } from "../../models/car.model";
import { DataService } from "../../services/data.service";
import CarService from "../../services/car.service";
import GarageView from "./garage.view";

export default class GarageController {
  view: GarageView;
  selectCar: number | undefined;
  constructor(private dataService: DataService, private carService: CarService) {
    this.view = new GarageView();
    this.selectCar = 2;
    this.addCreatedListener();
    this.addSelectedListener();
    this.addUpdatedListener();
    this.addRemovedListener();
    this.addGenerateListener();
  }

  private addGenerateListener() {
    window.addEventListener('generateclicked', ((e: CustomEvent) => {
      const randomCars=this.carService.generateRandomCars();
      this.dataService.createCarsBanch(randomCars).then(() => {
        this.renderView();
      });
    }) as EventListener);
  }
  private addCreatedListener() {
    window.addEventListener('carcreated', ((e: CustomEvent) => {
      this.dataService.createCar(e.detail.name, e.detail.color).then(() => {
        this.renderView();
      });
    }) as EventListener);
  }

  private addSelectedListener() {
    window.addEventListener('carselected', ((e: CustomEvent) => {
      this.selectCar = e.detail.id;
    }) as EventListener);
  }

  private addUpdatedListener() {
    window.addEventListener('carupdated', ((e: CustomEvent) => {
      if (this.selectCar !== undefined) {
        this.dataService.updateCar(e.detail.name, e.detail.color, this.selectCar).then(() => {
          this.selectCar = undefined;
          this.renderView();
        });

      }
    }) as EventListener);
  }

  private addRemovedListener() {
    window.addEventListener('carremoved', ((e: CustomEvent) => {
      this.dataService.deleteCar(e.detail.id,).then(() => {
        this.renderView();
      });
    }) as EventListener);
  }

  async renderView() {
    const cars = await this.dataService.getGarage();
    console.log(cars);
    this.view.renderGarage(cars);
  }
}