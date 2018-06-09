import { firebase, googleAuthProvider ,facebookAuthProvider} from '../firebase/firebase';
import ReactDOM from 'react-dom';
import React from 'react';



export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLoginGoogle = (dispatch) => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider).then(() => {dispatch({type: 'ERROR' , error_message: ''});}).catch( (error) => {  
      dispatch ({type: 'ERROR' , error_message: error.message });
}  );
  };
};

export const startLoginFacebook = (dispatch) => {
  return () => {
    return firebase.auth().signInWithPopup(facebookAuthProvider).then(() => {dispatch({type: 'ERROR' , error_message: ''});}).catch( (error) => {  
      dispatch ({type: 'ERROR' , error_message: error.message });
}  );
  };
};

export const startSignInEmail = (email,password,dispatch) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email,password).then(() => {dispatch({type: 'ERROR' , error_message: ''});}).catch( (error) => {  
                dispatch ({type: 'ERROR' , error_message: error.message });
    }  );
  };
};

export const startSignUpEmail = (email,password,dispatch) => {
  return () => {
    return firebase.auth().createUserWithEmailAndPassword(email,password).then(() => {dispatch({type: 'ERROR' , error_message: ''});}).catch( (error) => {  
      dispatch ({type: 'ERROR' , error_message: error.message });
}  );
  };
};

export const sendPasswordResetEmail = (email,dispatch) => {
  return () => {
    return firebase.auth().sendPasswordResetEmail(email).then(() => {dispatch({type: 'ERROR' , error_message: 'email sent'});}).catch( (error) => {  
                dispatch ({type: 'ERROR' , error_message: error.message });
    }  );
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
