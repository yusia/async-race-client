import Car from '../../models/car.model';
import CarBuilder from '../carbuilder/carbuilder';
import View from '../../models/view';

export default class GarageView extends View {
  renderGarage(cars: Car[]): void {
    const garageViewFragment = document.createDocumentFragment();
    const createBtn = CarBuilder.buildCreateTemplate('create', this.triggerEventCreate);
    const updateBtn = CarBuilder.buildCreateTemplate('update', this.triggerEventUpdate);
    const container = this.buildListContainer(cars.length);
    container.appendChild(this.buildCarList(cars));

    [createBtn, updateBtn, this.buildGenerateBtn(), container].every(
      (element) => garageViewFragment.appendChild(element),
    );

    this.appendToBody(garageViewFragment);
  }

  buildListContainer(count: number): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = `<h1>Garage (${count})</h1>`;
    return container;
  }

  private triggerEventCreate(valueName: string, valueColor: string) {
    window.dispatchEvent(new CustomEvent('carcreated', {
      detail: { name: valueName, color: valueColor },
    }));
  }

  private triggerEventUpdate(valueName: string, valueColor: string) {
    window.dispatchEvent(new CustomEvent('carupdated', {
      detail: { name: valueName, color: valueColor },
    }));
  }

  buildCarList(carList: Car[]): HTMLElement {
    const div = document.createElement('div');
    div.ariaLive = 'polite';
    div.innerHTML = carList.map((car) => this.buildCarBlock(car)).join('');
    div.addEventListener('click', (e) => { this.onCarBlockClicked(e, carList); });
    return div;
  }

  buildCarBlock(car: Car) {
    return `
          <div class="car-container"data-id="${car.id}">
            <div >
              <div class="row">
                <h5>${car.name} 
                <button  data-sel-button="${car.id}" class=" btn edit-icon" title="select"></button>   
                <button  data-remove-button="${car.id}" class=" btn remove-icon" title="remove"></button>  
                </h5>
              </div> 
              <button  data-start-btn="${car.id}" class=" btn start-icon" title="start"></button>  
              <button  data-stop-btn="${car.id}" class=" btn restart-icon" title="reset"></button>      
            </div>
            <div class="car" id="${car.id}-car" style="background-color:${car.color}"></div>
          </div>`;
  }

  onCarBlockClicked(e: MouseEvent, carList: Car[]) {
    const carId = (btnId: string) => (e.target as HTMLElement).dataset[btnId];
    const isButtonClicked = (btnId: string) => carId(btnId) !== undefined;

    switch (true) {
      case isButtonClicked('selButton'):
        this.onSelectClicked(carList, carId('selButton'));
        break;
      case isButtonClicked('removeButton'):
        this.triggerEventRemoved(carId('removeButton'));
        break;
      case isButtonClicked('startBtn'):
        this.onStartClicked(carId('startBtn'));
        break;
      case isButtonClicked('stopBtn'):
        this.onStopClicked(carId('stopBtn'));
        break;
      default: break;
    }
  }

  onStartClicked(carId = '0') {
    const car = document.getElementById(`${carId}-car`) as HTMLDivElement;
    car.style.transition = 'left 5s cubic-bezier(0, 0, 1, 1)';
    car.style.left = '85vw';
  }

  onStopClicked(carId = '0') {
    const car = document.getElementById(`${carId}-car`) as HTMLDivElement;
    car.style.transition = 'none';
    car.style.left = '0';
  }

  onSelectClicked(carList: Car[], carId = '0') {
    this.triggerEventSelected(carId);
    const car = carList.filter((c) => c.id === +carId)[0];
    this.initUpdateComponent(car);
  }

  private triggerEventSelected(value: string) {
    window.dispatchEvent(new CustomEvent('carselected', {
      detail: { id: +value },
    }));
  }

  private initUpdateComponent(car: Car) {
    const inputName = document.getElementById('updateinput') as HTMLInputElement;
    inputName.value = car.name;
    const inputColor = document.getElementById('updatecolor') as HTMLInputElement;
    inputColor.value = car.color;
  }

  private triggerEventRemoved(value = '0') {
    window.dispatchEvent(new CustomEvent('carremoved', {
      detail: { id: +value },
    }));
  }

  private buildGenerateBtn(): HTMLElement {
    const btn = document.createElement('button') as HTMLButtonElement;
    btn.classList.add('btn');
    btn.classList.add('btn-secondary');
    btn.innerText = 'Generate cars';
    btn.addEventListener('click', () => window.dispatchEvent(new CustomEvent('generateclicked')));
    return btn;
  }
}
