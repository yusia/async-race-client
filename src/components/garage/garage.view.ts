import { Car } from '../../car.model';
import CarBuilder from '../carbuilder/carbuilder.view';
import View from '../../models/view';

export default class GarageView extends View {

  renderGarage(cars: Car[]): void {
    const garageViewFragment = document.createDocumentFragment();
    const createBtn = CarBuilder.buildCreateTemplate("create", this.triggerEventCreate);
    const updateBtn = CarBuilder.buildCreateTemplate("update", this.triggerEventUpdate);
    garageViewFragment.appendChild(createBtn);
    garageViewFragment.appendChild(updateBtn);
    garageViewFragment.appendChild(this.buildCarList(cars));

    this.appendToBody(garageViewFragment);
  }


  triggerEventCreate(value: string) {
    window.dispatchEvent(new CustomEvent("carcreated", {
      detail: { name: value, color: "red" }
    }));
  }

  triggerEventUpdate(value: string) {
    window.dispatchEvent(new CustomEvent("carupdated", {
      detail: { name: value, color: "yellow" }
    }));
  }

  buildCarList(carList: Car[]): HTMLElement {
    const inner = carList.map((car) => `
    <li class="row">
      <p>${car.name}</p>
      <div class="car" style="background-color:${car.color}"></div>
    </li>`).join('');
    const ul = document.createElement('ul');
    ul.innerHTML = inner;
    return ul;
  }
}