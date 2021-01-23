import { Component } from 'react';
import React from "react";
import './App.css';
import Movies from './components/movies';

class App extends Component {

  render(){
    return (
      <main className="container p-5">
        <Movies/>
      </main>
    );
  }
}

export default App;
