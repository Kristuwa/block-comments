let form = document.querySelector('.callback-form');
let listComments = document.querySelector('.section-cases__list');

form.addEventListener('submit', onFormSubmit);
listComments.addEventListener('click', onCloseBtn);
listComments.addEventListener('click', onLikeBtn);

let formData = {};

function onFormSubmit(e) {
  e.preventDefault();
  const formDataResults = new FormData(e.currentTarget);
  formDataResults.forEach((value, name) => {
    formData[name] = value;
  });
  addToHTML(formData);
  form.reset();
}

function markupComment({ name, comment, date }) {
  return `<li class="section-cases__item"><p class="section-cases__name">${name}</p><div class="section-cases__text-content"><p class="section-cases__comment">${comment}</p></div><p class="section-cases__date">${date}</p><button type="button" class='section-cases__btn-close btn' aria-label="close">[x]<svg
  width="20"
  height="20"
 >
  <use href="./src/images/icons.svg#icon-bin" class="close-btn"></use>
</svg></button>
<button type="button" class='section-cases__btn-like btn' aria-label="like"><span class="count">0</span><svg
width="20"
height="20"
>
<use href="./src/images/icons.svg#icon-heart" class="like-btn"></use>
</svg></button></li>`;
}

function addToHTML(data) {
  return listComments.insertAdjacentHTML('beforeend', markupComment(data));
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
