export default class CarBuilder {

  static buildCreateTemplate(btnText: string, listener: (nameValue: string, colorValue: string) => void): HTMLElement {

    const input = document.createElement('input');
    input.type = "text";
    input.id = `${btnText}input`;

    const colorPicker = document.createElement('input');
    colorPicker.type = "color";
    colorPicker.id = `${btnText}color`;

    const btn = document.createElement('button') as HTMLButtonElement;
    btn.id = `${btnText}button`;
    btn.innerText = btnText;

    btn.addEventListener('click', () => {
      const inputElem = document.getElementById(input.id) as HTMLInputElement;
      const colorElem = document.getElementById(colorPicker.id) as HTMLInputElement;
      listener(inputElem.value, colorElem.value);
    });


    const container = document.createElement("div");
    container.appendChild(input);
    container.appendChild(colorPicker);
    container.appendChild(btn);
    return container;
  }
}