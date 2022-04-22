import React, {useState } from "react";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery';
import '../index.css';

function App() {
  const [imageName, setImageName] = useState('');

  return (
    <div>
        <Searchbar onSubmit={setImageName} />
        <ImageGallery imageName={imageName} />
        <ToastContainer autoClose={2000}/>
    </div>
  );
}

// =================================================
// class App extends Component {
//   state = {
//     imageName: '', 
//   }

//   submitSerchInput = imageName => {
//     this.setState({ imageName });
//   }

//   render() {
//     return (
//     <div>
//         <Searchbar onSubmit={this.submitSerchInput} />
//         <ImageGallery imageName={this.state.imageName} />
//         <ToastContainer autoClose={2000}/>
//     </div>
//   );
//   }
// };

export default App;