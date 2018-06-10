import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';

export default class IndecisionApp extends React.Component {
  state = { options: [] };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = (deletedOption) => {
    this.setState((prevState) => ({
      options: prevState.options.filter(option => option !== deletedOption)
    }));
  };

  handlePick = () => {
    const optionIndex = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[optionIndex]; 
    alert(option);
  };

  
  handleAddOption = (option) => {
    if(!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    } 

    this.setState(prevState => ({ 
      options: prevState.options.concat([option]) 
    }));
  };

  componentDidMount() { 
    try {
      const optionsJson = localStorage.getItem('options');
      const options = JSON.parse(optionsJson);
  
      if(options) {
        this.setState(() => ({ options }));
      }
    } catch(e) {
      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const optionsJson = JSON.stringify(this.state.options);
      localStorage.setItem('options', optionsJson);
    }
  }

  componentWillUnmount() {
    console.log('unmout');
  }

  render() {
    const sub = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header sub={sub} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
};

IndecisionApp.defaultProps = {
  options: []
};