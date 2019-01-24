/* ***** estilos ***** */
import styles from  './scss/main.scss';

/* ***** Importaciones de Funciones ***** */
import toggleNav from './js/function';
import routes from './js/routes';
import email from './js/email';

/* ***** Invocacion de las funciones ***** */

const footerYear = document.querySelector('.Footer-year');
footerYear.textContent = new Date().getFullYear();
toggleNav();
routes();
email();
