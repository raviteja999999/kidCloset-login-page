import React from 'react';
import { connect } from 'react-redux';
import { startLoginGoogle,startLoginFacebook,startSignInEmail,startSignUpEmail,sendPasswordResetEmail } from '../actions/auth';
import GoogleButton from 'react-google-button';
import FacebookLogin from 'react-facebook-login';
import { firebase } from  '../firebase/firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Static } from 'react-bootstrap/lib/FormControl';

export class LoginPage extends React.Component  
{ 
  constructor(props)
  {
    super(props);
    this.state = {
      signIn : true,
      signUp : false,
      forgotPassword: false,
      placeholderEmail : "EMAIL",
      placeholderPassword : "PASSWORD",
      value: 0,
      email: '',
      password: false,
      errorEmail : false,
      errorPassword : false,
      emailClick: false,
      passwordClick: false,
      activeClick : true,
      header : true,
      buttons: true,
    }
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.setForgotPassword = this.setForgotPassword.bind(this);
    this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    this.handleSubmitForgotPassword = this.handleSubmitForgotPassword.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
    this.clickBoxlayout = this.clickBoxlayout.bind(this);
    this.onClickPassword = this.onClickPassword.bind(this);
    this.onClickEmail = this.onClickEmail.bind(this);
    this.login = this.login.bind(this);
  }

  signIn()
  {
    if(!this.state.signIn)
    {
      this.state.activeClick = false;
      this.setState(
        () =>{
          return{
            signIn: true,
            signUp: false,
            forgotPassword: false,
            placeholderEmail : "EMAIL",
            placeholderPassword : "PASSWORD",
            errorEmail : false,
            errorPassword : false,
            value: 0,
            email: '',
            password: false,
            emailClick: false,
            passwordClick: false,
          }
        }
      );
      this.props.error && this.props.handleError();
    }
  }

  signUp()
  {
    if(!this.state.signUp)
    {
      this.state.activeClick = false;
      this.setState(
        () =>{
          return{
            signUp: true,
            signIn: false,
            value: 1,
            placeholderEmail : "EMAIL",
            placeholderPassword : "PASSWORD",
            errorEmail : false,
            errorPassword : false,
            email: '',
            password: false,
            emailClick: false,
            passwordClick: false,
          }
        }
      );
      this.props.error && this.props.handleError();
    }
  }

