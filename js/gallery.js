// БД
const pics = [
  "https://cs8.pikabu.ru/post_img/big/2017/12/25/5/1514188160141511997.jpg",
  "https://robotcomp.ru/wa-data/public/shop/products/40/70/17040/images/24038/24038.150.jpg",
  "https://s.pn.com.ua/i/md/1022/2519090/2519090_00p.jpg",
  "https://imprints.ru/script/printers/pic/12858.jpg",
  "https://avatars.mds.yandex.net/get-mpic/1866068/img_id7997423396899106813.jpeg/6hq"
]

let main_pic = document.querySelector ("#gal-main")
let gal_prev = document.querySelector ("#gal-prev")
let control = document.querySelector ("#control")
let currentimg = 0

window.onload = () => {
  main_pic.src = pics [0]

  pics.forEach ((img, index) => {
    //console.log (index) // отладка
    gal_prev.insertAdjacentHTML ('beforeend', drawImage (img, index))
  })

  gal_prev.addEventListener ('click', (event) => {
    //console.log (event.target.tagName)  //отладка
    if (event.target.tagName === 'IMG') {
      main_pic.src = event.target.src
      currentimg = +(event.target.id.replace('pic-', '')) //запишем сюда index картинки
    }
  })

  control.addEventListener ('click', (event) => {
    if (event.target.name === "control") {
      let step = +event.target.dataset.step
      //console.log (`шаг ${step} картинка ${currentimg}`) //отладка
      if (currentimg + step < 0) {
        main_pic.src = pics [pics.length - 1] 
        currentimg = pics.length - 1
      } else if (currentimg + step === pics.length) {
        main_pic.src = pics [0] 
        currentimg = 0
      } else { 
        main_pic.src = pics [currentimg + step] 
        currentimg += step
      }     
      //console.log (`картинка ${currentimg}`) // отладка
    }
  })
}

function drawImage (src, i) {
  return `
    <img id="pic-${i}" src="${src}" width="200" height="150">
  `
}
