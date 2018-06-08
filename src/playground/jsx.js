// JSX

const app = {
  title: 'Indecision App',
  sub: 'Put your life in the hands of a computer',
  options: ['Item One', 'Item Two']
};

const onFormSubmit = (e) => {
  e.preventDefault();
 
  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};

const onRemoveAll = () => {
  app.options = [];
  render();
}

const onMakeDecision = () => {
  const randNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randNum];
  alert(option);
};

const appRoot = document.getElementById('app');

const numbers = [55, 101, 2424];

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.sub && <p>{app.sub}</p>}
      <p>{app.options.length > 0 ? 'Here are your options ': 'No Options'}</p>
      
      <button disabled={app.options.length === 0 ? true : false} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={onRemoveAll}>Remove All</button>
      {
       /* numbers.map((number) => {
          return <p key={number}>Number {number}</p>
        }) */
      }
      <ol>
        {
          app.options.map(option => {
            return <li key={option}>{option}</li>
          })
        }
      </ol>
  
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button >Add Option</button>
      </form>
    </div>
  );
  
  ReactDOM.render(template, appRoot);
};

render();

// if expression returns undefined, it will render nothing.
// true condition && 'some value' => return and render 'some value'
// false condition && 'some value => return false => render nothing




