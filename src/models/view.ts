export default class View{

  appendToBody(template: DocumentFragment) {
    const body = document.getElementById('viewContainer') as HTMLBodyElement;
    body.innerHTML = "";
    body.appendChild(template);
  }
}