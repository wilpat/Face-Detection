import React from 'react';

class Signin extends React.Component {

  constructor(props){//This is how props is accessible to this child component
    super(props);
    this.state = {
      'signInEmail' : '',
      'signInPassword' : ''
    }
  }

  onEmailChange = (event) =>{
    this.setState({'signInEmail': event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({'signInPassword': event.target.value});
  }

  onSubmit = () =>{
    fetch('https://polar-tundra-40741.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'email' : this.state.signInEmail,
        'password' : this.state.signInPassword
      })
    })
    .then(response => response.json())//Format the response
    .then(user =>{
      if(user.id){
        this.props.loadUser(user);
        this.props.routeChange('home');
      }
    })
  }

  render(){
      const { routeChange } = this.props;
      return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6">Email</label>
                  <input onChange = { this.onEmailChange } className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Password</label>
                  <input onChange = { this.onPasswordChange } className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>
              </fieldset>
              <div className="">
                <input 
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in" 
                onClick = { this.onSubmit } /*This is how you do onClick fxns that have parameters in react, else the fxn inside would run 
                when the component renders even without you clicking anything */
              />
              </div>
              <div className="lh-copy mt3">
                <p onClick = { () => routeChange('register') } className="f6 link pointer dim black db">Register</p>
              </div>
            </div>
          </main>

        </article>
      )
    }
  }

export default Signin;