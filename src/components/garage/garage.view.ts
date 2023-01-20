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
    const container = this.buildListContainer(cars.length);
    container.appendChild(this.buildCarList(cars));

    garageViewFragment.appendChild(container);
    this.appendToBody(garageViewFragment);
  }

  buildListContainer(count: number): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = `<h1>Garage (${count})</h1>`;
    return container;
  }

  private triggerEventCreate(valueName: string, valueColor: string) {
    window.dispatchEvent(new CustomEvent("carcreated", {
      detail: { name: valueName, color: valueColor }
    }));
  }

  private triggerEventUpdate(valueName: string, valueColor: string) {
    window.dispatchEvent(new CustomEvent("carupdated", {
      detail: { name: valueName, color: valueColor }
    }));
  }

  buildCarList(carList: Car[]): HTMLElement {
    const inner = carList.map((car) => `
    <li class="row" data-id="${car.id}">
      <div>
        <span>${car.name}</span> 
        <button  data-selbutton="${car.id}">select</button>   
        <button  data-removebutton="${car.id}">remove</button>   
      </div>
      <div class="car" style="background-color:${car.color}"></div>
    </li>`).join('');
    const ul = document.createElement('ul');
    ul.innerHTML = inner;
    ul.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).dataset.selbutton;
      if (id) {
        this.triggerEventSelected(id);
        const car = carList.filter(c => c.id === +id)[0];
        this.initUpdateComponent(car);
      }

      const idRemove = (e.target as HTMLElement).dataset.removebutton;
      if (idRemove) {
        this.triggerEventRemoved(idRemove);
      }
    });
    return ul;
  }

  private triggerEventSelected(value: string) {
    window.dispatchEvent(new CustomEvent("carselected", {
      detail: { id: +value }
    }));
  }
  private initUpdateComponent(car: Car) {
    const inputName = document.getElementById("updateinput") as HTMLInputElement;
    inputName.value = car.name;
    const inputColor = document.getElementById("updatecolor") as HTMLInputElement;
    inputColor.value = car.color;
  }

  private triggerEventRemoved(value: string) {
    window.dispatchEvent(new CustomEvent("carremoved", {
      detail: { id: +value }
    }));
  }
}