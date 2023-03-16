let form = document.querySelector('.callback-form');
let listComments = document.querySelector('.section-cases__list');
let inputDateForm = document.querySelector('#start');
let textareaInput = document.querySelector('.callback-form__textarea');

form.addEventListener('submit', onFormSubmit);
listComments.addEventListener('click', onCloseBtn);
listComments.addEventListener('click', onLikeBtn);
inputDateForm.addEventListener('input', onInputDate);
textareaInput.addEventListener('input', onInputTextarea);

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
  <button type="button" class='section-cases__btn-close btn' aria-label="close">
  <svg class="icon-bin" width="20" height="20"><use xlink:href="#icon-bin"><symbol id="icon-bin" viewBox="0 0 32 32">
  <path d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z"></path>
  </symbol></use></svg></button>
<button type="button" class='section-cases__btn-like btn' aria-label="like">
<span class="count">0</span>
<svg class="icon-heart" width="20" height="20"><use xlink:href="#icon-heart">
<symbol id="icon-heart" viewBox="0 0 32 32">
<path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"></path>
</symbol></use></svg></button>
</li>`;
}

function onCloseBtn(e) {
  const buttonClose = e.target.closest('button');
  if (!buttonClose) {
    console.log(e.target);
    return;
  }
  if (buttonClose.className === 'section-cases__btn-close btn') {
    e.target.closest('li').style.display = 'none';
  }
}

function onLikeBtn(e) {
  const buttonLike = e.target.closest('button');
  if (!buttonLike) {
    console.log(e.target);
    return;
  }
  if (buttonLike.className === 'section-cases__btn-like btn') {
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

function onInputTextarea(e) {
  if (e.target.value.length === 280) {
    alert('Вы ввели максимальное количество символов');
  }
}
