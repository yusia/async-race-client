import { Car } from '../../models/car.model';
import CarBuilder from '../carbuilder/carbuilder.view';
import View from '../../models/view';

export default class GarageView extends View {

  renderGarage(cars: Car[]): void {
    const garageViewFragment = document.createDocumentFragment();
    const createBtn = CarBuilder.buildCreateTemplate("create", this.triggerEventCreate);
    const updateBtn = CarBuilder.buildCreateTemplate("update", this.triggerEventUpdate);
    const container = this.buildListContainer(cars.length);
    container.appendChild(this.buildCarList(cars));

    [createBtn, updateBtn, this.buildGenerateBtn(), container].every(
      (element) => garageViewFragment.appendChild(element));

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
    const ul = document.createElement('ul');
    ul.innerHTML = carList.map((car) => this.buildCarBlock(car)).join('');;
    ul.addEventListener('click', (e) => { this.onCarBlockClicked(e, carList); });
    return ul;
  }

  buildCarBlock(car: Car) {
    return `
          <li class="row" data-id="${car.id}">
            <div>
              <span>${car.name}</span> 
              <button  data-sel-button="${car.id}">select</button>   
              <button  data-remove-button="${car.id}">remove</button> 
              <button  data-start-btn="${car.id}">start</button>    
            </div>
            <div class="car" id="${car.id}-car" style="background-color:${car.color}"></div>
          </li>`;
  }

  onCarBlockClicked(e: MouseEvent, carList: Car[]) {
    const carId = (btnId: string) => (e.target as HTMLElement).dataset[btnId];
    const isButtonClicked = (btnId: string) => carId(btnId) !== undefined;

    switch (true) {
      case isButtonClicked("selButton"):
        this.onSelectClicked(carId("selButton"), carList);
        break;
      case isButtonClicked("removeButton"):
        this.triggerEventRemoved(carId("removeButton"));
        break;
      case isButtonClicked("startBtn"):
        this.onStartClicked(carId("startBtn"));
        break;
    }
  }

  onStartClicked(carId: string = "0") {
    const car = document.getElementById(`${carId}-car`) as HTMLDivElement;
    car.style.left = "85vw";
  }

  onSelectClicked(carId: string = "", carList: Car[]) {
    this.triggerEventSelected(carId);
    const car = carList.filter(c => c.id === +carId)[0];
    this.initUpdateComponent(car);
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

  private triggerEventRemoved(value: string = "0") {
    window.dispatchEvent(new CustomEvent("carremoved", {
      detail: { id: +value }
    }));
  }

  private buildGenerateBtn(): HTMLElement {
    const btn = document.createElement('button') as HTMLButtonElement;
    btn.innerText = 'Generate cars';
    btn.addEventListener('click', () => window.dispatchEvent(new CustomEvent("generateclicked")));
    return btn;
  }
}