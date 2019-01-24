/* ***** firebase ***** */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import '../config/config';

const d = document;

function registerInDB(uid, title, img, category, url) {
  let db = firebase.database().ref().child('projects');

  db.push({
    uid,
    title,
    img,
    category,
    url
  });
}

function uploadImg(img) {
  let imgName = `${new Date().getTime()}_${img.name}`;

  const imgRef = firebase.storage().ref().child('img'),
    progressBar = d.getElementById('progress-bar'),
    progressAdvance = d.getElementById('progress-advance');

  let uploader =  imgRef.child(imgName).put(img);

  progressBar.classList.remove('u-none');
  progressAdvance.classList.remove('u-none');

  uploader.on('state_changed', data => {
    let progress = Math.floor((data.bytesTransferred / data.totalBytes) * 100);
    progressBar.value = progress;
    progressAdvance.textContent = `${progress} %`;
  }, err => {
    progressAdvance.innerHTML = `<p class="u-message">${err.code} - ${err.mesagge}</p>`;
  }, () => {
    const imgUrl = imgRef.child(imgName),
      uid = firebase.auth().currentUser.uid,
      title = d.querySelector('input[name="title"]').value,
      category = d.querySelector('input[name="category"]').value,
      url = d.querySelector('input[name="url"]').value,

    uploader = null;

    imgUrl.getDownloadURL().then(urlImg => registerInDB(uid, title, urlImg, category, url)).then(() => {
      progressBar.value = 0;
      progressAdvance.textContent = null;
      progressBar.classList.add('u-none');
      progressAdvance.classList.add('u-none');
      d.getElementById('form-register-project').reset();
    })
  })
}

export default function registerProject () {
  d.addEventListener('submit', e => {
    if (e.target.matches('#form-register-project')) {
      e.preventDefault();

      let img = e.target.img.files[0];

      if (img.type.match('image.*')) {
        uploadImg(img);
      } else {
        e.target.querySelector('.u-message').innerHTML = ' El archivo que intentas subir, no es una imagen <br> <i class="fas fa-sad-cry"></i>'
      }
    }
  })

}
