import React, { Component } from 'react';
import logo from './images/ttt.jpg';
import './App.css';

class App extends Component {

  state= {number: '', words:[]};

  onChange = (e) =>{
    console.log(e.target.value);
    this.setState({number: e.target.value});
  }

  onSubmit = (e) =>{
    e.preventDefault();
    console.log("I am here..")
    fetch('/input',{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response=> response.json())
      .catch(e => console.log(e))
      .then(data => this.setState({words: data.words}))
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper" >
          <header className="App-header">
            <img src={logo} style={{height:'50px'}} className="App-logo" alt="logo" />
            <h1 className="App-title">Terribly Tiny Tales</h1>
          </header>
          <div className="container" >
            <input id="txt-num" type="text" placeholder="Enter a number..." onChange={this.onChange} />
            <input id="btn-submit" type="button" value="Submit" onClick={this.onSubmit} />
          </div><br/> <br/>
          <table >
            <tbody>
              { 
                this.state.words.map( obj => <tr key={obj.word}><td> {obj.word} </td><td> {obj.count} </td></tr>)
              }
            </tbody>
          </table> 
        </div>
      </div>
    );
  }
}

export default App;
