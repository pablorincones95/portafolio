/* ***** firebase ***** */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import './config/config';

/* ***** Autenticacion ***** */
import { signIn, signOut } from './auth';

/* ***** Rutas TEMPLATE ***** */
import tplHome from '../html/home.tpl.html';
import tplAbout from '../html/about.tpl.html';
import tplService from '../html/service.tpl.html';
import tplContact from '../html/contact.tpl.html';
import tplLogin from '../html/login.tpl.html';
import tplAdmin from '../html/admin.tpl.html';

/* ***** CRUD para el projecto ***** */
import registerProject from './projects/register_project';
import showProjects from './projects/show_projects';
import deleteProjects from './projects/delete_projects';

/***** imagenes para about *****/
import astronauta from '../img/astronauta.svg';

const routes = () => {
  const d = document,
    main = d.querySelector('.Main');

  d.addEventListener('DOMContentLoaded', e => {
    main.innerHTML = tplHome;
    showProjects();
  });

  d.addEventListener('click', e => {
    if (e.target.matches('a[href="#"]')) {
      e.preventDefault();
    }

    if (e.target.matches('#home')) {
      main.innerHTML = tplHome;
      showProjects();
    } else if (e.target.matches('#about')) {
      main.innerHTML = tplAbout;
      d.querySelector('.About-header').innerHTML =` <img src="${astronauta}"> `
    } else if (e.target.matches('#service')) {
      main.innerHTML = tplService;
    } else if (e.target.matches('#contact')) {
      main.innerHTML = tplContact;
    } else if (e.target.matches('#admin')) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          main.innerHTML = tplAdmin;
          d.querySelector('.Admin-name').textContent = user.displayName;
          d.querySelector('.Admin-avatar').src = user.photoURL;
          registerProject();
          showProjects();
          console.log(user)
        } else {
          main.innerHTML = tplLogin;
        }
      });
    } else if (e.target.matches('#login')) {
      signIn();
    } else if (e.target.matches('#logout')) {
      signOut()
    } else if (e.target.matches('#delete')) {
      console.log('trash')
      deleteProjects(e.target.dataset.photo, e.target.dataset.id);
    }
  });

  d.addEventListener('change', e => {
    if (e.target.matches('input[type="file"]')) {
      d.querySelector('.Form-uploader input[type="text"]').value = e.target.value;
    }
  })
}

export default routes;
