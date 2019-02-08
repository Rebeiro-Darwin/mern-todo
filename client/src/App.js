import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar'
import ShoppingList from "./components/ShoppingList"
import store from './store';
import  { Provider} from 'react-redux'

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
       <AppNavbar />
       <ShoppingList />
      </div>
      </Provider>
    );
  }
}

export default App;
