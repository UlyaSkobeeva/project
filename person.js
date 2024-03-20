//бургер
document.querySelector(".burger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".header-menu").classList.toggle("open");
});

const list = document.querySelector("#card__list");
const filter = document.querySelector("#filter");
let PERSONS = [];

//поиск
filter.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();
  const filteredPersons = PERSONS.filter((person) => {
    return (
      person.name.toLowerCase().includes(value) ||
      person.job.toLowerCase().includes(value) ||
      person.mail.toLowerCase().includes(value) ||
      person.number.toLowerCase().includes(value) ||
      person.year.toLowerCase().includes(value)
    );
  });
  render(filteredPersons);
});

//получить данные из json
async function start() {
  try {
    const resp = await fetch("./people.json");
    const data = await resp.json();
    PERSONS = data;

    render(data);
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
  return `
  
    <div class="card__item">
        <div class="card__img"><img
        src=" ${person.img}" alt=""
        class="img">
        </div>
        <div class="card__info">
            <h3 class="FIO">${person.name}</h3>
            <h4 class="job">Должность: ${person.job}</h4>
            <h4 class="telephone">Номер для связи: ${person.number}</h4>
            <h4 class="mail">Эл. почта: ${person.mail}</h4>
            <h4 class="date">Дата рождения: ${person.year}</h4>
        </div>
    </div>               
    `;
}

// let bir = "3/27/2020";

// const dshh = new Date(bir);
// console.log(dshh);

start();
