class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
    }
  }

  handleDeleteOptions() {
    this.setState(() => {
      return { options: [] };
    });
  }

  handlePick() {
    const optionIndex = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[optionIndex]; 
    alert(option);
  }

  // we can use push as prevState.options.push(option). But we should not manipulate prevState => use concat.
  handleAddOption(option) {
    if(!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    } 

    this.setState((prevState) => {
      return {
        options: prevState.options.concat([option])
      };
    });
  }

  // props passed down to child components are read-only => cannot change values of options props in Options component => pass another props handleDeleteOptions down => because when a props is trigger and change states values, it will make re-render the whole component. 
  // in this case, handleDeleteOptions change the options state value => re-render Options => empty the options array. 
  render() {
    const title = 'Indecision';
    const sub = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header title={title} sub={sub} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

// stateless component
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h4>{props.sub}</h4>
    </div>
  );
}


const Action = (props) => {
  return (
    <div>
      <button 
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  );
};

// old syntax, since we dont need any state, we can use stateless components
/*
class Action extends React.Component {
  render() {
    return (
      <div>
        <button 
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}
        >
          What should I do?
        </button>
      </div>
    );
  }
}
*/

// we can't use a method of class in jxs render because it already lost the context of 'this' => use bind() to add the context of 'this' to methods.
// We can bind method right in jsx but that's not efficient as we have to do it multiple times => use constructor
// props in constructor is this.props that we use in jsx 

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {
        props.options.map(option => <Option key={option} optionText={option} />)
      }   
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      {props.optionText}
    </div>
  );
}

// we have to keep the handleAddOption down here because we want to do something with it (get the value) => we have to bind 2 times to keep the context of 'this'.
// we have to add option to options array above because props are read-only. 
class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    e.target.elements.option.value = '';
    const error = this.props.handleAddOption(option);
    // if option is successfully passed, error will be undefined because in that case, options array has been changed and it will re-render => error will not be passed.
    this.setState(() => {
      return { error };
    });
  }

  render() {
    return (
      <div>
        {this.state.error && <p className="text-danger">{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

// stateless component example
/*
const User = (props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
};

ReactDOM.render(<User name="Harry" age={24} />, document.getElementById('app'));
*/


