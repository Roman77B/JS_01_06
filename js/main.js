// БД
let PRODUCT_NAMES = ["Ноутбук","Монитор","Процессор","Принтер","Клавиатура","Мышь","Колонки","Gamepad"]
let PRODUCT_PRICES = ["1000","200","1000","100","20","10","30","20"]
let PRODUCT_IDS = ["0","1","2","3","4","5","6","7"]

// Массив объектов товаров
let products = []

// Функция возвращает объект - товар по индексу массивов PRODUCT_NAMES, PRICES, IDS
function createProduct (index) {
  return {
    product_name: PRODUCT_NAMES [index],
    product_price: PRODUCT_PRICES [index],
    product_id: PRODUCT_IDS [index],
    // в каждом продукте будет храниться его кусок верстки
    // + dataset параметры
    createTemplate () {
      return `
        <div class="shop-item-wrp" data-id="${this.product_id}">
          <img class="shop-item-pic" src="https://placehold.it/200x150" alt="${this.product_name}" width="200" height="150">
          <h3 class="shop-item-h3">${this.product_name}</h3>
          <span class="shop-item-price">${this.product_price}</span>
          <button class="shop-item-button"
          data-id="${this.product_id}"
          data-name="${this.product_name}"
          data-price="${this.product_price}">
            Купить
          </button>
        </div>
      `
    }
  }
}

// корзина глобальная
let cart = {
  items: [],
  container: '.cart'
} 

// Функция возвращает объект товара для вставки в массив items в корзине
function addProductToBasket (id) {
  console.log (id)
  let product = {
    product_id: PRODUCT_IDS [id],
    product_name: PRODUCT_NAMES [id],
    product_price: PRODUCT_PRICES [id]
  }

  cart.items.push (product)
}

// Cоздание объекта каталога товаров
let catalog = {
  items: [],
  container: '.shop',
  cart: null, // ссылка на корзину

  init () {
    this._fetchItems ()
    this._render ()
    this.cart = cart

    document.querySelector ('.shop').addEventListener ('click', (event) => {
      if (event.target.className === 'shop-item-button') {
        console.log (event)
        addProductToBasket (event.target.dataset.id) 
      }
    })

    
    //console.log (this.cart)
  },

  _fetchItems () {
    let length = PRODUCT_IDS.length
    for (let i = 0; i <= length - 1; i++) {
      this.items.push (createProduct (i))
    }
  },

  _render () {
    let container = document.querySelector (this.container)
    let domString = ""
    this.items.forEach (item => {
       domString += item.createTemplate ()
    })
    container.innerHTML = domString
  }
}

catalog.init () // проинициализровать каталог товаров