  handleSubmitSignIn(event)
  {
      event.preventDefault();
      this.state.activeClick = false;
      const email = event.target[0].value;
      const password = event.target[1].value;
      email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} );
      password ||  this.setState( () => { return{placeholderPassword: "please enter your password" ,errorPassword:true }} );
      email && password && this.props.startSignInEmail(email,password);
  }

  handleSubmitSignUp(event)
  {
      event.preventDefault();
      const email = event.target[0].value;
      const password = event.target[1].value;
      email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} );
      password ||  this.setState( () => { return{placeholderPassword: "please enter your password" ,errorPassword:true }} );
      email && password && this.props.startSignUpEmail(email,password);
  }

  setForgotPassword()
  {
      this.state.activeClick = false; 
      this.setState(
        () =>{
          return{
            signIn : false,
            forgotPassword: true,
            header: false,
            email: '',
            errorEmail : false,
            emailClick: false,
            placeholderEmail: "EMAIL",
            buttons: false,
          }
        }
      );
      this.props.error && this.props.handleError();
  }

  handleSubmitForgotPassword(event)
  {
    event.preventDefault();
    const email = event.target[0].value;
    email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} );
    email && this.props.sendPasswordResetEmail(email); 
  }

  handleOnChangeEmail(event)
  {
    event.preventDefault();
    const email = event.target.value;
    this.state.email = email;
    this.setState( () => { return{ placeholderEmail: "EMAIL",errorEmail: false }} );
  }

  handleOnChangePassword(event)
  {
      event.preventDefault();
      const password = event.target.value;
      if(password)
      {
      this.state.password = true;
      }
      else{
      this.state.password = false;
      }
      this.setState(() => {return{placeholderPassword : "PASSWORD",errorPassword: false}});
  }

  clickBoxlayout()
  {
    if(this.state.activeClick)
    {
        this.state.emailClick && (this.state.email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} ));
    
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.state.emailClick &&this.state.email && this.setState( () => {  if(!re.test(this.state.email)){ return{placeholderEmail: "enter a valid email id" ,errorEmail: true } }                                 
                }  );
        this.state.passwordClick &&(this.state.password ||  this.setState( () => { return{placeholderPassword: "please enter your password" ,errorPassword:true }} ));           
        this.state.forgotPasswordClick && (this.state.forgotPasswordEmail ||  this.setState( () => { return{placeholderForgotPassword: "please enter your email id" ,errorForgotPassword:true }} ));
        this.state.forgotPasswordClick && this.state.forgotPasswordEmail && this.setState( () => {  if(!re.test(this.state.forgotPasswordEmail)){ return{placeholderForgotPassword: "enter a valid email id" ,errorForgotPassword: true } }                                 
                }  );
    }
    else
    {
        this.state.activeClick = true ;
    }
  }

  onClickEmail()
  {
    this.state.emailClick = true;
    this.state.activeClick = false;
    this.props.error && this.props.handleError();
    this.state.passwordClick && (this.state.password || this.setState(() => {return{placeholderPassword: "please enter your password" ,errorPassword:true }}));
  }

  onClickPassword()
  {
    this.state.passwordClick = true;
    this.state.activeClick = false;
    this.props.error && this.props.handleError();
    this.state.emailClick && (this.state.email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} ));
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.state.emailClick &&this.state.email && this.setState( () => {  if(!re.test(this.state.email)){ return{placeholderEmail: "enter a valid email id" ,errorEmail: true } }   
                }  );
  }

  login()
  {
    this.state.activeClick = false;
    this.props.error && this.props.handleError();
    this.setState(()=>
    {return{
      signIn:true,
      forgotPassword: false,
      header: true,
      placeholderEmail : "EMAIL",
      placeholderPassword : "PASSWORD",
      errorEmail : false,
      errorPassword : false,
      email: '',
      password: false,
      emailClick: false,
      passwordClick: false,
      value: 0,
      buttons: true,
    }});
  }

  render()
  {  
    return( 
    <div className="box-layout" onClick = { this.clickBoxlayout } >
      <div className="box-layout__box">
        <h1 className="box-layout__title">KidCloset</h1>
        <p className="box-layout__tagline">Tag line for app.</p>
      
        {this.state.header && (<AppBar  color='secondary' position= 'static'  style = {{height: "60px"}} >
        <Tabs
            value={this.state.value}
            indicatorColor="secondary"
            textColor = "default"
            style = {{margin : '15px'  }}
            centered
          >
            <Tab label="SIGN IN" onClick={this.signIn}  />
            <Tab label="SIGN UP" onClick={this.signUp}   />    
          </Tabs>
        </AppBar>)}

         <div className="box-layout__background">

        {this.state.buttons && (<div> <div className = "flex-container">
          <GoogleButton className = "google-button"  label = 'LOGIN WITH GOOGLE' onClick={this.props.startLoginGoogle} type =  "dark" style = {{color: "white",fontSize: '20px',width: '300px',height:'60px'}}>Log in with Google</GoogleButton>
          <FacebookLogin
            className = 'facebook-button'
            appId="245796705999034"
            fields="name,email,picture"
            onClick = {this.props.startLoginFacebook}
          />
          </div>
              <div className = "flex-container__form">
             <p>---------------------------------------------------OR-------------------------------------------------------</p></div></div>)
        }
    
      {this.state.signIn && (<div className = "flex-container__form">      
           <form onSubmit = {this.handleSubmitSignIn} className = "flex-container__form"  >
              <div>
                <TextField
                type = "email"
                label =  {this.state.placeholderEmail}
                onChange = { this.handleOnChangeEmail }
                onClick = { this.onClickEmail} 
                style = {{width: 430,margin: '10px' }}
                error = { this.state.errorEmail  }
              />
            </div>
            
              <TextField
                type= "password"
                label = {this.state.placeholderPassword}
                style = {{width: 430,margin: '10px' }}
                onChange = {this.handleOnChangePassword}
                onClick = { this.onClickPassword}
                error = {this.state.errorPassword}
              />
            
            <Button type = "submit"  style = {{fontSize: '20px',width: '230px',height:'35px',margin:'3px'}} color= "primary" variant ="contained">SIGN IN</Button>
            </form>
            <Button type = "text" style={{color: "blue",fontSize: '13px'}} onClick = {this.setForgotPassword} > Forgot Password? </Button>
        </div>)}
             
        {this.state.signUp && (<div>
            <form onSubmit = {this.handleSubmitSignUp} className = "flex-container__form">
              <TextField
                type= "email"            
                label = {this.state.placeholderEmail}
                style = {{width: 430,margin: '10px' }}
                onChange = { this.handleOnChangeEmail }
                onClick = { this.onClickEmail} 
                error = { this.state.errorEmail  }
              />
              <TextField
                type= "password"
                label = {this.state.placeholderPassword}
                style = {{width: 430,margin: '10px'}}
                onChange = {this.handleOnChangePassword}
                onClick = { this.onClickPassword}
                error = {this.state.errorPassword}
              />
              <TextField
                type= "text"
                label = "NAME"
                style = {{width: 430,margin: '10px'}}
              />
              <TextField
                type= "text"
                label = "PHONE NUMBER"
                style = {{width: 430,margin: '10px'}}
              />
            <Button type = "submit" style = {{fontSize: '20px',width: '230px',height:'35px',margin:'3px 0px 13px'}} color= "primary" variant ="contained">SIGN UP</Button>
          </form>  

        </div>)}

          {this.state.forgotPassword && (<div>
              <p margin = "5px">No Problem, Please enter your registered mail address. We will mail you the reset link</p>
              <form onSubmit = {this.handleSubmitForgotPassword} className = "flex-container">
               
              <TextField
              type = "email"
              style = {{width: 430,margin: '10px' }}
              label = {this.state.placeholderEmail}
              error = {this.state.errorEmail}
              onClick = {this.onClickEmail}
              onChange = {this.handleOnChangeEmail}
              />
              <Button type = "submit"  style = {{fontSize: '20px',width: '230px',height:'35px',margin:'3px'}} color= "primary" variant ="contained">SUBMIT</Button>
            </form>
            <p>remember password? click here to <Button type = "text" style={{color: "blue",fontSize: '13px'}} onClick = {this.login} > login </Button>  </p>
          </div>)
          }

        {this.props.error && (<p style = {  {color: "red" }  } >{this.props.error}</p>)}
        </div>
      </div>
    </div>
  );
}
};

const mapDispatchToProps = (dispatch) => (
  
  {

  startLoginGoogle: () => dispatch(startLoginGoogle(dispatch)),
  startLoginFacebook: () => dispatch(startLoginFacebook(dispatch)),
  startSignInEmail: (email,password) =>  { dispatch(startSignInEmail(email,password,dispatch)) },
  startSignUpEmail: (email,password) =>  { dispatch(startSignUpEmail(email,password,dispatch)) },
  sendPasswordResetEmail: (email) => { dispatch(sendPasswordResetEmail(email,dispatch)) },
  handleError: () => { dispatch ({type: 'ERROR' , error_message: '' })  },
});

const mapStateToProps = state => 
{
    return{
    error : state.auth.error,
  }
};

export default connect( mapStateToProps ,mapDispatchToProps)(LoginPage);