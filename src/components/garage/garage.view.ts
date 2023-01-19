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

  private triggerEventCreate(value: string) {
    window.dispatchEvent(new CustomEvent("carcreated", {
      detail: { name: value, color: "red" }
    }));
  }

  private triggerEventUpdate(value: string) {
    window.dispatchEvent(new CustomEvent("carupdated", {
      detail: { name: value, color: "blue" }
    }));
  }

  buildCarList(carList: Car[]): HTMLElement {
    const inner = carList.map((car) => `
    <li class="row" data-id="${car.id}">
      <div><span>${car.name}</span> 
      <button  data-selbutton="${car.id}">select</button>   </div>
      <div class="car" style="background-color:${car.color}"></div>
    </li>`).join('');
    const ul = document.createElement('ul');
    ul.innerHTML = inner;
    ul.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).dataset.selbutton;
      if (id) {
       this.triggerEventSelected(id);
      }
    });
    return ul;
  }
  private triggerEventSelected(value: string) {
    window.dispatchEvent(new CustomEvent("carselected", {
      detail: { id: +value }
    }));
  }
}