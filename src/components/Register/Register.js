import React from 'react';

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (event) =>{
    this.setState({'name' : event.target.value});
  }

  onEmailChange = (event) =>{
    this.setState({'email' : event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({'password' : event.target.value});
  }

  onSubmit = () =>{
    fetch('https://polar-tundra-40741.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => response.json())
    .then(user =>{
      if(user.id){
        this.props.loadUser(user);
        this.props.routeChange('home');
      }
    })
    
  }

  render(){
      return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>

                <div className="mt3">
                  <label className="db fw6 lh-copy f6">Name</label>
                  <input onChange = { this.onNameChange } className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="" />
                </div>

                <div className="mt3">
                  <label className="db fw6 lh-copy f6">Email</label>
                  <input onChange = { this.onEmailChange } className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" />
                </div>

                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Password</label>
                  <input onChange = { this.onPasswordChange } className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" />
                </div>
              </fieldset>
              <div className="">
                <input 
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register" 
                onClick = { this.onSubmit } /* () => routeChange('home') is how you do onClick fxns that have parameters in react, else the fxn inside would run 
                when the component renders even without you clicking anything */
              />
              </div>
            </div>
          </main>

        </article>
      )
  }
  
}

export default Register;