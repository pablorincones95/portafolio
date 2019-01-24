/* ***** firebase ***** */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import '../config/config';

function figureTemplate(key, {uid, title, img, category, url}) {
  return `
    <img src="${img}" alt="${title}">
    <figcaption>
    <div>
      <p class="title">${title}</p>
      <i id="delete" class="fas fa-trash" data-id="${key}" data-photo="${img}"></i>
    </div>
    <p class="description">${category}</p>
    <a href="${url}" target="_blank" class="u-btn">Ver mas</a>
    </figcaption>
  `
}

export default function showProjects() {
  const d = document,
    db = firebase.database(),
    projects = d.getElementById('projects');

  db.ref().child('projects').on('child_added', data => {
    let figure = d.createElement('figure');

    figure.id = data.key;
    figure.classList.add('masonry-brick')
    figure.innerHTML = figureTemplate(data.key, data.val());
    projects.insertAdjacentElement('afterbegin', figure);
  })
}
