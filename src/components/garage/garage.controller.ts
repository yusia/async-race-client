import { DataService } from "../../services/data.service";
import GarageView from "./garage.view";

export default class GarageController {
  view: GarageView;
  constructor(private dataService: DataService) {
    this.view = new GarageView();
    window.addEventListener('carcreated', ((e: CustomEvent) => {
     this.dataService.createCar(e.detail.name,e.detail.color).then(()=>{
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