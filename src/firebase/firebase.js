import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCeFlFu6cy_oXHEt3YSP4QZDfrielW-FT8",
  authDomain: "boilerplate-react-app.firebaseapp.com",
  databaseURL: "https://boilerplate-react-app.firebaseio.com",
  projectId: "boilerplate-react-app",
  storageBucket: "boilerplate-react-app.appspot.com",
  messagingSenderId: "396778978419"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { firebase, googleAuthProvider,facebookAuthProvider, database as default };
