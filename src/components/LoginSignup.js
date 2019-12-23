import React from 'react';
import './LoginSignup.css';
import logo from '../images/logo.svg';
import closeIcon from '../images/close.png';
import axios from 'axios';

export default class LoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: false,
      showErrorMessage: "",
      username: "",
      password: "",
      emailId: ""
    };
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.onLogonClick = this.onLogonClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onCloseClick() {
    this.setState({
      showErrorMessage: ""
    });
  }

  onSignupClick() {
    this.setState({
      isSignUp: true
    });
  }

  onLogonClick() {
    this.setState({
      isSignUp: false
    });
  }

  onInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
    if(event.target.id === "emailId") {  
      const emailExpression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if(emailExpression.test(event.target.value.toLowerCase())) {
        this.setState({
          emailId: event.target.value,
          showErrorMessage: ""
        });
      } else {
        this.setState({
          showErrorMessage: "Enter valid email ID!"
        });
      }
    }
  }

  onLogin() {
    axios.get(`http://localhost:4000/validateuser`, {
        params: {
          email: this.state.emailId,
          password: this.state.password
        }
    })
    .then( response => {
        if (response.data.username !== undefined) {
            alert(`Welcome ${response.data.username}`);
        } else {
            this.setState({
                showErrorMessage: response.data.message
            });
        }
    })
    .catch( error => {
        // handle error
        console.log(error);
    });
  }

  onSubmit() {
    axios.post(`http://localhost:4000/adduser`, {
        email: this.state.emailId,
        password: this.state.password,
        username: this.state.username,
    })
    .then( response => {
        if (response.data.message === "success") {
            alert(`Registration ${response.data.message}`);
        } else {
            this.setState({
                showErrorMessage: response.data.message
            });
        }
    })
    .catch( error => {
        // handle error
        console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <header className="Logo-header">
            <img className="logo" src={logo} alt="Logo"/>
            <span style={{fontSize: "36px", marginTop: "20px"}}>
              Test App
            </span>
          </header>
          <form className="clr-form" style={{marginTop: "20px"}}>
            {
              this.state.showErrorMessage !== "" ?
              <div className="alert alert-danger" role="alert">
                <div className="alert-items">
                    <div className="alert-item static">
                        <div className="alert-text" style={{textAlign: "center"}}>
                            {this.state.showErrorMessage}
                        </div>
                    </div>
                </div>
                <clr-icon aria-hidden="true" shape="close">
                  <img src={closeIcon} alt="X" className="close-icon" onClick={this.onCloseClick} />
                </clr-icon>
              </div>
              :
              null
            }
            <div>
                <div className="Form-unit">
                    <input style={{width: "300px"}} type="email" id="emailId" placeholder="Email" className="clr-input" onChange={this.onInputChange} />
                </div>
                <div className="Form-unit">
                    <input style={{width: "300px"}} type="password" id="password" placeholder="Password" className="clr-input" onChange={this.onInputChange} />
                </div>
            </div>
            {
              this.state.isSignUp ? 
              <div className="Form-unit">
                <input style={{width: "300px"}} type="text" id="username" placeholder="User Name" className="clr-input" onChange={this.onInputChange} />
              </div>
              :
              <div>
                <div className="Form-unit">
                  <button className="btn btn-primary btn-block" type='button' onClick={this.onLogin}>SIGN IN</button>
                </div>
                <a className='App-link' onClick={this.onSignupClick}>Sign Up</a>
              </div>
            }
            {
              this.state.isSignUp ? 
              <div>
                <div className="Form-unit">
                  <button className="btn btn-primary btn-block" type='button' onClick={this.onSubmit}>SIGN UP</button>
                </div>
                <a className='App-link' onClick={this.onLogonClick}>Login</a>
              </div>
              : null
            }
          </form>
        </div>
      </div>
    );
  }
}
