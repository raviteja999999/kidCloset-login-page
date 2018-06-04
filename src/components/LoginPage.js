import React from 'react';
import { connect } from 'react-redux';
import { startLoginGoogle,startLoginFacebook,startSignInEmail,startSignUpEmail } from '../actions/auth';
import GoogleButton from 'react-google-button';
import FacebookLogin from 'react-facebook-login';
import Button from '@material-ui/core/Button';
import spacing from '@material-ui/core/styles/spacing';
//import 'typeface-roboto';

export class LoginPage extends React.Component  
{ 

  constructor(props)
  {
    super(props);
    this.state = {
      signIn : false,
      signUp : false
    }
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
  }

  signIn()
  {
      this.setState(
        () =>{
          return{
            signIn: true,
            signUp: false,
          }
        }
      );
  }

  signUp()
  {
      this.setState(
        () =>{
          return{
            signUp: true,
            signIn: false,
          }
        }
      );
  }

  handleSubmitSignIn(event)
  {
      event.preventDefault();
      const email = event.target[0].value;
      const password = event.target[1].value;
      this.props.startSignInEmail(email,password);
  }

  handleSubmitSignUp(event)
  {
      event.preventDefault();
      const email = event.target[0].value;
      const password = event.target[1].value;
      this.props.startSignUpEmail(email,password);
  }

  render(){
    
    return(  
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Boilerplate</h1>
        <p className="box-layout__tagline">Tag line for app.</p>

       
        <div className = "flex-container">
        <Button onClick={this.signIn} style = {{fontSize: '15px', margin: 5 }} color= "primary" variant ="contained" >SIGN IN</Button>
        <Button onClick={this.signUp} style = {{fontSize: '15px'}} color= "primary" variant ="contained" >SIGN UP</Button>
        </div>

     
      {this.state.signIn && (<div className = "flex-container__form">
          <div className = "flex-container">
          <GoogleButton className = "google-button"  label = 'LOGIN WITH GOOGLE' onClick={this.props.startLoginGoogle} type =  "dark" style = {{color: "white",fontSize: '20px',width: '300px',height:'60px'}}>Log in with Google</GoogleButton>
          <FacebookLogin
            className = 'facebook-button'
            appId="245796705999034"
            fields="name,email,picture"
            onClick = {this.props.startLoginFacebook}
          />
          </div>
              <div className = "flex-container__form">
             <p>---------------------------------------------------OR-------------------------------------------------------</p>
            <form onSubmit = {this.handleSubmitSignIn} className = "flex-container__form"  >
              <input
                type= "email"
                placeholder = "EMAIL"
              />
              <input
                type= "password"
                placeholder = "PASSWORD"
              />
            <Button type = "submit"  style = {{fontSize: '20px',width: '230px',height:'35px',margin:'3px'}} color= "primary" variant ="contained">SIGN IN</Button>
            </form>
            <Button type = "text" style={{color: "blue",fontSize: '13px'}} >Forgot Password? </Button>

            </div>
        </div>)}

              

        {this.state.signUp && (<div>
        
        <div className = "flex-container">
          <GoogleButton className = "google-button"  label = 'LOGIN WITH GOOGLE' onClick={this.props.startLoginGoogle} type =  "dark" style = {{color: "white",fontSize: '20px',width: '300px',height:'60px'}}>Log in with Google</GoogleButton>
          <FacebookLogin
            className = 'facebook-button'
            appId="245796705999034"
            fields="name,email,picture"
            onClick = {this.props.startLoginFacebook}
          />
          </div>
          <p>---------------------------------------------------OR-------------------------------------------------------</p>
          <form onSubmit = {this.handleSubmitSignUp} className = "flex-container__form">
              <input
                type= "email"
                placeholder = "EMAIL"
              />
              <input
                type= "password"
                placeholder = "PASSWORD"
              />
              <input
                type= "text"
                placeholder = "NAME"
              />
              <input
                type= "text"
                placeholder = "PHONE NUMBER"
              />
            <Button type = "submit" style = {{fontSize: '20px',width: '230px',height:'35px',margin:'3px'}} color= "primary" variant ="contained">SIGN UP</Button>
          </form>

          
        </div>)}

      </div>
    </div>
  );
}
      

};

const mapDispatchToProps = (dispatch) => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginFacebook: () => dispatch(startLoginFacebook()),
  startSignInEmail: (email,password) =>  { dispatch(startSignInEmail(email,password)) },
  startSignUpEmail: (email,password) =>  { dispatch(startSignUpEmail(email,password)) },
});

export default connect(undefined, mapDispatchToProps)(LoginPage);