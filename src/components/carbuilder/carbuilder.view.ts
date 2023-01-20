export default class CarBuilder {

  static buildCreateTemplate(btnText: string, onClick: (nameValue: string, colorValue: string) => void): HTMLElement {
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
      onClick(input.value, colorPicker.value);
    });

    const container = document.createElement("div");
    [input, colorPicker, btn].every((element) => container.appendChild(element));
    return container;
  }
}