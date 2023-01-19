export default class CarBuilder{

   static buildCreateTemplate(btnText: string, listener: (value: string) => void): HTMLElement {

    const input = document.createElement('input');
    input.type = "text";
    input.id = `${btnText}input`;

    const btn = document.createElement('button') as HTMLButtonElement;
    btn.id = `${btnText}button`;
    btn.innerText = btnText;

    btn.addEventListener('click', () => {
      const inputElem = document.getElementById(input.id) as HTMLInputElement;
      listener(inputElem.value);
    });


    const container = document.createElement("div");
    container.appendChild(input);
    container.appendChild(btn);
    return container;
  }
}