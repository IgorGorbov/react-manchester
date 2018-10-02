import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDzjhCQlFsFY7sex4h3kL5TZ672wNmZ67Q',
  authDomain: 'manchester-db597.firebaseapp.com',
  databaseURL: 'https://manchester-db597.firebaseio.com',
  projectId: 'manchester-db597',
  storageBucket: 'manchester-db597.appspot.com',
  messagingSenderId: '814583822216',
};

firebase.initializeApp(config);

const fireBaseDB = firebase.database();
const firebaseMatches = fireBaseDB.ref('matches');
const firebasePromotion = fireBaseDB.ref('promotion');
const firebaseTeams = fireBaseDB.ref('teams');

export {
  firebase,
  fireBaseDB,
  firebaseMatches,
  firebasePromotion,
  firebaseTeams,
};
