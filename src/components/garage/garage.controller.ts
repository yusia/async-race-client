import GarageView from "./garage.view";

export default class GarageController {
  view: GarageView;
  constructor() {
    this.view = new GarageView();
    this.view.render();
  }
}