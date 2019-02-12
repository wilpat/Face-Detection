import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '5af5d3e2299d4875b792b365a39f9e23'
});


const particlesPar = {
  particles: {  
                number:{
                  value: 200,
                  density: {
                    enable: true,
                    value: 800
                  }
                }
            }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: '',
        joined: ''
      }
    };
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({
      user : {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  inputChange = (e) =>{
    this.setState({ input: e.target.value });
  }

  detectFace = (data) =>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      top: face.top_row * height,
      left: face.left_col * width,
      right : width - (face.right_col * width),
      bottom: height - (face.bottom_row * height)
    }
  }

  routeChange = (route) =>{
    if(route == 'signin'){
      this.setState(initialState);
    }else{
      this.setState({route: route});
    }
  }

  updateBox = (box) =>{
    this.setState({box: box});
  }

  buttonClicked = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    //ImageUrl isnt used here because setState rerenders the component asynchronously and at the moment when the previous line 44
    // is being ran, state.imageUrl is still empty
    .then(response => 
      {
        if(response){
          fetch('http://localhost:3001/image',{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                'id' : this.state.user.id,
              })
          })
          .then(res => {
            // console.log(res)
            return res.json()
          })
          .then(entries =>{
            this.setState(Object.assign(this.state.user, {entries}))
          })
          .catch(console.log);
        }
        this.updateBox( this.detectFace(response)) 
      })
    .catch(err => console.log(err));
  }

  render() {
    const { route, box, imageUrl } = this.state;
    return (
      <div className="App">

        <Particles params = { particlesPar } className="particles"/>
        <Navigation routeChange = { this.routeChange } route = {route}/>
        {
          route === 'signin' ?
            <Signin loadUser = { this.loadUser } routeChange = { this.routeChange }/>
            :
            route === 'home' ?
              <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm inputChange={ this.inputChange } buttonClicked={ this.buttonClicked } />
                <FaceRecognition box = {box} imageUrl = { imageUrl }/>
              </div>
              :
              <Register loadUser = { this.loadUser } routeChange = { this.routeChange }/>

        }
      
      </div>
    );
  }
}

export default App;
