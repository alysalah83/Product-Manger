import { getStatus } from '../helper';

class ProductView {
  #data;
  #parentEle = document.querySelector('.section__table');
  #name = document.getElementById('product__name');
  #price = document.getElementById('product__price');
  #status = document.getElementById('product__available');
  #model = document.getElementById('product__model');
  #quantity = document.getElementById('product__quantity');
  #manufacturer = document.getElementById('product__manufacturer');
  #image = document.getElementById('product__image');
  #inputs = [
    this.#name,
    this.#price,
    this.#model,
    this.#quantity,
    this.#manufacturer,
  ];

  #form = document.querySelector('form');
  constructor() {
    this.#addHandlerLockToggle();
    this.#addHandlerLockTyping();
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentEle.insertAdjacentHTML('beforeend', markup);
  }

  #toggleLockActive(icon) {
    icon.classList.toggle('icon__locked');
  }

  #addHandlerLockToggle() {
    this.#form.addEventListener('click', e => {
      const icon = e.target.closest('.icon__lock');
      if (!icon) return;
      const input = icon.closest('.input__container').querySelector('.input');
      const { lock } = icon.dataset;
      if (lock === 'false') {
        icon
          .querySelector('path')
          .setAttribute(
            'd',
            'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
          );
        this.#toggleLockActive(icon);
        icon.setAttribute('data-lock', true);
        input.classList.add('input__locked');
      } else {
        icon
          .querySelector('path')
          .setAttribute(
            'd',
            'M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
          );
        this.#toggleLockActive(icon);
        icon.setAttribute('data-lock', false);
        input.classList.remove('input__locked');
      }
    });
  }

  #addHandlerLockTyping() {
    this.#form.addEventListener('focusin', e => {
      const input = e.target.closest('input');
      if (!input) return;
      e.preventDefault();
      const locked = input
        .closest('.input__container')
        .querySelector('.icon__lock').dataset.lock;
      if (locked === 'true') return input.setAttribute('readonly', true);
      input.removeAttribute('readonly');
    });
  }

  addHandlerSubmit(handler) {
    this.#form.addEventListener('submit', e => {
      e.preventDefault();
      const name = this.#name.value;
      const price = this.#price.value;
      const status = this.#status.value;
      const model = this.#model.value;
      const quantity = this.#quantity.value;
      const manufacturer = this.#manufacturer.value;
      const file = this.#image.files[0];
      const reader = new FileReader();
      reader.onload = _ => {
        const image = reader.result;
        handler({ name, price, status, model, quantity, manufacturer, image });
      };

      file
        ? reader.readAsDataURL(file)
        : handler({
            name,
            price,
            status,
            model,
            quantity,
            manufacturer,
            image: null,
          });

      this.#inputs.forEach(input => {
        const lock = input
          .closest('.input__container')
          .querySelector('.icon__lock').dataset.lock;
        if (lock === 'true') return;
        input.value = '';
      });
    });
  }

  #generateMarkup() {
    return Array.isArray(this.#data)
      ? this.#data.map(obj => this.#markup(obj)).join(' ')
      : this.#markup(this.#data);
  }

  #markup(obj) {
    return `
        <div class="table__row">
            <p class="table__ele">#${obj.id}</p>
            <p class="table__ele hight__set">
            <img src="${
              obj.image || new URL('../../../default img.png', import.meta.url)
            }" alt="${obj.name} Image" class="table__img" />
            </p>
            <p class="table__ele">${obj.name}</p>
            <p class="table__ele">${obj.model || 'N/A'}</p>
            <p class="table__ele">${obj.manufacturer || 'N/A'}</p>
            <p class="table__ele">${obj.price}</p>
            <p class="table__ele">${obj.quantity}</p>
            <p class="table__ele ${getStatus(obj.status, true)}">${getStatus(
      obj.status
    )}</p>
            <div class="table__ele">
            <button class="btn btn__edit" data-id=${obj.id}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon__edit"
              >
                <path
                  d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                />
              </svg>
            </button>
          </div>
        </div>
    `;
  }
}

export default new ProductView();
