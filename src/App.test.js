import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ListItem} from './components/ListItem';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders good',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<ListItem name="Anastazja Kowalska" username="MarioPolo"/>,div);
  ReactDOM.unmountComponentAtNode(div);
})