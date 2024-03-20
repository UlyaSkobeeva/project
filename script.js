//бургер
document.querySelector(".burger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".header-menu").classList.toggle("open");
});

//
//
//
const list = document.querySelector("#age__list");
async function start() {
  try {
    const resp = await fetch("./people.json");
    const data = await resp.json();
    PERSONS = data;
    render(data);
    // console.log(data);
  } catch (err) {}
}

function render(persons = []) {
  if (persons.length === 0) {
    list.innerHTML = "Сотрудники не найдены";
  } else {
    const html = persons.map(toHTML).join("");

    list.innerHTML = html;
  }
}

function toHTML(person) {
  let birDay = new Date(person.birthday);
  let birthDay = birDay.toLocaleDateString();

  let now = new Date();
  let nowDay = now.toLocaleDateString();

  let nowDate = now.getDate(); //число текущей даты
  let birDate = birDay.getDate(); //число даты рождения
  let nowMonth = now.getMonth(); //число текущего месяца
  let birMonth = birDay.getMonth(); //число месяца рождения

  if (nowDate <= birDate && nowMonth === birMonth) {
    return `
  <li class="info-age__item">
  <img src="${person.img}" alt=""
      class="info-age__img">
  <p class="info-age__text">${person.name}</p>
  <p class="info-age__year">${birthDay}</p>
</li>             
    `;
  }
}

//слайдер
let offset = 0; //смещение от низ
const sliderLine = document.querySelector(".info-age__list");

document.querySelector(".next__btn").addEventListener("click", function () {
  offset = offset + 320;
  if (offset > 1280) {
    offset = 0;
  }
  sliderLine.style.bottom = offset + "px";
});

document.querySelector(".early__btn").addEventListener("click", function () {
  offset = offset - 320;
  if (offset < 0) {
    offset = 1280;
  }
  sliderLine.style.bottom = offset + "px";
});

start();
