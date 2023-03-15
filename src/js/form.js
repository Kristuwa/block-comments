let form = document.querySelector('.callback-form');
let listComments = document.querySelector('.section-cases__list');
let inputDateForm = document.querySelector('#start');

form.addEventListener('submit', onFormSubmit);
listComments.addEventListener('click', onCloseBtn);
listComments.addEventListener('click', onLikeBtn);
inputDateForm.addEventListener('input', onInputDate);

let formData = {};

function onFormSubmit(e) {
  e.preventDefault();

  const formDataResults = new FormData(e.currentTarget);

  formDataResults.forEach((value, name) => {
    formData[name] = value;
  });

  changeDateForComment();

  addToHTML(formData);

  form.reset();
}

function addToHTML(data) {
  return listComments.insertAdjacentHTML('beforeend', markupComment(data));
}

function markupComment({ name, comment, date }) {
  return `<li class="section-cases__item">
  <p class="section-cases__name">${name}</p>
 
  <div class="section-cases__text-content"><p class="section-cases__comment">${comment}</p></div>
  <p class="section-cases__date">${date}</p>
  <button type="button" class='section-cases__btn-close btn' aria-label="close"></button>
<button type="button" class='section-cases__btn-like btn' aria-label="like"><span class="count">0</span><span><svg
width="32" height="32" class="like-btn">
<use href="./images/icons.svg#icon-heart"></use>
</svg></span></button>
</li>`;
}

function onCloseBtn(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.closest('button').className === 'section-cases__btn-close btn') {
    e.target.closest('li').style.display = 'none';
  }
}

function onLikeBtn(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.closest('button').className === 'section-cases__btn-like btn') {
    let counter = e.target.querySelector('.count');

    counter.classList.toggle('add');

    let count = Number(counter.textContent);

    if (counter.classList.contains('add')) {
      count += 1;
    } else {
      count -= 1;
    }
    counter.innerHTML = count;
  }
}

function onInputDate(e) {
  year = Number(e.target.value.split('-')[0]);
  month = Number(e.target.value.split('-')[1]);
  day = Number(e.target.value.split('-')[2]);

  const date = new Date(year, month - 1, day);
  const dateInMs = date.getTime();
  const nowDate = Date.now();

  if (dateInMs > nowDate) {
    e.target.value = '';
    alert('Выберете текущую дату, либо ранее!!');
    return;
  }
}

function changeDateForComment() {
  let year = Number(formData.date.split('-')[0]);
  let month = Number(formData.date.split('-')[1]);
  let day = Number(formData.date.split('-')[2]);
  let dateNow = new Date();
  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes();

  const date = new Date(year, month - 1, day);
  const dateInMs = date.getTime();

  let hours24ToMs = -86400000;
  let yesterdayTime =
    -hours * 60 * 60 * 1000 -
    minutes * 60 * 1000 -
    dateNow.getSeconds() * 1000 -
    dateNow.getMilliseconds() +
    hours24ToMs;

  const result = dateInMs - dateNow.getTime();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  if (
    (Number(result) >= hours24ToMs && Number(result) < 0) ||
    formData.date === ''
  ) {
    formData.date = `сегодня, ${hours}:${minutes}`;
  } else if (Number(result) === yesterdayTime) {
    formData.date = `вчера, ${hours}:${minutes}`;
  } else {
    formData.date = `${day}.${month}.${year}, ${hours}:${minutes}`;
  }
}
