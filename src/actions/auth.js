import { firebase, googleAuthProvider ,facebookAuthProvider} from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLoginGoogle = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider).catch((error) => { console.log('error:',error)});
  };
};

export const startLoginFacebook = () => {
  return () => {
    return firebase.auth().signInWithPopup(facebookAuthProvider).catch((error) => { console.log('error:',error)});
  };
};

export const startSignInEmail = (email,password) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email,password).catch((error) => { console.log('error:',error)});
  };
};

export const startSignUpEmail = (email,password) => {
  return () => {
    return firebase.auth().createUserWithEmailAndPassword(email,password).catch((error) => { console.log('error:',error)});
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
