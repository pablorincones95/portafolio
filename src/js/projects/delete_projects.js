/* ***** firebase ***** */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import '../config/config';

export default function deleteProjects(img, uid) {
  const d = document,
    db = firebase.database(),
    storage = firebase.storage(),
    projects = d.getElementById('projects');

  let isDelete = confirm('Eliminar projecto')

  if (isDelete) {
    storage.refFromURL(img).delete().then(() => db.ref(`projects/${uid}`).remove());
    db.ref().child('projects').on('child_removed', data => {
      let toDelete = d.getElementById(data.key);
      projects.removeChild(toDelete);
    })
  }
}
