import React, { Component } from "react";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery';
import '../index.css';

class App extends Component {
  state = {
    imageName: '', 
  }

  submitSerchInput = imageName => {
    this.setState({ imageName });
  }

  render() {
    return (
    <div>
        <Searchbar onSubmit={this.submitSerchInput} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={2000}/>
    </div>
  );
  }
  
};

export default App;