class IndecisionApp extends React.Component {
  render() {
    const title = 'Indecision';
    const sub = 'Put your life in the hands of a computer';
    const options = ['Item 1', 'Item 2', 'Item 4'];
    return (
      <div>
        <Header title={title} sub={sub} />
        <Action  />
        <Options options={options} />
        <AddOption />
      </div>
    );
  }
}

// Header component in the parent class is just an instance of class Header => 'this' can refer to that instance => this.props can give access to all props we pass to in the parent class.
class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h4>{this.props.sub}</h4>
      </div>
    );
  }
}

class Action extends React.Component {
  handlePick() {
    
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePick}>What should I do?</button>
      </div>
    );
  }
}

// we can't use a method of class in jxs render because it already lost the context of 'this' => use bind() to add the context of 'this' to methods.
// We can bind method right in jsx but that's not efficient as we have to do it multiple times => use constructor
// props in constructor is this.props that we use in jsx 
class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }
  handleRemoveAll() {
    console.log(this.props.options);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        {
          this.props.options.map(option => <Option key={option} optionText={option} />)
        }   
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        {this.props.optionText}
      </div>
    );
  }
}

class AddOption extends React.Component {
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    if(option) {
      alert(option);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
